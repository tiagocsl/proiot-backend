import { UnitySimbols } from '../domain/entities/types/measurement.types';

export interface MeasurementRequestModel {
    value: number;
    unity: UnitySimbols;
    deviceId: string;
    measureType: string;
}

export interface MeasurementRequestModelToRepo {
    _deviceId: string;
    value: number;
    unity: UnitySimbols;
    measureType: string;
    verboseValue: string;
    measureDate: Date;
}

export interface MeasurementResponseModel {
    id: string;
    value: number;
    unity: UnitySimbols;
    deviceId: string;
    measureType: string;
    verboseValue: string;
    measureDate: Date;
}
