import { IRouter, Router } from 'express';
import { MeasurementUsecase } from '../../../core/usecases/measurement.usecase';
import { DeviceUsecase } from '../../../core/usecases/device.usecase';
import configureDeviceRouter from './device.router';

const configureRouter = (
    deviceUsecase: DeviceUsecase,
    measurementUsecase: MeasurementUsecase
): IRouter => {
    const router: IRouter = Router();

    router.use(
        '/devices',
        configureDeviceRouter(deviceUsecase, measurementUsecase)
    );

    return router;
};

export default configureRouter;
