"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocksSocket = void 0;

var _net = _interopRequireDefault(require("net"));

var _playwright = require("./playwright");

var _utils = require("../utils/utils");

var _channelOwner = require("./channelOwner");

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
class SocksSocket extends _channelOwner.ChannelOwner {
  static from(socket) {
    return socket._object;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
    this._socket = void 0;
    (0, _utils.assert)(parent instanceof _playwright.Playwright);
    (0, _utils.assert)(parent._forwardPorts.includes(this._initializer.dstPort));
    (0, _utils.assert)((0, _utils.isLocalIpAddress)(this._initializer.dstAddr));
    if ((0, _utils.isUnderTest)() && process.env.PW_TEST_PROXY_TARGET) this._initializer.dstPort = Number(process.env.PW_TEST_PROXY_TARGET);
    this._socket = _net.default.createConnection(this._initializer.dstPort, this._initializer.dstAddr);

    this._socket.on('error', err => this._channel.error({
      error: String(err)
    }));

    this._socket.on('connect', () => {
      this.connected().catch(() => {});

      this._socket.on('data', data => this.write(data).catch(() => {}));
    });

    this._socket.on('close', () => {
      this.end().catch(() => {});
    });

    this._channel.on('data', ({
      data
    }) => {
      if (!this._socket.writable) return;

      this._socket.write(Buffer.from(data, 'base64'));
    });

    this._channel.on('close', () => this._socket.end());

    this._connection.on('disconnect', () => this._socket.end());
  }

  async write(data) {
    await this._channel.write({
      data: data.toString('base64')
    });
  }

  async end() {
    await this._channel.end();
  }

  async connected() {
    await this._channel.connected();
  }

}

exports.SocksSocket = SocksSocket;