import Device from '../entities/device.entity';
import { DeviceRequestModel } from '../models/device.interface';
import { DeviceRepository } from '../repositories/interfaces/device.interface';

export class DeviceUsecase {
    deviceRepository: DeviceRepository;
    constructor(deviceRepository: DeviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    async createDevice(_device: DeviceRequestModel) {
        try {
            const device = new Device(_device);
            const newDevice = await this.deviceRepository.createDevice(device);
            return newDevice;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }
}
