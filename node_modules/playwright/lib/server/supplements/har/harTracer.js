"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HarTracer = void 0;

var _url = require("url");

var _fs = _interopRequireDefault(require("fs"));

var _browserContext = require("../../browserContext");

var _helper = require("../../helper");

var network = _interopRequireWildcard(require("../../network"));

var _page = require("../../page");

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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const FALLBACK_HTTP_VERSION = 'HTTP/1.1';

class HarTracer {
  constructor(context, options) {
    this._options = void 0;
    this._log = void 0;
    this._pageEntries = new Map();
    this._entries = new Map();
    this._lastPage = 0;
    this._barrierPromises = new Set();
    this._options = options;
    this._log = {
      version: '1.2',
      creator: {
        name: 'Playwright',
        version: require('../../../../package.json')['version']
      },
      browser: {
        name: context._browser.options.name,
        version: context._browser.version()
      },
      pages: [],
      entries: []
    };
    context.on(_browserContext.BrowserContext.Events.Page, page => this._ensurePageEntry(page));
    context.on(_browserContext.BrowserContext.Events.Request, request => this._onRequest(request));
    context.on(_browserContext.BrowserContext.Events.RequestFinished, request => this._onRequestFinished(request).catch(() => {}));
    context.on(_browserContext.BrowserContext.Events.Response, response => this._onResponse(response));
  }

  _ensurePageEntry(page) {
    let pageEntry = this._pageEntries.get(page);

    if (!pageEntry) {
      page.on(_page.Page.Events.DOMContentLoaded, () => this._onDOMContentLoaded(page));
      page.on(_page.Page.Events.Load, () => this._onLoad(page));
      pageEntry = {
        startedDateTime: new Date(),
        id: `page_${this._lastPage++}`,
        title: '',
        pageTimings: {
          onContentLoad: -1,
          onLoad: -1
        }
      };

      this._pageEntries.set(page, pageEntry);

      this._log.pages.push(pageEntry);
    }

    return pageEntry;
  }

  _onDOMContentLoaded(page) {
    const pageEntry = this._ensurePageEntry(page);

    const promise = page.mainFrame().evaluateExpression(String(() => {
      return {
        title: document.title,
        domContentLoaded: performance.timing.domContentLoadedEventStart
      };
    }), true, undefined, 'utility').then(result => {
      pageEntry.title = result.title;
      pageEntry.pageTimings.onContentLoad = result.domContentLoaded;
    }).catch(() => {});

    this._addBarrier(page, promise);
  }

  _onLoad(page) {
    const pageEntry = this._ensurePageEntry(page);

    const promise = page.mainFrame().evaluateExpression(String(() => {
      return {
        title: document.title,
        loaded: performance.timing.loadEventStart
      };
    }), true, undefined, 'utility').then(result => {
      pageEntry.title = result.title;
      pageEntry.pageTimings.onLoad = result.loaded;
    }).catch(() => {});

    this._addBarrier(page, promise);
  }

  _addBarrier(page, promise) {
    const race = Promise.race([new Promise(f => page.on('close', () => {
      this._barrierPromises.delete(race);

      f();
    })), promise]);

    this._barrierPromises.add(race);
  }

  _onRequest(request) {
    const page = request.frame()._page;

    const url = network.parsedURL(request.url());
    if (!url) return;

    const pageEntry = this._ensurePageEntry(page);

    const harEntry = {
      pageref: pageEntry.id,
      startedDateTime: new Date(),
      time: -1,
      request: {
        method: request.method(),
        url: request.url(),
        httpVersion: FALLBACK_HTTP_VERSION,
        cookies: [],
        headers: [],
        queryString: [...url.searchParams].map(e => ({
          name: e[0],
          value: e[1]
        })),
        postData: postDataForHar(request),
        headersSize: -1,
        bodySize: calculateRequestBodySize(request) || 0
      },
      response: {
        status: -1,
        statusText: '',
        httpVersion: FALLBACK_HTTP_VERSION,
        cookies: [],
        headers: [],
        content: {
          size: -1,
          mimeType: request.headerValue('content-type') || 'x-unknown'
        },
        headersSize: -1,
        bodySize: -1,
        redirectURL: '',
        _transferSize: -1
      },
      cache: {
        beforeRequest: null,
        afterRequest: null
      },
      timings: {
        send: -1,
        wait: -1,
        receive: -1
      }
    };

    if (request.redirectedFrom()) {
      const fromEntry = this._entries.get(request.redirectedFrom());

      fromEntry.response.redirectURL = request.url();
    }

    this._log.entries.push(harEntry);

    this._entries.set(request, harEntry);
  }

