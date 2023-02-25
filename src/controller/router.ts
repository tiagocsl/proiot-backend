import { IRouter, Router } from 'express';
import { DeviceUsecase } from '../usecases/device.usecase';
import configureDeviceRouter from './device.router';

const configureRouter = (deviceUsecase: DeviceUsecase): IRouter => {
    const router: IRouter = Router();

    router.use('/devices', configureDeviceRouter(deviceUsecase));

    return router;
};

export default configureRouter;
