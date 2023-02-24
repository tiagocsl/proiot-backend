import { UnitySimbols } from 'entity/type/measurement.types';

export interface MeasumentData {
    value: number;
    unity: UnitySimbols;
    deviceId: string;
    measureType: string;
}
