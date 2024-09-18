import { Payload } from "payload";

export class MultipartParser {
  private buffer: ArrayBuffer;
  private boundary: string;
  private parts: Record<string, any>;

  constructor(buffer: ArrayBuffer, contentType: string) {
    this.buffer = buffer;
    this.boundary = this._extractBoundary(contentType);
    this.parts = {};
    this.parse();
  }

  private _extractBoundary(contentType: string) {
    const match = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (match) {
      return match[1] || match[2];
    }
    throw new Error("Boundary not found in Content-Type header");
  }

  private _findBoundaryPositions(view: Uint8Array, boundary: Uint8Array): number[] {
    const positions: number[] = [];
    for (let i = 0; i < view.length - boundary.length + 1; i++) {
      if (view[i] === boundary[0] && view.slice(i, i + boundary.length).every((byte, index) => byte === boundary[index])) {
        positions.push(i);
      }
    }
    return positions;
  }

  parse() {
    const view = new Uint8Array(this.buffer);
    const boundaryBytes = new TextEncoder().encode(`--${this.boundary}`);
    const boundaryPositions = this._findBoundaryPositions(view, boundaryBytes);

    for (let i = 0; i < boundaryPositions.length - 1; i++) {
      const start = boundaryPositions[i] + boundaryBytes.length;
      let end = boundaryPositions[i + 1];

      // Skip initial CRLF after boundary
      const partStart = view[start] === 13 && view[start + 1] === 10 ? start + 2 : start;
      
      // Find the end of headers
      const headersEndIndex = this._findSequence(view.slice(partStart, end), [13, 10, 13, 10]);
      if (headersEndIndex === -1) continue;

      const headersView = view.slice(partStart, partStart + headersEndIndex);
      const contentStart = partStart + headersEndIndex + 4; // +4 to skip \r\n\r\n

      // Trim CRLF before the next boundary
      while (end > contentStart && (view[end - 1] === 10 || view[end - 2] === 13)) {
        end -= (view[end - 2] === 13) ? 2 : 1;
      }

      const contentView = view.slice(contentStart, end);

      const headers = this._parseHeaders(headersView);
      const name = this._extractName(headers['content-disposition'] || '');

      this.parts[name] = {
        contents: contentView,
        headers: headers
      };
    }
  }

  private _findSequence(view: Uint8Array, sequence: number[]): number {
    for (let i = 0; i <= view.length - sequence.length; i++) {
      if (sequence.every((byte, j) => view[i + j] === byte)) {
        return i;
      }
    }
    return -1;
  }

  private _parseHeaders(headersView: Uint8Array): Record<string, string> {
    const headersText = new TextDecoder().decode(headersView);
    const headers: Record<string, string> = {};
    headersText.split('\r\n').forEach(header => {
      const [key, value] = header.split(': ');
      if (key && value) {
        headers[key.toLowerCase()] = value;
      }
    });
    return headers;
  }

  private _extractName(contentDisposition: string): string {
    const nameMatch = contentDisposition.match(/name="([^"]*)"/);
    return nameMatch ? nameMatch[1] : `unnamed_part_${Object.keys(this.parts).length}`;
  }

  toObject() {
    const result: Record<string, any> = {};

    for (const [name, part] of Object.entries(this.parts)) {
      switch (name) {
        case "responseBody":
          result[name] = Payload.fromBinary(part.contents);
          break;
        case "responseHeaders":
          result[name] = JSON.parse(new TextDecoder().decode(part.contents));
          break;
        case "responseStatusCode":
          result[name] = parseInt(new TextDecoder().decode(part.contents), 10);
          break;
        case "duration":
          result[name] = parseFloat(new TextDecoder().decode(part.contents));
          break;
        default:
          result[name] = new TextDecoder().decode(part.contents);
      }
    }

    return result;
  }
}