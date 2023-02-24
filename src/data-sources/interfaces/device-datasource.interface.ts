/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from 'models/device.interface';

export interface DeviceDataSource {
    create(device: DeviceRequestModel): void;
    createMany(devices: DeviceRequestModel[]): void;
    getOne(id: string): Promise<DeviceResponseModel | null>;
    getAll(): Promise<DeviceResponseModel[]>;
    updateOne(id: string, data: DeviceRequestModel): void;
    updateMany(query: any, data: DeviceRequestModel[]): void;
    deleteOne(id: string): void;
    deleteMany(query: any): void;
}
