import DB from './db.js';
import createSchema from './createSchema.js';

const initDb = async (options = { runCreateSchema: false }) => {
  const { runCreateSchema } = options;
  const verbose = process.env.LOG_LEVEL?.toLowerCase() === 'debug';
  const db = await DB.getInstance(verbose);
  if (runCreateSchema) {
    await createSchema(db);
  }
  return db;
};

export default initDb;
