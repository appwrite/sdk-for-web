export class Payload {
    public filename?: string;
    public size: number;

    private data: Blob;

    constructor(data: Blob, filename?: string) {
        this.data = data;
        this.filename = filename;
        this.size = data.size;
    }

    public async toString(): Promise<string> {
        return await this.data.text();
    }

    public async toJson<T = unknown>(): Promise<T> {
        return JSON.parse(await this.data.text());
    }

    public async toBinary(offset: number = 0, length?: number): Promise<ArrayBuffer> {
        const end = length ? offset + length : this.size;
        return await this.data.slice(offset, end).arrayBuffer();
    }

    public async toFile(filename?: string): Promise<Blob> {
        return this.data;
    }

    public static fromFile(file: File | Blob, filename?: string): Payload {
        if (file instanceof File && !filename) {
            filename = file.name;
        }
        return new Payload(file, filename);
    }

    public static fromString(data: string, filename?: string): Payload {
        return new Payload(new Blob([data]), filename);
    }

    public static fromJson<T = unknown>(data: T, filename?: string): Payload {
        return new Payload(new Blob([JSON.stringify(data)]), filename);
    }

    public static fromBinary(data: ArrayBuffer, filename?: string): Payload {
        return new Payload(new Blob([data]), filename);
    }
}