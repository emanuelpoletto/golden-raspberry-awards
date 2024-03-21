import initDb from './database/initDb.js';
import seedDb from './database/seedDb.js';
import getFilePath from './fileSystem/getFilePath.js';
import readFile from './fileSystem/readFile.js';

const filePath = getFilePath();
const dataRows = await readFile(filePath);

const db = await initDb('createSchema');
await seedDb({ db, dataRows });
