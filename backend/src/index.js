import initDb from './database/initDb.js';
import seedDb from './database/seedDb.js';
import getFilePath from './fileSystem/getFilePath.js';
import readFile from './fileSystem/readFile.js';
import router from './api/router.js';
import startServer from './api/server.js';

const filePath = getFilePath();
const dataRows = await readFile(filePath);

const db = await initDb({ runCreateSchema: true });
await seedDb({ db, dataRows });

startServer(router);
