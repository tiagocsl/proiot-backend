/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeviceDataSource } from '../data-sources/interfaces/device-datasource.interface';
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../models/device.interface';
import { DeviceRepository } from './interfaces/device.interface';

export class DeviceRepositoryImpl implements DeviceRepository {
    deviceDataSource: DeviceDataSource;
    constructor(deviceDataSource: DeviceDataSource) {
        this.deviceDataSource = deviceDataSource;
    }

    async deleteOneDevice(id: string) {
        await this.deviceDataSource.deleteOne(id);
    }

    async deleteManyDevices(query: any) {
        await this.deviceDataSource.deleteMany(query);
    }

    async updateOneDevice(id: string, data: DeviceRequestModel) {
        await this.deviceDataSource.updateOne(id, data);
    }

    async updateManyDevices(id: string, data: DeviceRequestModel[]) {
        await this.deviceDataSource.updateMany(id, data);
    }

    async getOneDevice(id: string): Promise<DeviceResponseModel | null> {
        const result = await this.deviceDataSource.getOne(id);
        return result;
    }

    async createDevice(device: DeviceRequestModel) {
        await this.deviceDataSource.create(device);
    }

    async createManyDevices(devices: DeviceRequestModel[]) {
        await this.deviceDataSource.createMany(devices);
    }

    async getAllDevices(): Promise<DeviceResponseModel[]> {
        const result = await this.deviceDataSource.getAll();
        return result;
    }
}
