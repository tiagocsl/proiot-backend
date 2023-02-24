export interface DeviceRequestModel {
    name: string;
    description?: string;
}

export interface DeviceResponseModel {
    id: string;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
}
