"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldCaptureSnapshot = shouldCaptureSnapshot;
exports.Tracing = exports.VERSION = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _yazl = _interopRequireDefault(require("yazl"));

var _readline = _interopRequireDefault(require("readline"));

var _utils = require("../../../utils/utils");

var _artifact = require("../../artifact");

var _browserContext = require("../../browserContext");

var _eventsHelper = require("../../../utils/eventsHelper");

var _page = require("../../page");

var _channels = require("../../../protocol/channels");

var _snapshotter = require("../../snapshot/snapshotter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const VERSION = 2;
exports.VERSION = VERSION;
const kScreencastOptions = {
  width: 800,
  height: 600,
  quality: 90
};

class Tracing {
  constructor(context) {
    this._writeChain = Promise.resolve();
    this._snapshotter = void 0;
    this._screencastListeners = [];
    this._pendingCalls = new Map();
    this._context = void 0;
    this._resourcesDir = void 0;
    this._recording = void 0;
    this._isStopping = false;
    this._tracesDir = void 0;
    this._allResources = new Set();
    this._context = context;
    this._tracesDir = context._browser.options.tracesDir;
    this._resourcesDir = _path.default.join(this._tracesDir, 'resources');
    this._snapshotter = new _snapshotter.Snapshotter(context, this);
  }

  async start(options) {
    var _state$options, _state$options2;

    if (this._isStopping) throw new Error('Cannot start tracing while stopping'); // context + page must be the first events added, this method can't have awaits before them.

    const state = this._recording;

    if (!state) {
      // TODO: passing the same name for two contexts makes them write into a single file
      // and conflict.
      const traceFile = _path.default.join(this._tracesDir, (options.name || (0, _utils.createGuid)()) + '.trace');

      this._recording = {
        options,
        traceFile,
        lastReset: 0,
        sha1s: new Set()
      };
      this._writeChain = (0, _utils.mkdirIfNeeded)(traceFile);
      const event = {
        version: VERSION,
        type: 'context-options',
        browserName: this._context._browser.options.name,
        options: this._context._options
      };

      this._appendTraceEvent(event);
    }

    if (!(state !== null && state !== void 0 && (_state$options = state.options) !== null && _state$options !== void 0 && _state$options.screenshots) && options.screenshots) this._startScreencast();else if (state !== null && state !== void 0 && (_state$options2 = state.options) !== null && _state$options2 !== void 0 && _state$options2.screenshots && !options.screenshots) this._stopScreencast(); // context + page must be the first events added, no awaits above this line.

    await _fs.default.promises.mkdir(this._resourcesDir, {
      recursive: true
    });
    if (!state) this._context.instrumentation.addListener(this);
    await this._appendTraceOperation(async () => {
      var _state$options3, _state$options4;

      if (options.snapshots && state !== null && state !== void 0 && (_state$options3 = state.options) !== null && _state$options3 !== void 0 && _state$options3.snapshots) {
        // Reset snapshots to avoid back-references.
        await this._snapshotter.reset();
      } else if (options.snapshots) {
        await this._snapshotter.start();
      } else if (state !== null && state !== void 0 && (_state$options4 = state.options) !== null && _state$options4 !== void 0 && _state$options4.snapshots) {
        await this._snapshotter.stop();
      }

      if (state) {
        state.lastReset++;
        const markerEvent = {
          type: 'marker',
          resetIndex: state.lastReset
        };
        await _fs.default.promises.appendFile(state.traceFile, JSON.stringify(markerEvent) + '\n');
      }
    });
    if (this._recording) this._recording.options = options;
  }

  _startScreencast() {
    for (const page of this._context.pages()) this._startScreencastInPage(page);

    this._screencastListeners.push(_eventsHelper.eventsHelper.addEventListener(this._context, _browserContext.BrowserContext.Events.Page, this._startScreencastInPage.bind(this)));
  }

  _stopScreencast() {
    _eventsHelper.eventsHelper.removeEventListeners(this._screencastListeners);

    for (const page of this._context.pages()) page.setScreencastOptions(null);
  }

  async stop() {
    if (!this._recording || this._isStopping) return;
    this._isStopping = true;

    this._context.instrumentation.removeListener(this);

    this._stopScreencast();

    await this._snapshotter.stop(); // Ensure all writes are finished.

    await this._writeChain;
    this._recording = undefined;
    this._isStopping = false;
  }

  async dispose() {
    this._snapshotter.dispose();

    await this._writeChain;
  }

  async export() {
    for (const {
      sdkObject,
      metadata,
      beforeSnapshot,
      actionSnapshot,
      afterSnapshot
    } of this._pendingCalls.values()) {
      await Promise.all([beforeSnapshot, actionSnapshot, afterSnapshot]);
      let callMetadata = metadata;

      if (!afterSnapshot) {
        // Note: we should not modify metadata here to avoid side-effects in any other place.
        callMetadata = { ...metadata,
          error: {
            error: {
              name: 'Error',
              message: 'Action was interrupted'
            }
          }
        };
      }

      await this.onAfterCall(sdkObject, callMetadata);
    }

    if (!this._recording) throw new Error('Must start tracing before exporting'); // Chain the export operation against write operations,
    // so that neither trace file nor sha1s change during the export.

    return await this._appendTraceOperation(async () => {
      const recording = this._recording;
      let state = recording; // Make a filtered trace if needed.

      if (recording.lastReset) state = await this._filterTrace(recording, recording.lastReset);
      const zipFile = new _yazl.default.ZipFile();
      const failedPromise = new Promise((_, reject) => zipFile.on('error', reject));
      const succeededPromise = new Promise(async fulfill => {
        zipFile.addFile(state.traceFile, 'trace.trace');
        const zipFileName = state.traceFile + '.zip';

        for (const sha1 of state.sha1s) zipFile.addFile(_path.default.join(this._resourcesDir, sha1), _path.default.join('resources', sha1));

        zipFile.end();
        await new Promise(f => {
          zipFile.outputStream.pipe(_fs.default.createWriteStream(zipFileName)).on('close', f);
        });
        const artifact = new _artifact.Artifact(this._context, zipFileName);
        artifact.reportFinished();
        fulfill(artifact);
      });
      return Promise.race([failedPromise, succeededPromise]).finally(async () => {
        // Remove the filtered trace.
        if (recording.lastReset) await _fs.default.promises.unlink(state.traceFile).catch(() => {});
      });
    });
  }

  async _filterTrace(state, sinceResetIndex) {
    const ext = _path.default.extname(state.traceFile);

    const traceFileCopy = state.traceFile.substring(0, state.traceFile.length - ext.length) + '-copy' + sinceResetIndex + ext;
    const sha1s = new Set();
    await new Promise((resolve, reject) => {
      const fileStream = _fs.default.createReadStream(state.traceFile, 'utf8');

      const rl = _readline.default.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      let copyChain = Promise.resolve();
      let foundMarker = false;
      rl.on('line', line => {
        try {
          const event = JSON.parse(line);

          if (event.type === 'marker') {
            if (event.resetIndex === sinceResetIndex) foundMarker = true;
          } else if (event.type === 'resource-snapshot' && state.options.snapshots || event.type === 'context-options' || foundMarker) {
            // We keep:
            // - old resource events for snapshots;
            // - initial context options event;
            // - all events after the marker that are not markers.
            visitSha1s(event, sha1s);
            copyChain = copyChain.then(() => _fs.default.promises.appendFile(traceFileCopy, line + '\n'));
          }
        } catch (e) {
          reject(e);
          fileStream.close();
          rl.close();
        }
      });
      rl.on('error', reject);
      rl.on('close', async () => {
        await copyChain;
        resolve();
      });
    });
    return {
      options: state.options,
      lastReset: state.lastReset,
      sha1s,
      traceFile: traceFileCopy
    };
  }

  async _captureSnapshot(name, sdkObject, metadata, element) {
    if (!sdkObject.attribution.page) return;
    if (!this._snapshotter.started()) return;
    if (!shouldCaptureSnapshot(metadata)) return;
    const snapshotName = `${name}@${metadata.id}`;
    metadata.snapshots.push({
      title: name,
      snapshotName
    });
    await this._snapshotter.captureSnapshot(sdkObject.attribution.page, snapshotName, element).catch(() => {});
  }

  async onBeforeCall(sdkObject, metadata) {
    const beforeSnapshot = this._captureSnapshot('before', sdkObject, metadata);

    this._pendingCalls.set(metadata.id, {
      sdkObject,
      metadata,
      beforeSnapshot
    });

    await beforeSnapshot;
  }

  async onBeforeInputAction(sdkObject, metadata, element) {
    const actionSnapshot = this._captureSnapshot('action', sdkObject, metadata, element);

    this._pendingCalls.get(metadata.id).actionSnapshot = actionSnapshot;
    await actionSnapshot;
  }

  async onAfterCall(sdkObject, metadata) {
    const pendingCall = this._pendingCalls.get(metadata.id);

    if (!pendingCall || pendingCall.afterSnapshot) return;

    if (!sdkObject.attribution.page) {
      this._pendingCalls.delete(metadata.id);

      return;
    }

    pendingCall.afterSnapshot = this._captureSnapshot('after', sdkObject, metadata);
    await pendingCall.afterSnapshot;
    const event = {
      type: 'action',
      metadata,
      hasSnapshot: shouldCaptureSnapshot(metadata)
    };

    this._appendTraceEvent(event);

    this._pendingCalls.delete(metadata.id);
  }

  onEvent(sdkObject, metadata) {
    if (!sdkObject.attribution.page) return;
    const event = {
      type: 'event',
      metadata,
      hasSnapshot: false
    };

    this._appendTraceEvent(event);
  }

  onBlob(blob) {
    this._appendResource(blob.sha1, blob.buffer);
  }

  onResourceSnapshot(snapshot) {
    this._appendTraceEvent({
      type: 'resource-snapshot',
      snapshot
    });
  }

  onFrameSnapshot(snapshot) {
    this._appendTraceEvent({
      type: 'frame-snapshot',
      snapshot
    });
  }

  _startScreencastInPage(page) {
    page.setScreencastOptions(kScreencastOptions);
    const prefix = page.guid;
    let frameSeq = 0;

    this._screencastListeners.push(_eventsHelper.eventsHelper.addEventListener(page, _page.Page.Events.ScreencastFrame, params => {
      const suffix = String(++frameSeq).padStart(10, '0');
      const sha1 = `${prefix}-${suffix}.jpeg`;
      const event = {
        type: 'screencast-frame',
        pageId: page.guid,
        sha1,
        width: params.width,
        height: params.height,
        timestamp: (0, _utils.monotonicTime)()
      }; // Make sure to write the screencast frame before adding a reference to it.

      this._appendResource(sha1, params.buffer);

      this._appendTraceEvent(event);
    }));
  }

  _appendTraceEvent(event) {
    // Serialize all writes to the trace file.
    this._appendTraceOperation(async () => {
      visitSha1s(event, this._recording.sha1s);
      await _fs.default.promises.appendFile(this._recording.traceFile, JSON.stringify(event) + '\n');
    });
  }

  _appendResource(sha1, buffer) {
    if (this._allResources.has(sha1)) return;

    this._allResources.add(sha1);

    this._appendTraceOperation(async () => {
      const resourcePath = _path.default.join(this._resourcesDir, sha1);

      try {
        // Perhaps we've already written this resource?
        await _fs.default.promises.access(resourcePath);
      } catch (e) {
        // If not, let's write! Note that async access is safe because we
        // never remove resources until the very end.
        await _fs.default.promises.writeFile(resourcePath, buffer).catch(() => {});
      }
    });
  }

  async _appendTraceOperation(cb) {
    let error;
    let result;
    this._writeChain = this._writeChain.then(async () => {
      try {
        result = await cb();
      } catch (e) {
        error = e;
      }
    });
    await this._writeChain;
    if (error) throw error;
    return result;
  }

}

exports.Tracing = Tracing;

function visitSha1s(object, sha1s) {
  if (Array.isArray(object)) {
    object.forEach(o => visitSha1s(o, sha1s));
    return;
  }

  if (typeof object === 'object') {
    for (const key in object) {
      if (key === 'sha1' || key.endsWith('Sha1')) {
        const sha1 = object[key];
        if (sha1) sha1s.add(sha1);
      }

      visitSha1s(object[key], sha1s);
    }

    return;
  }
}

function shouldCaptureSnapshot(metadata) {
  return _channels.commandsWithTracingSnapshots.has(metadata.type + '.' + metadata.method);
}