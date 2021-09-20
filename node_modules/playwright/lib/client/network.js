"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateHeaders = validateHeaders;
exports.WebSocket = exports.Response = exports.Route = exports.InterceptedResponse = exports.Request = void 0;

var _url = require("url");

var _channelOwner = require("./channelOwner");

var _frame = require("./frame");

var _fs = _interopRequireDefault(require("fs"));

var mime = _interopRequireWildcard(require("mime"));

var _utils = require("../utils/utils");

var _events = require("./events");

var _waiter = require("./waiter");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
class Request extends _channelOwner.ChannelOwner {
  static from(request) {
    return request._object;
  }

  static fromNullable(request) {
    return request ? Request.from(request) : null;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
    this._redirectedFrom = null;
    this._redirectedTo = null;
    this._failureText = null;
    this._headers = void 0;
    this._postData = void 0;
    this._timing = void 0;
    this._redirectedFrom = Request.fromNullable(initializer.redirectedFrom);
    if (this._redirectedFrom) this._redirectedFrom._redirectedTo = this;
    this._headers = (0, _utils.headersArrayToObject)(initializer.headers, true
    /* lowerCase */
    );
    this._postData = initializer.postData ? Buffer.from(initializer.postData, 'base64') : null;
    this._timing = {
      startTime: 0,
      domainLookupStart: -1,
      domainLookupEnd: -1,
      connectStart: -1,
      secureConnectionStart: -1,
      connectEnd: -1,
      requestStart: -1,
      responseStart: -1,
      responseEnd: -1
    };
  }

  url() {
    return this._initializer.url;
  }

  resourceType() {
    return this._initializer.resourceType;
  }

  method() {
    return this._initializer.method;
  }

  postData() {
    return this._postData ? this._postData.toString('utf8') : null;
  }

  postDataBuffer() {
    return this._postData;
  }

  postDataJSON() {
    const postData = this.postData();
    if (!postData) return null;
    const contentType = this.headers()['content-type'];

    if (contentType === 'application/x-www-form-urlencoded') {
      const entries = {};
      const parsed = new _url.URLSearchParams(postData);

      for (const [k, v] of parsed.entries()) entries[k] = v;

      return entries;
    }

    try {
      return JSON.parse(postData);
    } catch (e) {
      throw new Error('POST data is not a valid JSON object: ' + postData);
    }
  }

  headers() {
    return { ...this._headers
    };
  }

  async response() {
    return this._wrapApiCall(async channel => {
      return Response.fromNullable((await channel.response()).response);
    });
  }

  frame() {
    return _frame.Frame.from(this._initializer.frame);
  }

  isNavigationRequest() {
    return this._initializer.isNavigationRequest;
  }

  redirectedFrom() {
    return this._redirectedFrom;
  }

  redirectedTo() {
    return this._redirectedTo;
  }

  failure() {
    if (this._failureText === null) return null;
    return {
      errorText: this._failureText
    };
  }

  timing() {
    return this._timing;
  }

  _finalRequest() {
    return this._redirectedTo ? this._redirectedTo._finalRequest() : this;
  }

}

exports.Request = Request;

class InterceptedResponse {
  constructor(route, initializer) {
    this._route = void 0;
    this._initializer = void 0;
    this._request = void 0;
    this._headers = void 0;
    this._route = route;
    this._initializer = initializer;
    this._headers = (0, _utils.headersArrayToObject)(initializer.headers, true
    /* lowerCase */
    );
    this._request = Request.from(initializer.request);
  }

  async securityDetails() {
    return null;
  }

  async serverAddr() {
    return null;
  }

  async finished() {
    const response = await this._request.response();
    if (!response) return null;
    return await response.finished();
  }

  frame() {
    return this._request.frame();
  }

  ok() {
    return this._initializer.status === 0 || this._initializer.status >= 200 && this._initializer.status <= 299;
  }

  url() {
    return this._request.url();
  }

  status() {
    return this._initializer.status;
  }

  statusText() {
    return this._initializer.statusText;
  }

  headers() {
    return { ...this._headers
    };
  }

  async body() {
    return this._route._responseBody();
  }

  async text() {
    const content = await this.body();
    return content.toString('utf8');
  }

  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }

  request() {
    return this._request;
  }

}

exports.InterceptedResponse = InterceptedResponse;

class Route extends _channelOwner.ChannelOwner {
  static from(route) {
    return route._object;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
  }

  request() {
    return Request.from(this._initializer.request);
  }

  async abort(errorCode) {
    return this._wrapApiCall(async channel => {
      await channel.abort({
        errorCode
      });
    });
  }

  async fulfill(options = {}) {
    return this._wrapApiCall(async channel => {
      let body = '';
      let isBase64 = false;
      let length = 0;

      if (options.path) {
        const buffer = await _fs.default.promises.readFile(options.path);
        body = buffer.toString('base64');
        isBase64 = true;
        length = buffer.length;
      } else if ((0, _utils.isString)(options.body)) {
        body = options.body;
        isBase64 = false;
        length = Buffer.byteLength(body);
      } else if (options.body) {
        body = options.body.toString('base64');
        isBase64 = true;
        length = options.body.length;
      }

      const headers = {};

      for (const header of Object.keys(options.headers || {})) headers[header.toLowerCase()] = String(options.headers[header]);

      if (options.contentType) headers['content-type'] = String(options.contentType);else if (options.path) headers['content-type'] = mime.getType(options.path) || 'application/octet-stream';
      if (length && !('content-length' in headers)) headers['content-length'] = String(length);
      await channel.fulfill({
        status: options.status || 200,
        headers: (0, _utils.headersObjectToArray)(headers),
        body,
        isBase64
      });
    });
  }

