import { IRouter, Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

import { DeviceProps } from '../entities/interfaces/device.interface';
import { DeviceUsecase } from '../usecases/device.usecase';

const createDevice =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            await usecase.createDevice(req.body as DeviceProps);
            res.status(HttpStatusCodes.CREATED).json();
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

export default function configureDeviceRouter(usecase: DeviceUsecase): IRouter {
    const router: IRouter = Router();

    router.post('', createDevice(usecase));

    return router;
}
