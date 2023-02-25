// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import app from './app';
import Logger from './utils/logger';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    Logger.info(`Server's running on port: ${port}`);
});
