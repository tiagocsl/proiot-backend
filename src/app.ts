/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import cors from 'cors';
import { Db } from 'mongodb';

import Logger from './utils/logger';
import morganMiddleware from './middlewares/morgan.middleware';
import configureRouter from './controller/router';
import {
    createCollectionsConn,
    makeMongoDatasourceConn,
} from './data-sources/mongodb/mongodb.datasource';
import { NoSQLDatabaseWrapper } from './data-sources/interfaces/nosql-database-wrapper.interface';
import { DeviceUsecase } from './usecases/device.usecase';
import { DeviceRepositoryImpl } from './repositories/device.repository';

class App {
    public express: Application;
    private _databaseConnection: Db;
    deviceRepository: NoSQLDatabaseWrapper;
    deviceUsecase: DeviceUsecase;

    constructor() {
        this.express = express();

        this.middlewares();
        this.makeDatabaseConnection();
        this.createUsecasesInstances();
        this.routes();
        Logger.info(`Application has been started!`);
    }

    private makeDatabaseConnection(): void {
        const db = makeMongoDatasourceConn('PROIOT-DB');
        this._databaseConnection = db;

        this.createRepositoriesInstances();
    }

    private createRepositoriesInstances(): void {
        const collecConn = createCollectionsConn(
            'devices',
            this._databaseConnection
        );
        this.deviceRepository = collecConn;
    }

    private createUsecasesInstances(): void {
        const deviceRepositoryImpl = new DeviceRepositoryImpl(
            this.deviceRepository
        );
        this.deviceUsecase = new DeviceUsecase(deviceRepositoryImpl);
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morganMiddleware);
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            return res.send('hello world');
        });
        this.express.use('/api', configureRouter(this.deviceUsecase));
    }
}

export default new App().express;
