import Device from '../domain/entities/device.entity';
import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../models/device.interface';
import { DeviceRepository } from '../repositories/device.interface';

export class DeviceUsecase {
    deviceRepository: DeviceRepository;
    constructor(deviceRepository: DeviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    async registerDevice(_device: DeviceRequestModel) {
        try {
            const device = new Device(_device);
            const newDevice = await this.deviceRepository.registerDevice(
                device
            );
            return newDevice;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async deleteOneDeviceById(id: string) {
        try {
            await this.deviceRepository.deleteOneDeviceById(id);

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    async updateOneDeviceById(id: string, data: DeviceRequestModel) {
        try {
            const device = await this.deviceRepository.updateOneDeviceById(
                id,
                data
            );

            return device;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    async getOneDeviceById(id: string): Promise<DeviceResponseModel | null> {
        try {
            const result = await this.deviceRepository.getOneDeviceById(id);
            return result;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetOne in the DB. \nError: ${error}`
            );
        }
    }

    async getAllDevices(): Promise<DeviceResponseModel[]> {
        try {
            const results = await this.deviceRepository.getAllDevices();
            return results;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetAll in the DB. \nError: ${error}`
            );
        }
    }
}
