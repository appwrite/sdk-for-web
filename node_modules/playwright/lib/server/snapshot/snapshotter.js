"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snapshotter = void 0;

var _browserContext = require("../browserContext");

var _page = require("../page");

var _eventsHelper = require("../../utils/eventsHelper");

var _debugLogger = require("../../utils/debugLogger");

var _snapshotterInjected = require("./snapshotterInjected");

var _utils = require("../../utils/utils");

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
class Snapshotter {
  constructor(context, delegate) {
    this._context = void 0;
    this._delegate = void 0;
    this._eventListeners = [];
    this._snapshotStreamer = void 0;
    this._initialized = false;
    this._started = false;
    this._fetchedResponses = new Map();
    this._context = context;
    this._delegate = delegate;
    const guid = (0, _utils.createGuid)();
    this._snapshotStreamer = '__playwright_snapshot_streamer_' + guid;
  }

  started() {
    return this._started;
  }

  async start() {
    this._started = true;

    if (!this._initialized) {
      this._initialized = true;
      await this._initialize();
    }

    await this.reset(); // Replay resources loaded in all pages.

    for (const page of this._context.pages()) {
      for (const response of page._frameManager._responses) this._saveResource(response).catch(e => _debugLogger.debugLogger.log('error', e));
    }
  }

  async reset() {
    if (this._started) await this._runInAllFrames(`window["${this._snapshotStreamer}"].reset()`);
  }

  async stop() {
    this._started = false;
  }

  async _initialize() {
    for (const page of this._context.pages()) this._onPage(page);

    this._eventListeners = [_eventsHelper.eventsHelper.addEventListener(this._context, _browserContext.BrowserContext.Events.Page, this._onPage.bind(this)), _eventsHelper.eventsHelper.addEventListener(this._context, _browserContext.BrowserContext.Events.Response, response => {
      this._saveResource(response).catch(e => _debugLogger.debugLogger.log('error', e));
    })];
    const initScript = `(${_snapshotterInjected.frameSnapshotStreamer})("${this._snapshotStreamer}")`;
    await this._context._doAddInitScript(initScript);
    await this._runInAllFrames(initScript);
  }

  async _runInAllFrames(expression) {
    const frames = [];

    for (const page of this._context.pages()) frames.push(...page.frames());

    await Promise.all(frames.map(frame => {
      return frame.nonStallingRawEvaluateInExistingMainContext(expression).catch(e => _debugLogger.debugLogger.log('error', e));
    }));
  }

  dispose() {
    _eventsHelper.eventsHelper.removeEventListeners(this._eventListeners);
  }

  async captureSnapshot(page, snapshotName, element) {
    // Prepare expression synchronously.
    const expression = `window["${this._snapshotStreamer}"].captureSnapshot(${JSON.stringify(snapshotName)})`; // In a best-effort manner, without waiting for it, mark target element.

    element === null || element === void 0 ? void 0 : element.callFunctionNoReply((element, snapshotName) => {
      element.setAttribute('__playwright_target__', snapshotName);
    }, snapshotName); // In each frame, in a non-stalling manner, capture the snapshots.

    const snapshots = page.frames().map(async frame => {
      const data = await frame.nonStallingRawEvaluateInExistingMainContext(expression).catch(e => _debugLogger.debugLogger.log('error', e)); // Something went wrong -> bail out, our snapshots are best-efforty.

      if (!data || !this._started) return;
      const snapshot = {
        snapshotName,
        pageId: page.guid,
        frameId: frame.guid,
        frameUrl: data.url,
        doctype: data.doctype,
        html: data.html,
        viewport: data.viewport,
        timestamp: (0, _utils.monotonicTime)(),
        collectionTime: data.collectionTime,
        resourceOverrides: [],
        isMainFrame: page.mainFrame() === frame
      };

      for (const {
        url,
        content,
        contentType
      } of data.resourceOverrides) {
        if (typeof content === 'string') {
          const buffer = Buffer.from(content);
          const sha1 = (0, _utils.calculateSha1)(buffer) + mimeToExtension(contentType);

          this._delegate.onBlob({
            sha1,
            buffer
          });

          snapshot.resourceOverrides.push({
            url,
            sha1
          });
        } else {
          snapshot.resourceOverrides.push({
            url,
            ref: content
          });
        }
      }

      this._delegate.onFrameSnapshot(snapshot);
    });
    await Promise.all(snapshots);
  }

