/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../../models/device.interface';

export interface DeviceRepository {
    createDevice(device: DeviceRequestModel): void;
    createManyDevices(devices: DeviceRequestModel[]): void;
    getAllDevices(): Promise<DeviceResponseModel[]>;
    getOneDevice(id: string): Promise<DeviceResponseModel | null>;
    updateOneDevice(id: string, data: DeviceRequestModel): void;
    updateManyDevices(query: any, data: DeviceRequestModel[]): void;
    deleteOneDevice(id: string): void;
    deleteManyDevices(query: any): void;
}
