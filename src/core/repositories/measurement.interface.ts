/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MeasurementRequestModelToRepo,
    MeasurementResponseModel,
} from '../models/measurement.interface';

export interface MeasurementRepository {
    receiveMeasurement(
        measurement: MeasurementRequestModelToRepo
    ): Promise<any>;
    getOneMeasurementById(id: string): Promise<MeasurementResponseModel | null>;
    getManyMeasurementsByDeviceId(
        deviceId: string
    ): Promise<MeasurementResponseModel[]>;
    deleteOneMeasurementById(id: string): void;
    deleteAllMeasurementsByDeviceId(deviceId: string): void;
}
