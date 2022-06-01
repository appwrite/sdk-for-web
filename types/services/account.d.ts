import { Service } from '../service';
import type { Models } from '../models';
export declare class Account extends Service {
    /**
     * Get Account
     *
     * Get currently logged in user data as JSON object.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    get<Preferences extends Models.Preferences>(): Promise<Models.User<Preferences>>;
    /**
     * Create Account
     *
     * Use this endpoint to allow a new user to register a new account in your
     * project. After the user registration completes successfully, you can use
     * the [/account/verfication](/docs/client/account#accountCreateVerification)
     * route to start verifying the user email address. To allow the new user to
     * login to their new account, you need to create a new [account
     * session](/docs/client/account#accountCreateSession).
     *
     * @param {string} userId
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    create<Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>>;
    /**
     * Update Account Email
     *
     * Update currently logged in user account email address. After changing user
     * address, the user confirmation status will get reset. A new confirmation
     * email is not sent automatically however you can use the send confirmation
     * email endpoint again to send the confirmation email. For security measures,
     * user password is required to complete this request.
     * This endpoint can also be used to convert an anonymous account to a normal
     * one, by passing an email address and a new password.
     *
     *
     * @param {string} email
     * @param {string} password
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateEmail<Preferences extends Models.Preferences>(email: string, password: string): Promise<Models.User<Preferences>>;
    /**
     * Create Account JWT
     *
     * Use this endpoint to create a JSON Web Token. You can use the resulting JWT
     * to authenticate on behalf of the current user when working with the
     * Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes
     * from its creation and will be invalid if the user will logout in that time
     * frame.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createJWT(): Promise<Models.Jwt>;
    /**
     * Get Account Logs
     *
     * Get currently logged in user list of latest security activity logs. Each
     * log returns user IP address, location and date and time of log.
     *
     * @param {number} limit
     * @param {number} offset
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getLogs(limit?: number, offset?: number): Promise<Models.LogList>;
    /**
     * Update Account Name
     *
     * Update currently logged in user account name.
     *
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateName<Preferences extends Models.Preferences>(name: string): Promise<Models.User<Preferences>>;
    /**
     * Update Account Password
     *
     * Update currently logged in user password. For validation, user is required
     * to pass in the new password, and the old password. For users created with
     * OAuth, Team Invites and Magic URL, oldPassword is optional.
     *
     * @param {string} password
     * @param {string} oldPassword
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updatePassword<Preferences extends Models.Preferences>(password: string, oldPassword?: string): Promise<Models.User<Preferences>>;
    /**
     * Get Account Preferences
     *
     * Get currently logged in user preferences as a key-value object.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getPrefs<Preferences extends Models.Preferences>(): Promise<Preferences>;
    /**
     * Update Account Preferences
     *
     * Update currently logged in user account preferences. The object you pass is
     * stored as is, and replaces any previous value. The maximum allowed prefs
     * size is 64kB and throws error if exceeded.
     *
     * @param {Partial<Preferences>} prefs
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updatePrefs<Preferences extends Models.Preferences>(prefs: Partial<Preferences>): Promise<Models.User<Preferences>>;
    /**
     * Create Password Recovery
     *
     * Sends the user an email with a temporary secret key for password reset.
     * When the user clicks the confirmation link he is redirected back to your
     * app password reset URL with the secret key and email address values
     * attached to the URL query string. Use the query string params to submit a
     * request to the [PUT
     * /account/recovery](/docs/client/account#accountUpdateRecovery) endpoint to
     * complete the process. The verification link sent to the user's email
     * address is valid for 1 hour.
     *
     * @param {string} email
     * @param {string} url
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createRecovery(email: string, url: string): Promise<Models.Token>;
    /**
     * Create Password Recovery (confirmation)
     *
     * Use this endpoint to complete the user account password reset. Both the
     * **userId** and **secret** arguments will be passed as query parameters to
     * the redirect URL you have provided when sending your request to the [POST
     * /account/recovery](/docs/client/account#accountCreateRecovery) endpoint.
     *
     * Please note that in order to avoid a [Redirect
     * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
     * the only valid redirect URLs are the ones from domains you have set when
     * adding your platforms in the console interface.
     *
     * @param {string} userId
     * @param {string} secret
     * @param {string} password
     * @param {string} passwordAgain
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<Models.Token>;
    /**
     * Get Account Sessions
     *
     * Get currently logged in user list of active sessions across different
     * devices.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getSessions(): Promise<Models.SessionList>;
    /**
     * Create Account Session
     *
     * Allow the user to login into their account by providing a valid email and
     * password combination. This route will create a new session for the user.
     *
     * @param {string} email
     * @param {string} password
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createSession(email: string, password: string): Promise<Models.Session>;
    /**
     * Delete All Account Sessions
     *
     * Delete all sessions from the user account and remove any sessions cookies
     * from the end client.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteSessions(): Promise<{}>;
    /**
     * Create Anonymous Session
     *
     * Use this endpoint to allow a new user to register an anonymous account in
     * your project. This route will also create a new session for the user. To
     * allow the new user to convert an anonymous account to a normal account, you
     * need to update its [email and
     * password](/docs/client/account#accountUpdateEmail) or create an [OAuth2
     * session](/docs/client/account#accountCreateOAuth2Session).
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createAnonymousSession(): Promise<Models.Session>;
    /**
     * Create Magic URL session
     *
     * Sends the user an email with a secret key for creating a session. When the
     * user clicks the link in the email, the user is redirected back to the URL
     * you provided with the secret key and userId values attached to the URL
     * query string. Use the query string parameters to submit a request to the
     * [PUT
     * /account/sessions/magic-url](/docs/client/account#accountUpdateMagicURLSession)
     * endpoint to complete the login process. The link sent to the user's email
     * address is valid for 1 hour. If you are on a mobile device you can leave
     * the URL parameter empty, so that the login completion will be handled by
     * your Appwrite instance by default.
     *
     * @param {string} userId
     * @param {string} email
     * @param {string} url
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createMagicURLSession(userId: string, email: string, url?: string): Promise<Models.Token>;
    /**
     * Create Magic URL session (confirmation)
     *
     * Use this endpoint to complete creating the session with the Magic URL. Both
     * the **userId** and **secret** arguments will be passed as query parameters
     * to the redirect URL you have provided when sending your request to the
     * [POST
     * /account/sessions/magic-url](/docs/client/account#accountCreateMagicURLSession)
     * endpoint.
     *
     * Please note that in order to avoid a [Redirect
     * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
     * the only valid redirect URLs are the ones from domains you have set when
     * adding your platforms in the console interface.
     *
     * @param {string} userId
     * @param {string} secret
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateMagicURLSession(userId: string, secret: string): Promise<Models.Session>;
    /**
     * Create Account Session with OAuth2
     *
     * Allow the user to login to their account using the OAuth2 provider of their
     * choice. Each OAuth2 provider should be enabled from the Appwrite console
     * first. Use the success and failure arguments to provide a redirect URL's
     * back to your app when login is completed.
     *
     * If there is already an active session, the new session will be attached to
     * the logged-in account. If there are no active sessions, the server will
     * attempt to look for a user with the same email address as the email
     * received from the OAuth2 provider and attach the new session to the
     * existing user. If no matching user is found - the server will create a new
     * user..
     *
     *
     * @param {string} provider
     * @param {string} success
     * @param {string} failure
     * @param {string[]} scopes
     * @throws {AppwriteException}
     * @returns {void|string}
     */
    createOAuth2Session(provider: string, success?: string, failure?: string, scopes?: string[]): void | URL;
    /**
     * Get Session By ID
     *
     * Use this endpoint to get a logged in user's session using a Session ID.
     * Inputting 'current' will return the current session being used.
     *
     * @param {string} sessionId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getSession(sessionId: string): Promise<Models.Session>;
    /**
     * Update Session (Refresh Tokens)
     *
     * Access tokens have limited lifespan and expire to mitigate security risks.
     * If session was created using an OAuth provider, this route can be used to
     * "refresh" the access token.
     *
     * @param {string} sessionId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateSession(sessionId: string): Promise<Models.Session>;
    /**
     * Delete Account Session
     *
     * Use this endpoint to log out the currently logged in user from all their
     * account sessions across all of their different devices. When using the
     * Session ID argument, only the unique session ID provided is deleted.
     *
     *
     * @param {string} sessionId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteSession(sessionId: string): Promise<{}>;
    /**
     * Update Account Status
     *
     * Block the currently logged in user account. Behind the scene, the user
     * record is not deleted but permanently blocked from any access. To
     * completely delete a user, use the Users API instead.
     *
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateStatus<Preferences extends Models.Preferences>(): Promise<Models.User<Preferences>>;
    /**
     * Create Email Verification
     *
     * Use this endpoint to send a verification message to your user email address
     * to confirm they are the valid owners of that address. Both the **userId**
     * and **secret** arguments will be passed as query parameters to the URL you
     * have provided to be attached to the verification email. The provided URL
     * should redirect the user back to your app and allow you to complete the
     * verification process by verifying both the **userId** and **secret**
     * parameters. Learn more about how to [complete the verification
     * process](/docs/client/account#accountUpdateVerification). The verification
     * link sent to the user's email address is valid for 7 days.
     *
     * Please note that in order to avoid a [Redirect
     * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md),
     * the only valid redirect URLs are the ones from domains you have set when
     * adding your platforms in the console interface.
     *
     *
     * @param {string} url
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createVerification(url: string): Promise<Models.Token>;
    /**
     * Create Email Verification (confirmation)
     *
     * Use this endpoint to complete the user email verification process. Use both
     * the **userId** and **secret** parameters that were attached to your app URL
     * to verify the user email ownership. If confirmed this route will return a
     * 200 status code.
     *
     * @param {string} userId
     * @param {string} secret
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateVerification(userId: string, secret: string): Promise<Models.Token>;
}
