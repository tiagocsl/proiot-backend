// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import app from './app';
import Logger from '../src/utils/logger';

const port = process.env.PORT || 3000;

app.express.listen(port, () => {
    Logger.info(`Server's running on port: ${port}`);
});
