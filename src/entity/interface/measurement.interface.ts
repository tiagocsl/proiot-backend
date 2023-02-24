import { UnitySimbols } from 'entity/type/measurement.types';

export interface MeasurementData {
    value: number;
    unity: UnitySimbols;
    deviceId: string;
    measureType: string;
}
