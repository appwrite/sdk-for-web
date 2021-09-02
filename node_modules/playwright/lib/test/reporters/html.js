"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../../utils/utils");

var _base = require("./base");

var _json = require("./json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class HtmlReporter {
  constructor() {
    this._reportFolder = void 0;
    this._resourcesFolder = void 0;
    this.config = void 0;
    this.suite = void 0;
    this._reportFolder = _path.default.resolve(process.cwd(), process.env[`PLAYWRIGHT_HTML_REPORT`] || 'playwright-report');
    this._resourcesFolder = _path.default.join(this._reportFolder, 'resources');

    _fs.default.mkdirSync(this._resourcesFolder, {
      recursive: true
    });

    const appFolder = _path.default.join(__dirname, '..', '..', 'web', 'htmlReport');

    for (const file of _fs.default.readdirSync(appFolder)) _fs.default.copyFileSync(_path.default.join(appFolder, file), _path.default.join(this._reportFolder, file));
  }

  onBegin(config, suite) {
    this.config = config;
    this.suite = suite;
  }

  async onEnd() {
    const stats = {
      expected: 0,
      unexpected: 0,
      skipped: 0,
      flaky: 0
    };
    this.suite.allTests().forEach(t => {
      ++stats[t.outcome()];
    });
    const output = {
      config: { ...this.config,
        rootDir: (0, _json.toPosixPath)(this.config.rootDir),
        projects: this.config.projects.map(project => {
          return {
            outputDir: (0, _json.toPosixPath)(project.outputDir),
            repeatEach: project.repeatEach,
            retries: project.retries,
            metadata: project.metadata,
            name: project.name,
            testDir: (0, _json.toPosixPath)(project.testDir),
            testIgnore: (0, _json.serializePatterns)(project.testIgnore),
            testMatch: (0, _json.serializePatterns)(project.testMatch),
            timeout: project.timeout
          };
        })
      },
      stats,
      suites: await Promise.all(this.suite.suites.map(s => this._serializeSuite(s)))
    };

    _fs.default.writeFileSync(_path.default.join(this._reportFolder, 'report.json'), JSON.stringify(output));
  }

  _relativeLocation(location) {
    if (!location) return {
      file: '',
      line: 0,
      column: 0
    };
    return {
      file: (0, _json.toPosixPath)(_path.default.relative(this.config.rootDir, location.file)),
      line: location.line,
      column: location.column
    };
  }

  async _serializeSuite(suite) {
    return {
      title: suite.title,
      location: this._relativeLocation(suite.location),
      suites: await Promise.all(suite.suites.map(s => this._serializeSuite(s))),
      tests: await Promise.all(suite.tests.map(t => this._serializeTest(t)))
    };
  }

  async _serializeTest(test) {
    const testId = (0, _utils.calculateSha1)(test.titlePath().join('|'));
    return {
      testId,
      title: test.title,
      location: this._relativeLocation(test.location),
      expectedStatus: test.expectedStatus,
      timeout: test.timeout,
      annotations: test.annotations,
      retries: test.retries,
      ok: test.ok(),
      outcome: test.outcome(),
      results: await Promise.all(test.results.map(r => this._serializeResult(testId, test, r)))
    };
  }

  async _serializeResult(testId, test, result) {
    return {
      retry: result.retry,
      workerIndex: result.workerIndex,
      startTime: result.startTime.toISOString(),
      duration: result.duration,
      status: result.status,
      error: result.error,
      failureSnippet: (0, _base.formatResultFailure)(test, result, '').join('') || undefined,
      attachments: await this._createAttachments(testId, result),
      stdout: result.stdout,
      stderr: result.stderr,
      steps: serializeSteps(result.steps)
    };
  }

  async _createAttachments(testId, result) {
    const attachments = [];

    for (const attachment of result.attachments) {
      if (attachment.path) {
        const sha1 = (0, _utils.calculateSha1)(attachment.path) + _path.default.extname(attachment.path);

        _fs.default.copyFileSync(attachment.path, _path.default.join(this._resourcesFolder, sha1));

        attachments.push({ ...attachment,
          body: undefined,
          sha1
        });
      } else if (attachment.body && isTextAttachment(attachment.contentType)) {
        attachments.push({ ...attachment,
          body: attachment.body.toString()
        });
      } else {
        const sha1 = (0, _utils.calculateSha1)(attachment.body) + '.dat';

        _fs.default.writeFileSync(_path.default.join(this._resourcesFolder, sha1), attachment.body);

        attachments.push({ ...attachment,
          body: undefined,
          sha1
        });
      }
    }

    if (result.stdout.length) attachments.push(this._stdioAttachment(testId, result, 'stdout'));
    if (result.stderr.length) attachments.push(this._stdioAttachment(testId, result, 'stderr'));
    return attachments;
  }

  _stdioAttachment(testId, result, type) {
    const sha1 = `${testId}.${result.retry}.${type}`;

    const fileName = _path.default.join(this._resourcesFolder, sha1);

    for (const chunk of type === 'stdout' ? result.stdout : result.stderr) {
      if (typeof chunk === 'string') _fs.default.appendFileSync(fileName, chunk + '\n');else _fs.default.appendFileSync(fileName, chunk);
    }

    return {
      name: type,
      contentType: 'application/octet-stream',
      sha1
    };
  }

}

function serializeSteps(steps) {
  return steps.map(step => {
    return {
      title: step.title,
      category: step.category,
      startTime: step.startTime.toISOString(),
      duration: step.duration,
      error: step.error,
      steps: serializeSteps(step.steps)
    };
  });
}

function isTextAttachment(contentType) {
  if (contentType.startsWith('text/')) return true;
  if (contentType.includes('json')) return true;
  return false;
}

var _default = HtmlReporter;
exports.default = _default;