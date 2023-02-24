/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../../models/device.interface';
import { DeviceDataSource } from '../interfaces/device-datasource.interface';
import { InMemoryDatabaseWrapper } from '../interfaces/in-memory-wrapper.interface';

export class InMemoryDeviceDataSource implements DeviceDataSource {
    private db: InMemoryDatabaseWrapper;
    constructor(db: InMemoryDatabaseWrapper) {
        this.db = db;
    }

    async create(device: DeviceRequestModel) {
        await this.db.insertOne(device);
    }

    async createMany(devices: DeviceRequestModel[]) {
        await this.db.insertMany(devices);
    }

    private queryResultMapperToParsedDevice(queryResult: any) {
        return queryResult.map((item: any) => ({
            id: item._id.toString(),
            name: item.name,
            description: item.description,
            createdDate: item.createdDate,
            updatedDate: item.updatedDate,
        }));
    }

    async getOne(id: string): Promise<DeviceResponseModel> {
        const result = await this.db.find({ _id: id });
        const parsedDeviceData = this.queryResultMapperToParsedDevice(result);
        return parsedDeviceData[0];
    }

    async getAll(): Promise<DeviceResponseModel[]> {
        const results = await this.db.find({});
        const parsedDevicesData = this.queryResultMapperToParsedDevice(results);
        return parsedDevicesData;
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
