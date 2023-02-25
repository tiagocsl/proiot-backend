/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../../models/device.interface';
import { DeviceDataSource } from '../interfaces/device-datasource.interface';
import { NoSQLDatabaseWrapper } from '../interfaces/nosql-database-wrapper.interface';

export class MongoDBDeviceDataSource implements DeviceDataSource {
    private db: NoSQLDatabaseWrapper;
    constructor(db: NoSQLDatabaseWrapper) {
        this.db = db;
    }
    async create(device: DeviceRequestModel) {
        await this.db.create(device);
    }

    async createMany(devices: DeviceRequestModel[]) {
        await this.db.createMany(devices);
    }

    private queryResultToParsedDevice(queryResult: any) {
        return {
            id: queryResult._id.toString(),
            name: queryResult.name,
            description: queryResult.description,
            createdDate: queryResult.createdDate,
            updatedDate: queryResult.updatedDate,
        };
    }

    async getOne(id: string): Promise<DeviceResponseModel> {
        const result = await this.db.getOne(id);
        const parsedDevice = this.queryResultToParsedDevice(result);
        return parsedDevice;
    }

    async getAll(): Promise<DeviceResponseModel[]> {
        const results = await this.db.getAll();
        const parsedDevices = results.map((device) => {
            return this.queryResultToParsedDevice(device);
        });
        return parsedDevices;
    }

    async updateOne(id: string, data: DeviceRequestModel) {
        await this.db.updateOne(id, data);
    }

    async updateMany(query: any, data: DeviceRequestModel[]) {
        await this.db.updateMany(query, data);
    }

    async deleteOne(id: string) {
        await this.db.deleteOne(id);
    }

    async deleteMany(query: any) {
        await this.db.deleteMany(query);
    }
}
