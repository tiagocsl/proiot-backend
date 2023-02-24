/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CommonDatabaseWrapper {
    find(query: object): Promise<unknown[]>;
    getAll(): Promise<unknown[]>;
    insertOne(doc: unknown): void;
    insertMany(doc: unknown): void;
    updateOne(id: string, data: object): void;
    updateMany(query: any, data: object): void;
    deleteOne(id: string): void;
    deleteMany(query: any): void;
}
