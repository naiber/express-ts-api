/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
// import mongoose from 'mongoose';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/**
 * DB configs
 */

/*const dbuser = "naiber";
const dbpassword = "m1ch3l35";
const host = 'ds211309.mlab.com:11309';
const dbName = 'usereport';
mongoose.connect('mongodb://'+dbuser+":"+dbpassword+"@"+host+'/'+dbName)
    .then((resolve) => process.stdout.write('DB connection ready'))
    .catch((error) => process.stdout.write('DB connection error-> ', error));*/

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;


if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