  _onPage(page) {
    // Annotate frame hierarchy so that snapshots could include frame ids.
    for (const frame of page.frames()) this._annotateFrameHierarchy(frame);

    this._eventListeners.push(_eventsHelper.eventsHelper.addEventListener(page, _page.Page.Events.FrameAttached, frame => this._annotateFrameHierarchy(frame)));
  }

  async _saveResource(response) {
    if (!this._started) return;
    const isRedirect = response.status() >= 300 && response.status() <= 399;
    if (isRedirect) return; // We do not need scripts for snapshots.

    if (response.request().resourceType() === 'script') return; // Shortcut all redirects - we cannot intercept them properly.

    let original = response.request();

    while (original.redirectedFrom()) original = original.redirectedFrom();

    const url = original.url();
    let contentType = '';

    for (const {
      name,
      value
    } of response.headers()) {
      if (name.toLowerCase() === 'content-type') contentType = value;
    }

    const method = original.method();
    const status = response.status();
    const requestBody = original.postDataBuffer();
    const requestSha1 = requestBody ? (0, _utils.calculateSha1)(requestBody) + mimeToExtension(contentType) : '';
    if (requestBody) this._delegate.onBlob({
      sha1: requestSha1,
      buffer: requestBody
    });
    const requestHeaders = original.headers(); // Only fetch response bodies once.

    let responseSha1 = this._fetchedResponses.get(response);

    {
      if (responseSha1 === undefined) {
        const body = await response.body().catch(e => _debugLogger.debugLogger.log('error', e)); // Bail out after each async hop.

        if (!this._started) return;
        responseSha1 = body ? (0, _utils.calculateSha1)(body) + mimeToExtension(contentType) : '';
        if (body) this._delegate.onBlob({
          sha1: responseSha1,
          buffer: body
        });

        this._fetchedResponses.set(response, responseSha1);
      }
    }
    const resource = {
      pageId: response.frame()._page.guid,
      frameId: response.frame().guid,
      url,
      type: response.request().resourceType(),
      contentType,
      responseHeaders: response.headers(),
      requestHeaders,
      method,
      status,
      requestSha1,
      responseSha1,
      timestamp: (0, _utils.monotonicTime)()
    };

    this._delegate.onResourceSnapshot(resource);
  }

  async _annotateFrameHierarchy(frame) {
    try {
      const frameElement = await frame.frameElement();
      const parent = frame.parentFrame();
      if (!parent) return;
      const context = await parent._mainContext();
      await (context === null || context === void 0 ? void 0 : context.evaluate(({
        snapshotStreamer,
        frameElement,
        frameId
      }) => {
        window[snapshotStreamer].markIframe(frameElement, frameId);
      }, {
        snapshotStreamer: this._snapshotStreamer,
        frameElement,
        frameId: frame.guid
      }));
      frameElement.dispose();
    } catch (e) {}
  }

}

exports.Snapshotter = Snapshotter;
const kMimeToExtension = {
  'application/javascript': 'js',
  'application/json': 'json',
  'application/json5': 'json5',
  'application/pdf': 'pdf',
  'application/xhtml+xml': 'xhtml',
  'application/zip': 'zip',
  'font/otf': 'otf',
  'font/woff': 'woff',
  'font/woff2': 'woff2',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/tiff': 'tiff',
  'text/css': 'css',
  'text/csv': 'csv',
  'text/html': 'html',
  'text/plain': 'text',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg'
};

function mimeToExtension(contentType) {
  return '.' + (kMimeToExtension[contentType] || 'dat');
}