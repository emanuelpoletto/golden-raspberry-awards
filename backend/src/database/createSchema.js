const createSchema = async (db) => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      title TEXT,
      winner BOOLEAN DEFAULT FALSE,
      CONSTRAINT year_title UNIQUE (year, title)
    )
  `);
  await db.run(`CREATE TABLE IF NOT EXISTS studios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studio TEXT UNIQUE
    )
  `);
  await db.run(`CREATE TABLE IF NOT EXISTS producers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producer TEXT UNIQUE
    )
  `);
  await db.run(`CREATE TABLE IF NOT EXISTS movies_studios (
      movie_id INTEGER,
      studio_id INTEGER,
      FOREIGN KEY (movie_id) REFERENCES movies(id),
      FOREIGN KEY (studio_id) REFERENCES studios(id)
    )
  `);
  await db.run(`CREATE TABLE IF NOT EXISTS movies_producers (
      movie_id INTEGER,
      producer_id INTEGER,
      FOREIGN KEY (movie_id) REFERENCES movies(id),
      FOREIGN KEY (producer_id) REFERENCES producers(id)
    )
  `);
};

export default createSchema;
