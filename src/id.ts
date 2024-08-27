/**
 * Helper class to generate ID strings for resources.
 */
export class ID {
    /**
     * Generate an hex ID based on timestamp.
     * Recreated from https://www.php.net/manual/en/function.uniqid.php
     *
     * @returns {string}
     */
    static #hexTimestamp(): string {
        const now = new Date();
        const sec = Math.floor(now.getTime() / 1000);
        const msec = now.getMilliseconds();

        // Convert to hexadecimal
        const hexTimestamp = sec.toString(16) + msec.toString(16).padStart(5, '0');
        return hexTimestamp;
    }

    /**
     * Uses the provided ID as the ID for the resource.
     *
     * @param {string} id
     * @returns {string}
     */
    public static custom(id: string): string {
        return id
    }

    /**
     * Have Appwrite generate a unique ID for you.
     * 
     * @param {number} padding. Default is 7.
     * @returns {string}
     */
    public static unique(padding: number = 7): string {
        // Generate a unique ID with padding to have a longer ID
        const baseId = ID.#hexTimestamp();
        let randomPadding = '';
        for (let i = 0; i < padding; i++) {
            const randomHexDigit = Math.floor(Math.random() * 16).toString(16);
            randomPadding += randomHexDigit;
        }
        return baseId + randomPadding;
    }
}
