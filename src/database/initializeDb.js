import DB from './db.js';
import createTable from './createTable.js';

const initializeDatabase = async () => {
  const verbose = process.env.NODE_ENV === 'test';
  const db = await DB.getInstance(verbose);
  await createTable(db);
  return db;
};

export default initializeDatabase;
