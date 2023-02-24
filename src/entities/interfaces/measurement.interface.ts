import { UnitySimbols } from 'entities/types/measurement.types';

export interface MeasurementData {
    value: number;
    unity: UnitySimbols;
    deviceId: string;
    measureType: string;
}
