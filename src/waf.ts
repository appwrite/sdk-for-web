/**
 * Appwrite WAF challenge handler (browser).
 *
 * When a request is met with `waf_challenge_required`, the client solves the
 * challenge advertised by the `X-Appwrite-WAF-*` headers, exchanges the
 * solution for a short-lived clearance token, and retries the request with it —
 * transparently, so application code never sees the challenge.
 *
 * The solver is a dependency-free pure-JS SHA-256 (crypto.subtle's per-call
 * async overhead makes a digest-in-a-loop far slower for this access pattern);
 * it yields between chunks so the tab stays responsive. Solves are single-flight
 * (concurrent 403s share one solve), and the clearance token is cached until
 * shortly before it expires.
 *
 * NOTE: this file is emitted by sdk-generator (templates/web/src/waf.ts.twig).
 * Edit it there, not in the generated SDK, or a regen will overwrite your change.
 */

export const WAF_CHALLENGE_ERROR = 'waf_challenge_required';

const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function utf8Bytes(str: string): number[] {
    const b: number[] = [];
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 0x80) b.push(c);
        else if (c < 0x800) b.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        else if (c < 0xd800 || c >= 0xe000) b.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        else {
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
            b.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        }
    }
    return b;
}

function sha256Bytes(bytes: number[]): Uint8Array {
    const l = bytes.length;
    const withOne = l + 1;
    const k = (56 - (withOne % 64) + 64) % 64;
    const total = withOne + k + 8;
    const m = new Uint8Array(total);
    m.set(bytes, 0);
    m[l] = 0x80;
    const bitLen = l * 8;
    m[total - 4] = (bitLen >>> 24) & 0xff;
    m[total - 3] = (bitLen >>> 16) & 0xff;
    m[total - 2] = (bitLen >>> 8) & 0xff;
    m[total - 1] = bitLen & 0xff;

    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a,
        h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    const w = new Int32Array(64);

    for (let off = 0; off < total; off += 64) {
        for (let i = 0; i < 16; i++) {
            const j = off + i * 4;
            w[i] = (m[j] << 24) | (m[j + 1] << 16) | (m[j + 2] << 8) | m[j + 3];
        }
        for (let i = 16; i < 64; i++) {
            const a = w[i - 15], b = w[i - 2];
            const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3);
            const s1 = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }
        let A = h0, B = h1, C = h2, D = h3, E = h4, F = h5, G = h6, H = h7;
        for (let i = 0; i < 64; i++) {
            const S1 = ((E >>> 6) | (E << 26)) ^ ((E >>> 11) | (E << 21)) ^ ((E >>> 25) | (E << 7));
            const ch = (E & F) ^ ((~E) & G);
            const t1 = (H + S1 + ch + K[i] + w[i]) | 0;
            const S0 = ((A >>> 2) | (A << 30)) ^ ((A >>> 13) | (A << 19)) ^ ((A >>> 22) | (A << 10));
            const maj = (A & B) ^ (A & C) ^ (B & C);
            const t2 = (S0 + maj) | 0;
            H = G; G = F; F = E; E = (D + t1) | 0; D = C; C = B; B = A; A = (t1 + t2) | 0;
        }
        h0 = (h0 + A) | 0; h1 = (h1 + B) | 0; h2 = (h2 + C) | 0; h3 = (h3 + D) | 0;
        h4 = (h4 + E) | 0; h5 = (h5 + F) | 0; h6 = (h6 + G) | 0; h7 = (h7 + H) | 0;
    }
    const out = new Uint8Array(32);
    const hs = [h0, h1, h2, h3, h4, h5, h6, h7];
    for (let i = 0; i < 8; i++) {
        out[i * 4] = (hs[i] >>> 24) & 0xff;
        out[i * 4 + 1] = (hs[i] >>> 16) & 0xff;
        out[i * 4 + 2] = (hs[i] >>> 8) & 0xff;
        out[i * 4 + 3] = hs[i] & 0xff;
    }
    return out;
}

function leadingZeroBits(digest: Uint8Array): number {
    let bits = 0;
    for (let i = 0; i < digest.length; i++) {
        const byte = digest[i];
        if (byte === 0) { bits += 8; continue; }
        for (let mask = 0x80; mask > 0; mask >>= 1) {
            if (byte & mask) return bits;
            bits++;
        }
    }
    return bits;
}

function meets(nonce: string, solution: string, difficulty: number): boolean {
    return leadingZeroBits(sha256Bytes(utf8Bytes(nonce + '.' + solution))) >= difficulty;
}

/** Chunked, yielding solve so the browser tab stays responsive. */
export function solveChallenge(nonce: string, difficulty: number, chunk = 2000): Promise<string> {
    const yieldTo: (fn: () => void) => void = (typeof requestAnimationFrame === 'function')
        ? requestAnimationFrame
        : (fn) => setTimeout(fn, 0);
    return new Promise((resolve) => {
        let n = 0;
        const step = () => {
            const end = n + chunk;
            for (; n < end; n++) {
                if (meets(nonce, String(n), difficulty)) { resolve(String(n)); return; }
            }
            yieldTo(step);
        };
        yieldTo(step);
    });
}

const DEADLINE_SKEW_MS = 30_000;

/**
 * Stateful per-client challenge handler: single-flight solve + token cache.
 */
export class WafChallenge {
    private clearance: { token: string; deadline: number } | null = null;
    private inflight: Promise<string> | null = null;

    constructor(
        private readonly getEndpoint: () => string,
        private readonly getProject: () => string,
    ) {}

    /** Currently-valid clearance token, or null. */
    token(): string | null {
        return this.clearance && Date.now() < this.clearance.deadline ? this.clearance.token : null;
    }

    /** Drop the cached clearance (e.g. it was rejected — stale / IP changed). */
    reset(): void {
        this.clearance = null;
    }

    /**
     * Solve the challenge described by the response headers and mint a clearance.
     * Concurrent callers share one in-flight solve.
     */
    solve(headers: Record<string, string>): Promise<string> {
        if (this.inflight) return this.inflight;

        const nonce = headers['x-appwrite-waf-nonce'] || '';
        const difficulty = parseInt(headers['x-appwrite-waf-difficulty'] || '0', 10) || 0;
        const expiresIn = parseInt(headers['x-appwrite-waf-expires-in'] || '0', 10) || 0;

        this.inflight = (async () => {
            const solution = await solveChallenge(nonce, difficulty);
            // Solve UNAUTHENTICATED — only the project header, never key/session.
            const endpoint = this.getEndpoint().replace(/\/+$/, '');
            const res = await fetch(endpoint + '/waf/challenge', {
                method: 'POST',
                headers: { 'content-type': 'application/json', 'x-appwrite-project': this.getProject() },
                body: JSON.stringify({ nonce, solution }),
            });
            if (!res.ok) {
                throw new Error('WAF challenge solve rejected: ' + res.status);
            }
            const body = await res.json();
            const ttl = (body.expiresIn || expiresIn) as number;
            this.clearance = { token: body.token, deadline: Date.now() + Math.max(0, ttl * 1000 - DEADLINE_SKEW_MS) };
            return body.token as string;
        })().finally(() => { this.inflight = null; });

        return this.inflight;
    }
}
