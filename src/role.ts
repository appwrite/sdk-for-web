export class Role {
    public static any(): string {
        return 'any'
    }

    public static user(id: string): string {
        return `user:${id}`
    }
    
    public static users(): string {
        return 'users'
    }
    
    public static guests(): string {
        return 'guests'
    }
    
    public static team(id: string, role: string = ''): string {
        if(role === '') {
            return `team:${id}`
        }
        return `team:${id}/${role}`
    }
    
    public static status(status: string): string {
        return `status:${status}`
    }
}