  async _intercept(options = {}) {
    return await this._continue(options, true);
  }

  async continue(options = {}) {
    await this._continue(options, false);
  }

  async _continue(options, interceptResponse) {
    return await this._wrapApiCall(async channel => {
      const postDataBuffer = (0, _utils.isString)(options.postData) ? Buffer.from(options.postData, 'utf8') : options.postData;
      const result = await channel.continue({
        url: options.url,
        method: options.method,
        headers: options.headers ? (0, _utils.headersObjectToArray)(options.headers) : undefined,
        postData: postDataBuffer ? postDataBuffer.toString('base64') : undefined,
        interceptResponse
      });
      if (result.response) return new InterceptedResponse(this, result.response);
      return null;
    });
  }

  async _responseBody() {
    return this._wrapApiCall(async channel => {
      return Buffer.from((await channel.responseBody()).binary, 'base64');
    });
  }

}

exports.Route = Route;

class Response extends _channelOwner.ChannelOwner {
  static from(response) {
    return response._object;
  }

  static fromNullable(response) {
    return response ? Response.from(response) : null;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
    this._headers = void 0;
    this._request = void 0;
    this._headers = (0, _utils.headersArrayToObject)(initializer.headers, true
    /* lowerCase */
    );
    this._request = Request.from(this._initializer.request);
    this._request._headers = (0, _utils.headersArrayToObject)(initializer.requestHeaders, true
    /* lowerCase */
    );
    Object.assign(this._request._timing, this._initializer.timing);
  }

  url() {
    return this._initializer.url;
  }

  ok() {
    return this._initializer.status === 0 || this._initializer.status >= 200 && this._initializer.status <= 299;
  }

  status() {
    return this._initializer.status;
  }

  statusText() {
    return this._initializer.statusText;
  }

  headers() {
    return { ...this._headers
    };
  }

  async finished() {
    return this._wrapApiCall(async channel => {
      const result = await channel.finished();
      if (result.error) return new Error(result.error);
      return null;
    });
  }

  async body() {
    return this._wrapApiCall(async channel => {
      return Buffer.from((await channel.body()).binary, 'base64');
    });
  }

  async text() {
    const content = await this.body();
    return content.toString('utf8');
  }

  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }

  request() {
    return this._request;
  }

  frame() {
    return this._request.frame();
  }

  async serverAddr() {
    return this._wrapApiCall(async channel => {
      return (await channel.serverAddr()).value || null;
    });
  }

  async securityDetails() {
    return this._wrapApiCall(async channel => {
      return (await channel.securityDetails()).value || null;
    });
  }

}

exports.Response = Response;

class WebSocket extends _channelOwner.ChannelOwner {
  static from(webSocket) {
    return webSocket._object;
  }

  constructor(parent, type, guid, initializer) {
    super(parent, type, guid, initializer);
    this._page = void 0;
    this._isClosed = void 0;
    this._isClosed = false;
    this._page = parent;

    this._channel.on('frameSent', event => {
      if (event.opcode === 1) this.emit(_events.Events.WebSocket.FrameSent, {
        payload: event.data
      });else if (event.opcode === 2) this.emit(_events.Events.WebSocket.FrameSent, {
        payload: Buffer.from(event.data, 'base64')
      });
    });

    this._channel.on('frameReceived', event => {
      if (event.opcode === 1) this.emit(_events.Events.WebSocket.FrameReceived, {
        payload: event.data
      });else if (event.opcode === 2) this.emit(_events.Events.WebSocket.FrameReceived, {
        payload: Buffer.from(event.data, 'base64')
      });
    });

    this._channel.on('socketError', ({
      error
    }) => this.emit(_events.Events.WebSocket.Error, error));

    this._channel.on('close', () => {
      this._isClosed = true;
      this.emit(_events.Events.WebSocket.Close, this);
    });
  }

  url() {
    return this._initializer.url;
  }

  isClosed() {
    return this._isClosed;
  }

  async waitForEvent(event, optionsOrPredicate = {}) {
    return this._wrapApiCall(async channel => {
      const timeout = this._page._timeoutSettings.timeout(typeof optionsOrPredicate === 'function' ? {} : optionsOrPredicate);

      const predicate = typeof optionsOrPredicate === 'function' ? optionsOrPredicate : optionsOrPredicate.predicate;

      const waiter = _waiter.Waiter.createForEvent(this, event);

      waiter.rejectOnTimeout(timeout, `Timeout while waiting for event "${event}"`);
      if (event !== _events.Events.WebSocket.Error) waiter.rejectOnEvent(this, _events.Events.WebSocket.Error, new Error('Socket error'));
      if (event !== _events.Events.WebSocket.Close) waiter.rejectOnEvent(this, _events.Events.WebSocket.Close, new Error('Socket closed'));
      waiter.rejectOnEvent(this._page, _events.Events.Page.Close, new Error('Page closed'));
      const result = await waiter.waitForEvent(this, event, predicate);
      waiter.dispose();
      return result;
    });
  }

}

exports.WebSocket = WebSocket;

function validateHeaders(headers) {
  for (const key of Object.keys(headers)) {
    const value = headers[key];
    if (!Object.is(value, undefined) && !(0, _utils.isString)(value)) throw new Error(`Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
  }
}