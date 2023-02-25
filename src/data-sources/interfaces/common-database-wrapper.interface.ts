/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CommonDatabaseWrapper {
    getOne(id: string): Promise<any>;
    getAll(): Promise<any[]>;
    create(doc: any): void;
    createMany(doc: any): void;
    updateOne(id: string, data: object): void;
    updateMany(query: any, data: object): void;
    deleteOne(id: string): void;
    deleteMany(query: any): void;
}
