import { DeviceInformation } from './interface/device.interface';

export default class Device {
    _id?: string;
    private _deviceProps: Required<DeviceInformation>;
    private _createdDate: Date;
    private _updatedDate: Date;

    constructor(deviceProps: DeviceInformation) {
        this._deviceProps.name = deviceProps.name;
        const description = deviceProps.description;
        this._deviceProps.description = description ? description : null;
        const date = new Date();
        this._createdDate = date;
        this._updatedDate = date;
    }

    public get name(): string {
        return this._deviceProps.name;
    }

    public get description(): string | null {
        return this._deviceProps.description;
    }

    public changeName(name: string) {
        this._deviceProps.name = name;
        this.setUpdatedDate();
    }

    public changeDescription(value: string | null | undefined) {
        this._deviceProps.description = value ? value : null;
        this.setUpdatedDate();
    }

    public get createdDate(): Date {
        return this._createdDate;
    }

    public get updatedDate(): Date {
        return this._updatedDate;
    }

    private setUpdatedDate() {
        this._updatedDate = new Date();
    }

    public toJSON() {
        return {
            id: this._id,
            ...this._deviceProps,
            createdDate: this._createdDate,
            updatedDate: this._updatedDate,
        };
    }
}
