"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserType = void 0;

var _browser = require("./browser");

var _browserContext = require("./browserContext");

var _channelOwner = require("./channelOwner");

var _ws = _interopRequireDefault(require("ws"));

var _connection = require("./connection");

var _events = require("./events");

var _timeoutSettings = require("../utils/timeoutSettings");

var _clientHelper = require("./clientHelper");

var _utils = require("../utils/utils");

var _errors = require("../utils/errors");

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
class BrowserType extends _channelOwner.ChannelOwner {
  // Instrumentation.
  static from(browserType) {
    return browserType._object;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
    this._timeoutSettings = new _timeoutSettings.TimeoutSettings();
    this._serverLauncher = void 0;
    this._contexts = new Set();
    this._defaultContextOptions = {};
    this._defaultLaunchOptions = {};
    this._onDidCreateContext = void 0;
    this._onWillCloseContext = void 0;
  }

  executablePath() {
    if (!this._initializer.executablePath) throw new Error('Browser is not supported on current platform');
    return this._initializer.executablePath;
  }

  name() {
    return this._initializer.name;
  }

  async launch(options = {}) {
    const logger = options.logger;
    return this._wrapApiCall(async channel => {
      (0, _utils.assert)(!options.userDataDir, 'userDataDir option is not supported in `browserType.launch`. Use `browserType.launchPersistentContext` instead');
      (0, _utils.assert)(!options.port, 'Cannot specify a port without launching as a server.');
      options = { ...this._defaultLaunchOptions,
        ...options
      };
      const launchOptions = { ...options,
        ignoreDefaultArgs: Array.isArray(options.ignoreDefaultArgs) ? options.ignoreDefaultArgs : undefined,
        ignoreAllDefaultArgs: !!options.ignoreDefaultArgs && !Array.isArray(options.ignoreDefaultArgs),
        env: options.env ? (0, _clientHelper.envObjectToArray)(options.env) : undefined
      };

      const browser = _browser.Browser.from((await channel.launch(launchOptions)).browser);

      browser._logger = logger;

      browser._setBrowserType(this);

      return browser;
    }, logger);
  }

  async launchServer(options = {}) {
    if (!this._serverLauncher) throw new Error('Launching server is not supported');
    return this._serverLauncher.launchServer(options);
  }

  async launchPersistentContext(userDataDir, options = {}) {
    return this._wrapApiCall(async channel => {
      var _this$_onDidCreateCon;

      (0, _utils.assert)(!options.port, 'Cannot specify a port without launching as a server.');
      options = { ...this._defaultLaunchOptions,
        ...this._defaultContextOptions,
        ...options
      };
      const contextParams = await (0, _browserContext.prepareBrowserContextParams)(options);
      const persistentParams = { ...contextParams,
        ignoreDefaultArgs: Array.isArray(options.ignoreDefaultArgs) ? options.ignoreDefaultArgs : undefined,
        ignoreAllDefaultArgs: !!options.ignoreDefaultArgs && !Array.isArray(options.ignoreDefaultArgs),
        env: options.env ? (0, _clientHelper.envObjectToArray)(options.env) : undefined,
        channel: options.channel,
        userDataDir
      };
      const result = await channel.launchPersistentContext(persistentParams);

      const context = _browserContext.BrowserContext.from(result.context);

      context._options = contextParams;
      context._logger = options.logger;

      context._setBrowserType(this);

      await ((_this$_onDidCreateCon = this._onDidCreateContext) === null || _this$_onDidCreateCon === void 0 ? void 0 : _this$_onDidCreateCon.call(this, context));
      return context;
    }, options.logger);
  }

  async connect(optionsOrWsEndpoint, options) {
    if (typeof optionsOrWsEndpoint === 'string') return this._connect(optionsOrWsEndpoint, options);
    (0, _utils.assert)(optionsOrWsEndpoint.wsEndpoint, 'options.wsEndpoint is required');
    return this._connect(optionsOrWsEndpoint.wsEndpoint, optionsOrWsEndpoint);
  }