  async _onRequestFinished(request) {
    const page = request.frame()._page;

    const harEntry = this._entries.get(request);

    const response = await request.response();
    if (!response) return;
    const httpVersion = normaliseHttpVersion(response._httpVersion);
    const transferSize = response._transferSize || -1;
    const headersSize = calculateResponseHeadersSize(httpVersion, response.status(), response.statusText(), response.headers());
    const bodySize = transferSize !== -1 ? transferSize - headersSize : -1;
    harEntry.request.httpVersion = httpVersion;
    harEntry.response.bodySize = bodySize;
    harEntry.response.headersSize = headersSize;
    harEntry.response._transferSize = transferSize;
    harEntry.request.headersSize = calculateRequestHeadersSize(request.method(), request.url(), httpVersion, request.headers());
    const promise = response.body().then(buffer => {
      const content = harEntry.response.content;
      content.size = buffer.length;
      content.compression = harEntry.response.bodySize !== -1 ? buffer.length - harEntry.response.bodySize : 0;

      if (!this._options.omitContent && buffer && buffer.length > 0) {
        content.text = buffer.toString('base64');
        content.encoding = 'base64';
      }
    }).catch(() => {});

    this._addBarrier(page, promise);
  }

  _onResponse(response) {
    const page = response.frame()._page;

    const pageEntry = this._ensurePageEntry(page);

    const harEntry = this._entries.get(response.request()); // Rewrite provisional headers with actual


    const request = response.request();
    harEntry.request.headers = request.headers().map(header => ({
      name: header.name,
      value: header.value
    }));
    harEntry.request.cookies = cookiesForHar(request.headerValue('cookie'), ';');
    harEntry.request.postData = postDataForHar(request);
    harEntry.response = {
      status: response.status(),
      statusText: response.statusText(),
      httpVersion: normaliseHttpVersion(response._httpVersion),
      cookies: cookiesForHar(response.headerValue('set-cookie'), '\n'),
      headers: response.headers().map(header => ({
        name: header.name,
        value: header.value
      })),
      content: {
        size: -1,
        mimeType: response.headerValue('content-type') || 'x-unknown'
      },
      headersSize: -1,
      bodySize: -1,
      redirectURL: '',
      _transferSize: -1
    };
    const timing = response.timing();
    if (pageEntry.startedDateTime.valueOf() > timing.startTime) pageEntry.startedDateTime = new Date(timing.startTime);
    const dns = timing.domainLookupEnd !== -1 ? _helper.helper.millisToRoundishMillis(timing.domainLookupEnd - timing.domainLookupStart) : -1;
    const connect = timing.connectEnd !== -1 ? _helper.helper.millisToRoundishMillis(timing.connectEnd - timing.connectStart) : -1;
    const ssl = timing.connectEnd !== -1 ? _helper.helper.millisToRoundishMillis(timing.connectEnd - timing.secureConnectionStart) : -1;
    const wait = timing.responseStart !== -1 ? _helper.helper.millisToRoundishMillis(timing.responseStart - timing.requestStart) : -1;
    const receive = response.request()._responseEndTiming !== -1 ? _helper.helper.millisToRoundishMillis(response.request()._responseEndTiming - timing.responseStart) : -1;
    harEntry.timings = {
      dns,
      connect,
      ssl,
      send: 0,
      wait,
      receive
    };
    harEntry.time = [dns, connect, ssl, wait, receive].reduce((pre, cur) => cur > 0 ? cur + pre : pre, 0);

    this._addBarrier(page, response.serverAddr().then(server => {
      if (server !== null && server !== void 0 && server.ipAddress) harEntry.serverIPAddress = server.ipAddress;
      if (server !== null && server !== void 0 && server.port) harEntry._serverPort = server.port;
    }));

    this._addBarrier(page, response.securityDetails().then(details => {
      if (details) harEntry._securityDetails = details;
    }));
  }

