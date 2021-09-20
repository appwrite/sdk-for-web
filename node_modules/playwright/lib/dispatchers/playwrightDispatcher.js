"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaywrightDispatcher = void 0;

var _androidDispatcher = require("./androidDispatcher");

var _browserTypeDispatcher = require("./browserTypeDispatcher");

var _dispatcher = require("./dispatcher");

var _electronDispatcher = require("./electronDispatcher");

var _selectorsDispatcher = require("./selectorsDispatcher");

var _socksSocketDispatcher = require("./socksSocketDispatcher");

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
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
class PlaywrightDispatcher extends _dispatcher.Dispatcher {
  constructor(scope, playwright, customSelectors, preLaunchedBrowser) {
    const descriptors = require('../server/deviceDescriptors');

    const deviceDescriptors = Object.entries(descriptors).map(([name, descriptor]) => ({
      name,
      descriptor
    }));
    super(scope, playwright, 'Playwright', {
      chromium: new _browserTypeDispatcher.BrowserTypeDispatcher(scope, playwright.chromium),
      firefox: new _browserTypeDispatcher.BrowserTypeDispatcher(scope, playwright.firefox),
      webkit: new _browserTypeDispatcher.BrowserTypeDispatcher(scope, playwright.webkit),
      android: new _androidDispatcher.AndroidDispatcher(scope, playwright.android),
      electron: new _electronDispatcher.ElectronDispatcher(scope, playwright.electron),
      deviceDescriptors,
      selectors: customSelectors || new _selectorsDispatcher.SelectorsDispatcher(scope, playwright.selectors),
      preLaunchedBrowser
    }, false);

    this._object.on('incomingSocksSocket', socket => {
      this._dispatchEvent('incomingSocksSocket', {
        socket: new _socksSocketDispatcher.SocksSocketDispatcher(this, socket)
      });
    });
  }

  async setForwardedPorts(params) {
    this._object._setForwardedPorts(params.ports);
  }

}

exports.PlaywrightDispatcher = PlaywrightDispatcher;