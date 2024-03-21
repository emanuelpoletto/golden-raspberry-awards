import DB from './db.js';
import createTable from './createTable.js';

const initDb = async (createSchema = false) => {
  const verbose = process.env.NODE_ENV === 'test';
  const db = await DB.getInstance(verbose);
  if (createSchema) {
    await createTable(db);
  }
  return db;
};

export default initDb;