  async flush() {
    await Promise.all(this._barrierPromises);

    for (const pageEntry of this._log.pages) {
      if (pageEntry.pageTimings.onContentLoad >= 0) pageEntry.pageTimings.onContentLoad -= pageEntry.startedDateTime.valueOf();else pageEntry.pageTimings.onContentLoad = -1;
      if (pageEntry.pageTimings.onLoad >= 0) pageEntry.pageTimings.onLoad -= pageEntry.startedDateTime.valueOf();else pageEntry.pageTimings.onLoad = -1;
    }

    await _fs.default.promises.writeFile(this._options.path, JSON.stringify({
      log: this._log
    }, undefined, 2));
  }

}

exports.HarTracer = HarTracer;

function postDataForHar(request) {
  const postData = request.postDataBuffer();
  if (!postData) return;
  const contentType = request.headerValue('content-type') || 'application/octet-stream';
  const result = {
    mimeType: contentType,
    text: contentType === 'application/octet-stream' ? '' : postData.toString(),
    params: []
  };

  if (contentType === 'application/x-www-form-urlencoded') {
    const parsed = new URLSearchParams(postData.toString());

    for (const [name, value] of parsed.entries()) result.params.push({
      name,
      value
    });
  }

  return result;
}

function cookiesForHar(header, separator) {
  if (!header) return [];
  return header.split(separator).map(c => parseCookie(c));
}

function parseCookie(c) {
  const cookie = {
    name: '',
    value: ''
  };
  let first = true;

  for (const pair of c.split(/; */)) {
    const indexOfEquals = pair.indexOf('=');
    const name = indexOfEquals !== -1 ? pair.substr(0, indexOfEquals).trim() : pair.trim();
    const value = indexOfEquals !== -1 ? pair.substr(indexOfEquals + 1, pair.length).trim() : '';

    if (first) {
      first = false;
      cookie.name = name;
      cookie.value = value;
      continue;
    }

    if (name === 'Domain') cookie.domain = value;
    if (name === 'Expires') cookie.expires = new Date(value);
    if (name === 'HttpOnly') cookie.httpOnly = true;
    if (name === 'Max-Age') cookie.expires = new Date(Date.now() + +value * 1000);
    if (name === 'Path') cookie.path = value;
    if (name === 'SameSite') cookie.sameSite = value;
    if (name === 'Secure') cookie.secure = true;
  }

  return cookie;
}

function calculateResponseHeadersSize(protocol, status, statusText, headers) {
  let rawHeaders = `${protocol} ${status} ${statusText}\r\n`;

  for (const header of headers) rawHeaders += `${header.name}: ${header.value}\r\n`;

  rawHeaders += '\r\n';
  return rawHeaders.length;
}

function calculateRequestHeadersSize(method, url, httpVersion, headers) {
  let rawHeaders = `${method} ${new _url.URL(url).pathname} ${httpVersion}\r\n`;

  for (const header of headers) rawHeaders += `${header.name}: ${header.value}\r\n`;

  return rawHeaders.length;
}

function normaliseHttpVersion(httpVersion) {
  if (!httpVersion) return FALLBACK_HTTP_VERSION;
  if (httpVersion === 'http/1.1') return 'HTTP/1.1';
  return httpVersion;
}

function calculateRequestBodySize(request) {
  const postData = request.postDataBuffer();
  if (!postData) return;
  return new TextEncoder().encode(postData.toString('utf8')).length;
}