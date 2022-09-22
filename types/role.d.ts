export declare class Role {
    static any(): string;
    static user(id: string): string;
    static users(): string;
    static guests(): string;
    static team(id: string, role?: string): string;
    static status(status: string): string;
}
