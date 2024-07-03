/**
 * Helper class to generate permission strings for resources.
 */
export class Permission {
    /**
     * Generate read permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    static read = (role: string): string => {
        return `read("${role}")`;
    }

    /**
     * Generate write permission string for the provided role.
     *
     * This is an alias of update, delete, and possibly create.
     * Don't use write in combination with update, delete, or create.
     *
     * @param {string} role
     * @returns {string}
     */
    static write = (role: string): string => {
        return `write("${role}")`;
    }

    /**
     * Generate create permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    static create = (role: string): string => {
        return `create("${role}")`;
    }

    /**
     * Generate update permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    static update = (role: string): string => {
        return `update("${role}")`;
    }

    /**
     * Generate delete permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    static delete = (role: string): string => {
        return `delete("${role}")`;
    }
}
