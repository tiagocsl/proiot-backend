/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from 'models/device.interface';

export interface DeviceRepository {
    create(device: DeviceRequestModel): void;
    createMany(devices: DeviceRequestModel[]): void;
    getAll(): Promise<DeviceResponseModel[]>;
    getOne(id: string): Promise<DeviceResponseModel | null>;
    updateOne(id: string, data: DeviceRequestModel): void;
    updateMany(query: any, data: DeviceRequestModel[]): void;
    deleteOne(id: string): void;
    deleteMany(query: any): void;
}
