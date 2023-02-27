import Measurement from '../domain/entities/measurement.entity';
import {
    MeasurementRequestModel,
    MeasurementResponseModel,
} from '../models/measurement.interface';
import { MeasurementRepository } from '../repositories/measurement.interface';

export class MeasurementUsecase {
    measurementRepository: MeasurementRepository;
    constructor(measurementRepository: MeasurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    async receiveMeasurement(_measurement: MeasurementRequestModel) {
        try {
            const measurement = new Measurement(_measurement).toJSON();
            const newMeasurement =
                await this.measurementRepository.receiveMeasurement(
                    this.parseMeasurementObjectToRepository(measurement)
                );
            return newMeasurement;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    private parseMeasurementObjectToRepository(
        measurementObj: MeasurementResponseModel
    ) {
        return {
            _deviceId: measurementObj.deviceId,
            value: measurementObj.value,
            unity: measurementObj.unity,
            measureType: measurementObj.measureType,
            verboseValue: measurementObj.verboseValue,
            measureDate: measurementObj.measureDate,
        };
    }

    async getOneMeasurementById(
        id: string
    ): Promise<MeasurementResponseModel | null> {
        try {
            const result =
                await this.measurementRepository.getOneMeasurementById(id);
            return result;
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
            const results =
                await this.measurementRepository.getManyMeasurementsByDeviceId(
                    deviceId
                );

            return results;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to GetMeasByDateRangeByDeviceId in the DB. \nError: ${error}`
            );
        }
    }

    async deleteOneMeasurementById(id: string) {
        try {
            await this.measurementRepository.deleteOneMeasurementById(id);

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteOne in the DB. \nError: ${error}`
            );
        }
    }

    async deleteAllMeasurementsByDeviceId(id: string) {
        try {
            await this.measurementRepository.deleteAllMeasurementsByDeviceId(
                id
            );

            return;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to DeleteMany in the DB. \nError: ${error}`
            );
        }
    }
}
