"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewriteErrorMessage = rewriteErrorMessage;
exports.captureStackTrace = captureStackTrace;
exports.splitErrorMessage = splitErrorMessage;

var _path = _interopRequireDefault(require("path"));

var _stackUtils = _interopRequireDefault(require("stack-utils"));

var _utils = require("./utils");

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
const stackUtils = new _stackUtils.default();

function rewriteErrorMessage(e, newMessage) {
  if (e.stack) {
    const index = e.stack.indexOf(e.message);
    if (index !== -1) e.stack = e.stack.substring(0, index) + newMessage + e.stack.substring(index + e.message.length);
  }

  e.message = newMessage;
  return e;
}

const PW_LIB_DIRS = ['playwright', 'playwright-chromium', 'playwright-firefox', 'playwright-webkit', _path.default.join('@playwright', 'test')].map(packageName => _path.default.sep + packageName);

const runnerNpmPkgLib = _path.default.join('@playwright', 'test', 'lib', 'test');

const runnerLib = _path.default.join('lib', 'test');

const runnerSrc = _path.default.join('src', 'test');

function includesFileInPlaywrightSubDir(subDir, fileName) {
  return PW_LIB_DIRS.map(p => _path.default.join(p, subDir)).some(libDir => fileName.includes(libDir));
}

function captureStackTrace() {
  const stackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 30;
  const error = new Error();
  const stack = error.stack;
  Error.stackTraceLimit = stackTraceLimit;
  const frames = [];
  const frameTexts = [];
  const lines = stack.split('\n').reverse();
  let apiName = '';
  const isTesting = !!process.env.PWTEST_CLI_ALLOW_TEST_COMMAND || (0, _utils.isUnderTest)();

  for (const line of lines) {
    const frame = stackUtils.parseLine(line);
    if (!frame || !frame.file) continue;
    if (frame.file.startsWith('internal')) continue;

    const fileName = _path.default.resolve(process.cwd(), frame.file);

    if (isTesting && fileName.includes(_path.default.join('playwright', 'tests', 'config', 'coverage.js'))) continue;

    if (isFilePartOfPlaywright(isTesting, fileName)) {
      apiName = frame.function ? frame.function[0].toLowerCase() + frame.function.slice(1) : '';
      break;
    }

    frameTexts.push(line);
    frames.push({
      file: fileName,
      line: frame.line,
      column: frame.column,
      function: frame.function
    });
  }

  frames.reverse();
  frameTexts.reverse();
  return {
    frames,
    frameTexts,
    apiName
  };
}

function isFilePartOfPlaywright(isTesting, fileName) {
  const isPlaywrightTest = fileName.includes(runnerNpmPkgLib);
  const isLocalPlaywright = isTesting && (fileName.includes(runnerSrc) || fileName.includes(runnerLib));
  const isInPlaywright = includesFileInPlaywrightSubDir('src', fileName) || includesFileInPlaywrightSubDir('lib', fileName);
  return !isPlaywrightTest && !isLocalPlaywright && isInPlaywright;
}

function splitErrorMessage(message) {
  const separationIdx = message.indexOf(':');
  return {
    name: separationIdx !== -1 ? message.slice(0, separationIdx) : '',
    message: separationIdx !== -1 && separationIdx + 2 <= message.length ? message.substring(separationIdx + 2) : message
  };
}