/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRouter, Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

import { DeviceProps } from '../../../core/domain/interfaces/device.interface';
import { DeviceUsecase } from '../../../core/usecases/device.usecase';

import { MeasurementData } from '../../../core/domain/interfaces/measurement.interface';
import { MeasurementUsecase } from '../../../core/usecases/measurement.usecase';

const registerDevice =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            await usecase.registerDevice(req.body as DeviceProps);
            res.status(HttpStatusCodes.CREATED).json();
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getOneDeviceById =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await usecase.getOneDeviceById(id);
            res.status(HttpStatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getAllDevices =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            const results = await usecase.getAllDevices();
            res.status(HttpStatusCodes.OK).json(results);
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const updateOneDeviceById =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            await usecase.updateOneDeviceById(id, data);

            res.status(HttpStatusCodes.OK).json();
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const deleteOneDeviceById =
    (usecase: DeviceUsecase) => async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await usecase.deleteOneDeviceById(id);
            res.status(HttpStatusCodes.OK).json();
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const receiveMeasurement =
    (usecase: MeasurementUsecase) => async (req: Request, res: Response) => {
        try {
            const { deviceid } = req.params;
            const measurement = await usecase.receiveMeasurement({
                ...req.body,
                deviceId: deviceid,
            });

            res.status(HttpStatusCodes.CREATED).json(measurement);
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getOneMeasurementById =
    (usecase: MeasurementUsecase) => async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await usecase.getOneMeasurementById(id);
            res.status(HttpStatusCodes.OK).json(result);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getManyMeasurementsByDeviceId =
    (usecase: MeasurementUsecase) => async (req: Request, res: Response) => {
        try {
            const { deviceid } = req.params;
            const result = await usecase.getManyMeasurementsByDeviceId(
                deviceid
            );
            res.status(HttpStatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const deleteOneMeasurementById =
    (usecase: MeasurementUsecase) => async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await usecase.deleteOneMeasurementById(id);
            res.status(HttpStatusCodes.OK).json(result);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };
const deleteAllMeasurementsByDeviceId =
    (usecase: MeasurementUsecase) => async (req: Request, res: Response) => {
        try {
            const { deviceid } = req.params;
            const result = await usecase.deleteAllMeasurementsByDeviceId(
                deviceid
            );
            res.status(HttpStatusCodes.OK).json(result);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

export default function configureDeviceRouter(
    usecase: DeviceUsecase,
    measusecase: MeasurementUsecase
): IRouter {
    const router: IRouter = Router();

    router.post('', registerDevice(usecase));
    router.get('', getAllDevices(usecase));
    router.get('/:id', getOneDeviceById(usecase));
    router.delete('/:id', deleteOneDeviceById(usecase));
    router.patch('/:id', updateOneDeviceById(usecase));

    router.post('/:deviceid/measurements', receiveMeasurement(measusecase));
    router.get(
        '/:deviceid/measurements/:id',
        getOneMeasurementById(measusecase)
    );
    router.get(
        '/:deviceid/measurements',
        getManyMeasurementsByDeviceId(measusecase)
    );
    router.delete(
        '/:deviceid/measurements/:id',
        deleteOneMeasurementById(measusecase)
    );
    router.delete(
        '/:deviceid/measurements',
        deleteAllMeasurementsByDeviceId(measusecase)
    );

    return router;
}
