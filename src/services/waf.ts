import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';


export class Waf {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Solve a WAF challenge. When a request is met with a `waf_challenge_required` error, the response carries the challenge parameters in the `X-Appwrite-WAF-Nonce`, `X-Appwrite-WAF-Difficulty` and `X-Appwrite-WAF-Expires-In` headers. Find a `solution` such that `sha256(nonce . '.' . solution)` has at least `difficulty` leading zero bits, then submit the `nonce` and `solution` here. On success you receive a short-lived clearance token to send back on subsequent requests via the `X-Appwrite-WAF-Token` header. This endpoint is unauthenticated — do not send an API key or session with it.
     * 
     *
     * @param {string} params.nonce - Challenge nonce returned in the X-Appwrite-WAF-Nonce header.
     * @param {string} params.solution - Challenge solution for the provided nonce.
     * @throws {AppwriteException}
     * @returns {Promise<Models.WafChallengeToken>}
     */
    createChallenge(params: { nonce: string, solution: string }): Promise<Models.WafChallengeToken>;
    /**
     * Solve a WAF challenge. When a request is met with a `waf_challenge_required` error, the response carries the challenge parameters in the `X-Appwrite-WAF-Nonce`, `X-Appwrite-WAF-Difficulty` and `X-Appwrite-WAF-Expires-In` headers. Find a `solution` such that `sha256(nonce . '.' . solution)` has at least `difficulty` leading zero bits, then submit the `nonce` and `solution` here. On success you receive a short-lived clearance token to send back on subsequent requests via the `X-Appwrite-WAF-Token` header. This endpoint is unauthenticated — do not send an API key or session with it.
     * 
     *
     * @param {string} nonce - Challenge nonce returned in the X-Appwrite-WAF-Nonce header.
     * @param {string} solution - Challenge solution for the provided nonce.
     * @throws {AppwriteException}
     * @returns {Promise<Models.WafChallengeToken>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    createChallenge(nonce: string, solution: string): Promise<Models.WafChallengeToken>;
    createChallenge(
        paramsOrFirst: { nonce: string, solution: string } | string,
        ...rest: [(string)?]    
    ): Promise<Models.WafChallengeToken> {
        let params: { nonce: string, solution: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { nonce: string, solution: string };
        } else {
            params = {
                nonce: paramsOrFirst as string,
                solution: rest[0] as string            
            };
        }
        
        const nonce = params.nonce;
        const solution = params.solution;

        if (typeof nonce === 'undefined') {
            throw new AppwriteException('Missing required parameter: "nonce"');
        }
        if (typeof solution === 'undefined') {
            throw new AppwriteException('Missing required parameter: "solution"');
        }

        const apiPath = '/waf/challenge';
        const payload: Payload = {};
        if (typeof nonce !== 'undefined') {
            payload['nonce'] = nonce;
        }
        if (typeof solution !== 'undefined') {
            payload['solution'] = solution;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'X-Appwrite-Project': this.client.config.project,
            'content-type': 'application/json',
            'accept': 'application/json',
        }

        return this.client.call(
            'post',
            uri,
            apiHeaders,
            payload
        );
    }
}
