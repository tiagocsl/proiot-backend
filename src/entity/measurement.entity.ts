import { MeasurementData } from './interface/measurement.interface';

export default class Measurement {
    _id: string;
    private _measurementData: Required<MeasurementData>;
    private _verboseValue: string;
    private _measureDate: Date;

    constructor(measurementData: MeasurementData, date?: Date) {
        this._measurementData = measurementData;
        this._verboseValue = `${measurementData.value} ${measurementData.unity}`;
        const measureDate = date ? date : new Date();
        this._measureDate = measureDate;
    }

    public get value() {
        return this._measurementData.value;
    }

    public get unity() {
        return this._measurementData.unity;
    }

    public get verboseValue() {
        return this._verboseValue;
    }

    public toJSON() {
        return {
            id: this._id,
            deviceId: this._measurementData.deviceId,
            value: this._measurementData.value,
            unity: this._measurementData.unity,
            measureType: this._measurementData.measureType,
            verboseValue: this._verboseValue,
            measureDate: this._measureDate,
        };
    }
}
