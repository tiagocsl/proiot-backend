/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../models/device.interface';

export interface DeviceRepository {
    registerDevice(device: DeviceRequestModel): void;
    getAllDevices(): Promise<DeviceResponseModel[]>;
    getOneDeviceById(id: string): Promise<DeviceResponseModel | null>;
    updateOneDeviceById(id: string, data: DeviceRequestModel): void;
    deleteOneDeviceById(id: string): void;
}
