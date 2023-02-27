import { MeasurementData } from '../../domain/interfaces/measurement.interface';
import { UnitySimbols } from './types/measurement.types';

export default class Measurement {
    _id: string;
    private _value: number;
    private _unity: UnitySimbols;
    private _deviceId: string;
    private _measureType: string;
    private _verboseValue: string;
    private _measureDate: Date;

    constructor(measurementData: MeasurementData, date?: Date) {
        this._value = measurementData.value;
        this._unity = measurementData.unity;
        this._deviceId = measurementData.deviceId;
        this._measureType = measurementData.measureType;
        this._verboseValue = `${measurementData.value} ${measurementData.unity}`;
        const measureDate = date ? date : new Date();
        this._measureDate = measureDate;
    }

    public get value() {
        return this._value;
    }

    public get unity() {
        return this._unity;
    }

    public get deviceId() {
        return this._deviceId;
    }

    public get measureType() {
        return this._measureType;
    }

    public get verboseValue() {
        return this._verboseValue;
    }

    public toJSON() {
        return {
            id: this._id,
            deviceId: this._deviceId,
            value: this._value,
            unity: this._unity,
            measureType: this._measureType,
            verboseValue: this._verboseValue,
            measureDate: this._measureDate,
        };
    }
}
