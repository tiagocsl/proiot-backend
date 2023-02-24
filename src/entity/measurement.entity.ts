import { MeasumentData } from './interface/measurement.interface';

export default class Measurement {
    _id: string;
    private _measumentData: Required<MeasumentData>;
    private _verboseValue: string;
    private _measureDate: Date;

    constructor(measumentData: MeasumentData, date?: Date) {
        this._measumentData = measumentData;
        this._verboseValue = `${measumentData.value} ${measumentData.unity}`;
        const measureDate = date ? date : new Date();
        this._measureDate = measureDate;
    }

    public get value() {
        return this._measumentData.value;
    }

    public get unity() {
        return this._measumentData.unity;
    }

    public get verboseValue() {
        return this._verboseValue;
    }

    public toJSON() {
        return {
            id: this._id,
            deviceId: this._measumentData.deviceId,
            value: this._measumentData.value,
            unity: this._measumentData.unity,
            measureType: this._measumentData.measureType,
            verboseValue: this._verboseValue,
            measureDate: this._measureDate,
        };
    }
}