  async _connect(wsEndpoint, params = {}) {
    const logger = params.logger;
    const paramsHeaders = Object.assign({
      'User-Agent': (0, _utils.getUserAgent)()
    }, params.headers);
    return this._wrapApiCall(async () => {
      const ws = new _ws.default(wsEndpoint, [], {
        perMessageDeflate: false,
        maxPayload: 256 * 1024 * 1024,
        // 256Mb,
        handshakeTimeout: this._timeoutSettings.timeout(params),
        headers: paramsHeaders
      });
      const connection = new _connection.Connection(() => ws.close()); // The 'ws' module in node sometimes sends us multiple messages in a single task.

      const waitForNextTask = params.slowMo ? cb => setTimeout(cb, params.slowMo) : (0, _utils.makeWaitForNextTask)();

      connection.onmessage = message => {
        // Connection should handle all outgoing message in disconnected().
        if (ws.readyState !== _ws.default.OPEN) return;
        ws.send(JSON.stringify(message));
      };

      ws.addEventListener('message', event => {
        waitForNextTask(() => {
          try {
            // Since we may slow down the messages, but disconnect
            // synchronously, we might come here with a message
            // after disconnect.
            if (!connection.isDisconnected()) connection.dispatch(JSON.parse(event.data));
          } catch (e) {
            console.error(`Playwright: Connection dispatch error`);
            console.error(e);
            ws.close();
          }
        });
      });

      let timeoutCallback = e => {};

      const timeoutPromise = new Promise((f, r) => timeoutCallback = r);
      const timer = params.timeout ? setTimeout(() => timeoutCallback(new Error(`Timeout ${params.timeout}ms exceeded.`)), params.timeout) : undefined;
      const successPromise = new Promise(async (fulfill, reject) => {
        if (params.__testHookBeforeCreateBrowser) {
          try {
            await params.__testHookBeforeCreateBrowser();
          } catch (e) {
            reject(e);
          }
        }

        ws.addEventListener('open', async () => {
          const prematureCloseListener = event => {
            reject(new Error(`WebSocket server disconnected (${event.code}) ${event.reason}`));
          };

          ws.addEventListener('close', prematureCloseListener);
          const playwright = await connection.waitForObjectWithKnownName('Playwright');

          if (!playwright._initializer.preLaunchedBrowser) {
            reject(new Error('Malformed endpoint. Did you use launchServer method?'));
            ws.close();
            return;
          }

          const browser = _browser.Browser.from(playwright._initializer.preLaunchedBrowser);

          browser._logger = logger;
          browser._remoteType = 'owns-connection';

          browser._setBrowserType(playwright[browser._name]);

          const closeListener = () => {
            // Emulate all pages, contexts and the browser closing upon disconnect.
            for (const context of browser.contexts()) {
              for (const page of context.pages()) page._onClose();

              context._onClose();
            }

            browser._didClose();

            connection.didDisconnect(_errors.kBrowserClosedError);
          };

          ws.removeEventListener('close', prematureCloseListener);
          ws.addEventListener('close', closeListener);
          browser.on(_events.Events.Browser.Disconnected, () => {
            playwright._cleanup();

            ws.removeEventListener('close', closeListener);
            ws.close();
          });

          if (params._forwardPorts) {
            try {
              await playwright._enablePortForwarding(params._forwardPorts);
            } catch (err) {
              reject(err);
              return;
            }
          }

          fulfill(browser);
        });
        ws.addEventListener('error', event => {
          ws.close();
          reject(new Error(event.message + '. Most likely ws endpoint is incorrect'));
        });
      });

      try {
        return await Promise.race([successPromise, timeoutPromise]);
      } finally {
        if (timer) clearTimeout(timer);
      }
    }, logger);
  }

  connectOverCDP(endpointURLOrOptions, options) {
    if (typeof endpointURLOrOptions === 'string') return this._connectOverCDP(endpointURLOrOptions, options);
    const endpointURL = 'endpointURL' in endpointURLOrOptions ? endpointURLOrOptions.endpointURL : endpointURLOrOptions.wsEndpoint;
    (0, _utils.assert)(endpointURL, 'Cannot connect over CDP without wsEndpoint.');
    return this.connectOverCDP(endpointURL, endpointURLOrOptions);
  }

  async _connectOverCDP(endpointURL, params = {}) {
    if (this.name() !== 'chromium') throw new Error('Connecting over CDP is only supported in Chromium.');
    const logger = params.logger;
    return this._wrapApiCall(async channel => {
      const paramsHeaders = Object.assign({
        'User-Agent': (0, _utils.getUserAgent)()
      }, params.headers);
      const headers = paramsHeaders ? (0, _utils.headersObjectToArray)(paramsHeaders) : undefined;
      const result = await channel.connectOverCDP({
        sdkLanguage: 'javascript',
        endpointURL,
        headers,
        slowMo: params.slowMo,
        timeout: params.timeout
      });

      const browser = _browser.Browser.from(result.browser);

      if (result.defaultContext) browser._contexts.add(_browserContext.BrowserContext.from(result.defaultContext));
      browser._remoteType = 'uses-connection';
      browser._logger = logger;

      browser._setBrowserType(this);

      return browser;
    }, logger);
  }

}

exports.BrowserType = BrowserType;