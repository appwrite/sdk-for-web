"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortForwardingServer = void 0;

var _events = require("events");

var _debugLogger = require("../utils/debugLogger");

var _utils = require("../utils/utils");

var _socksServer = require("./socksServer");

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
class PortForwardingServer extends _events.EventEmitter {
  constructor(parent) {
    super();
    this._forwardPorts = [];
    this._parent = void 0;
    this._server = void 0;
    this.setMaxListeners(0);
    this._parent = parent;
    this._server = new _socksServer.SocksProxyServer(this._handler.bind(this));
  }

  static async create(parent) {
    const server = new PortForwardingServer(parent);
    await server._server.listen(0);

    _debugLogger.debugLogger.log('proxy', `starting server on port ${server._port()})`);

    return server;
  }

  _port() {
    return this._server.server.address().port;
  }

  proxyServer() {
    return `socks5://127.0.0.1:${this._port()}`;
  }

  _handler(info, forward, intercept) {
    const shouldProxyRequestToClient = (0, _utils.isLocalIpAddress)(info.dstAddr) && this._forwardPorts.includes(info.dstPort);

    _debugLogger.debugLogger.log('proxy', `incoming connection from ${info.srcAddr}:${info.srcPort} to ${info.dstAddr}:${info.dstPort} shouldProxyRequestToClient=${shouldProxyRequestToClient}`);

    if (!shouldProxyRequestToClient) {
      forward();
      return;
    }

    const socket = intercept(this._parent);
    this.emit('incomingSocksSocket', socket);
  }

  setForwardedPorts(ports) {
    _debugLogger.debugLogger.log('proxy', `enable port forwarding on ports: ${ports}`);

    this._forwardPorts = ports;
  }

  stop() {
    _debugLogger.debugLogger.log('proxy', 'stopping server');

    this._server.close();
  }

}

exports.PortForwardingServer = PortForwardingServer;