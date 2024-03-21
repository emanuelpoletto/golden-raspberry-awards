const createTable = async (db) => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      title TEXT NOT NULL,
      studios TEXT NOT NULL,
      producers TEXT NOT NULL,
      winner BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
};

export default createTable;
