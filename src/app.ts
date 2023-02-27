/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import cors from 'cors';
import { Collection, Db, Document } from 'mongodb';
import swaggerUi from 'swagger-ui-express';

import Logger from './utils/logger';
import morganMiddleware from './infra/middlewares/morgan.middleware';
import configureRouter from './infra/controllers/rest/router';
import { makeMongoDatasourceConn } from './infra/database/mongodb.datasource';

import { DeviceRepositoryImpl } from './infra/repositories/device.repository';
import { MeasurementRepositoryImpl } from './infra/repositories/measurement.repository';

import { DeviceUsecase } from './core/usecases/device.usecase';
import { MeasurementUsecase } from './core/usecases/measurement.usecase';

class App {
    public express: Application;
    private _databaseConnection: Db;
    deviceRepository: Collection<Document>;
    deviceUsecase: DeviceUsecase;
    measurementRepository: Collection<Document>;
    measurementUsecase: MeasurementUsecase;

    constructor() {
        this.express = express();
        this.middlewares();
        this.makeDatabaseConnection();
        this.createUsecasesInstances();
        this.routes();
        Logger.info(`Application has been created!`);
    }

    private makeDatabaseConnection(): void {
        const db = makeMongoDatasourceConn('PROIOT-DB');
        this._databaseConnection = db;

        this.createRepositoriesInstances();
    }

    private createRepositoriesInstances(): void {
        this.deviceRepository = this._databaseConnection.collection('devices');
        this.measurementRepository =
            this._databaseConnection.collection('measurements');
    }

    private createUsecasesInstances(): void {
        const deviceRepositoryImpl = new DeviceRepositoryImpl(
            this.deviceRepository
        );
        const measurementRepositoryImpl = new MeasurementRepositoryImpl(
            this.measurementRepository
        );

        this.deviceUsecase = new DeviceUsecase(deviceRepositoryImpl);
        this.measurementUsecase = new MeasurementUsecase(
            measurementRepositoryImpl
        );
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors({ origin: '*' }));
        this.express.use(morganMiddleware);
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            return res.send('hello world');
        });
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const swaggerData = require(__dirname + '/docs/swagger.json');
        this.express.use(
            '/api/v1/docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerData)
        );
        this.express.use(
            '/api/v1',
            configureRouter(this.deviceUsecase, this.measurementUsecase)
        );
    }
}

export default new App();
