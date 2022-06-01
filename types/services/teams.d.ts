import { Service } from '../service';
import type { Models } from '../models';
export declare class Teams extends Service {
    /**
     * List Teams
     *
     * Get a list of all the teams in which the current user is a member. You can
     * use the parameters to filter your results.
     *
     * In admin mode, this endpoint returns a list of all the teams in the current
     * project. [Learn more about different API modes](/docs/admin).
     *
     * @param {string} search
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @param {string} cursorDirection
     * @param {string} orderType
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    list(search?: string, limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderType?: string): Promise<Models.TeamList>;
    /**
     * Create Team
     *
     * Create a new team. The user who creates the team will automatically be
     * assigned as the owner of the team. Only the users with the owner role can
     * invite new members, add new owners and delete or update the team.
     *
     * @param {string} teamId
     * @param {string} name
     * @param {string[]} roles
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    create(teamId: string, name: string, roles?: string[]): Promise<Models.Team>;
    /**
     * Get Team
     *
     * Get a team by its ID. All team members have read access for this resource.
     *
     * @param {string} teamId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    get(teamId: string): Promise<Models.Team>;
    /**
     * Update Team
     *
     * Update a team using its ID. Only members with the owner role can update the
     * team.
     *
     * @param {string} teamId
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    update(teamId: string, name: string): Promise<Models.Team>;
    /**
     * Delete Team
     *
     * Delete a team using its ID. Only team members with the owner role can
     * delete the team.
     *
     * @param {string} teamId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    delete(teamId: string): Promise<{}>;
    /**
     * Get Team Memberships
     *
     * Use this endpoint to list a team's members using the team's ID. All team
     * members have read access to this endpoint.
     *
     * @param {string} teamId
     * @param {string} search
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @param {string} cursorDirection
     * @param {string} orderType
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getMemberships(teamId: string, search?: string, limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderType?: string): Promise<Models.MembershipList>;
    /**
     * Create Team Membership
     *
     * Invite a new member to join your team. If initiated from the client SDK, an
     * email with a link to join the team will be sent to the member's email
     * address and an account will be created for them should they not be signed
     * up already. If initiated from server-side SDKs, the new member will
     * automatically be added to the team.
     *
     * Use the 'url' parameter to redirect the user from the invitation email back
     * to your app. When the user is redirected, use the [Update Team Membership
     * Status](/docs/client/teams#teamsUpdateMembershipStatus) endpoint to allow
     * the user to accept the invitation to the team.
     *
     * Please note that to avoid a [Redirect
     * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
     * the only valid redirect URL's are the once from domains you have set when
     * adding your platforms in the console interface.
     *
     * @param {string} teamId
     * @param {string} email
     * @param {string[]} roles
     * @param {string} url
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createMembership(teamId: string, email: string, roles: string[], url: string, name?: string): Promise<Models.Membership>;
    /**
     * Get Team Membership
     *
     * Get a team member by the membership unique id. All team members have read
     * access for this resource.
     *
     * @param {string} teamId
     * @param {string} membershipId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getMembership(teamId: string, membershipId: string): Promise<Models.MembershipList>;
    /**
     * Update Membership Roles
     *
     * Modify the roles of a team member. Only team members with the owner role
     * have access to this endpoint. Learn more about [roles and
     * permissions](/docs/permissions).
     *
     * @param {string} teamId
     * @param {string} membershipId
     * @param {string[]} roles
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateMembershipRoles(teamId: string, membershipId: string, roles: string[]): Promise<Models.Membership>;
    /**
     * Delete Team Membership
     *
     * This endpoint allows a user to leave a team or for a team owner to delete
     * the membership of any other team member. You can also use this endpoint to
     * delete a user membership even if it is not accepted.
     *
     * @param {string} teamId
     * @param {string} membershipId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteMembership(teamId: string, membershipId: string): Promise<{}>;
    /**
     * Update Team Membership Status
     *
     * Use this endpoint to allow a user to accept an invitation to join a team
     * after being redirected back to your app from the invitation email received
     * by the user.
     *
     * If the request is successful, a session for the user is automatically
     * created.
     *
     *
     * @param {string} teamId
     * @param {string} membershipId
     * @param {string} userId
     * @param {string} secret
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateMembershipStatus(teamId: string, membershipId: string, userId: string, secret: string): Promise<Models.Membership>;
}
