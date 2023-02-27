/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, Document, ObjectId } from 'mongodb';

import {
    DeviceRequestModel,
    DeviceResponseModel,
} from '../../core/models/device.interface';
import { DeviceRepository } from '../../core/repositories/device.interface';

export class DeviceRepositoryImpl implements DeviceRepository {
    deviceDataSource: Collection<Document>;
    constructor(deviceDataSource: Collection<Document>) {
        this.deviceDataSource = deviceDataSource;
    }

    async registerDevice(device: DeviceRequestModel) {
        try {
            await this.deviceDataSource.insertOne(device);
        } catch (error) {
            throw new Error(
                `An error occurred while trying to insert in the DB. \nError: ${error}`
            );
        }
    }

    async deleteOneDeviceById(id: string) {
        try {
            await this.deviceDataSource.deleteOne({
                _id: new ObjectId(id),
            });

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    async updateOneDeviceById(id: string, data: DeviceRequestModel) {
        try {
            const device = await this.deviceDataSource.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $set: { name: data.name, description: data.description },
                }
            );

            return device;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    private queryResultToParsedDevice(queryResult: any) {
        return {
            id: queryResult._id.toString(),
            name: queryResult._name,
            description: queryResult._description,
            createdDate: queryResult._createdDate,
            updatedDate: queryResult._updatedDate,
        };
    }

    async getOneDeviceById(id: string): Promise<DeviceResponseModel | null> {
        try {
            const result = await this.deviceDataSource.findOne({
                _id: new ObjectId(id),
            });
            const parsedMeasurement = this.queryResultToParsedDevice(result);
            return parsedMeasurement;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetOne in the DB. \nError: ${error}`
            );
        }
    }

    async getAllDevices(): Promise<DeviceResponseModel[]> {
        try {
            const results = await this.deviceDataSource.find().toArray();
            const parsedMeasurements = results.map((measurement) => {
                return this.queryResultToParsedDevice(measurement);
            });
            return parsedMeasurements;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetAll in the DB. \nError: ${error}`
            );
        }
    }
}
