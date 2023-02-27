import { DeviceProps } from '../../src/core/domain/interfaces/device.interface';

export default class Device {
    _id?: string;
    private _name: string;
    private _description: string | null | undefined;
    private _createdDate: Date;
    private _updatedDate: Date;

    constructor(deviceProps: DeviceProps) {
        this._name = deviceProps.name;
        const description = deviceProps.description;
        this._description = description ? description : null;
        const date = new Date();
        this._createdDate = date;
        this._updatedDate = date;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string | null | undefined {
        return this._description;
    }

    public changeName(name: string) {
        this._name = name;
        this.setUpdatedDate();
    }

    public changeDescription(value: string | null | undefined) {
        this._description = value ? value : null;
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
            name: this._name,
            description: this._description,
            createdDate: this._createdDate,
            updatedDate: this._updatedDate,
        };
    }
}
