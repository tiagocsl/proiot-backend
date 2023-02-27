/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, Document, ObjectId } from 'mongodb';

import {
    MeasurementRequestModelToRepo,
    MeasurementResponseModel,
} from '../../core/models/measurement.interface';
import { MeasurementRepository } from '../../core/repositories/measurement.interface';

export class MeasurementRepositoryImpl implements MeasurementRepository {
    measurementDataSource: Collection<Document>;
    constructor(measurementDataSource: Collection<Document>) {
        this.measurementDataSource = measurementDataSource;
    }

    async receiveMeasurement(measurement: MeasurementRequestModelToRepo) {
        try {
            const obj = {
                ...measurement,
                _deviceId: new ObjectId(measurement._deviceId),
            };
            const result = await this.measurementDataSource.insertOne(obj);
            return result;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to insert in the DB. \nError: ${error}`
            );
        }
    }

    private queryResultToParsedMeasurement(queryResult: any) {
        return {
            id: queryResult._id,
            deviceId: queryResult._deviceId,
            value: queryResult.value,
            unity: queryResult.unity,
            measureType: queryResult.measureType,
            verboseValue: queryResult.verboseValue,
            measureDate: queryResult.measureDate,
        };
    }

    async getOneMeasurementById(
        id: string
    ): Promise<MeasurementResponseModel | null> {
        try {
            const result = await this.measurementDataSource.findOne({
                _id: new ObjectId(id),
            });
            const parsedMeasurement =
                this.queryResultToParsedMeasurement(result);
            return parsedMeasurement;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetOne in the DB. \nError: ${error}`
            );
        }
    }

    async getManyMeasurementsByDeviceId(
        deviceId: string
    ): Promise<MeasurementResponseModel[]> {
        try {
            const results = await this.measurementDataSource
                .find({
                    _deviceId: new ObjectId(deviceId),
                })
                .toArray();
            const parsedMeasurements = results.map((measurement) => {
                return this.queryResultToParsedMeasurement(measurement);
            });
            return parsedMeasurements;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetMeasByDateRangeByDeviceId in the DB. \nError: ${error}`
            );
        }
    }

    async deleteOneMeasurementById(id: string) {
        try {
            await this.measurementDataSource.deleteOne({
                _id: new ObjectId(id),
            });

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    async deleteAllMeasurementsByDeviceId(deviceId: string) {
        try {
            await this.measurementDataSource.deleteMany({
                _deviceId: new ObjectId(deviceId),
            });

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteMany in the DB. \nError: ${error}`
            );
        }
    }
}
