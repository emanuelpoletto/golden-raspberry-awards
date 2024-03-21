const seedDb = async ({
  db, dataRows, isFirstRowAHeader = true, separator = ';',
}) => {
  const queries = [];
  let skipRow = isFirstRowAHeader;

  dataRows.forEach((row) => {
    if (skipRow && queries.length === 0) {
      skipRow = false;
      return;
    }

    const [year, title, studios, producers, winner] = row.split(separator);
    const promise = new Promise((resolve) => {
      resolve(db.run(
        'INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)',
        year,
        title,
        studios,
        producers,
        winner,
      ));
    });

    queries.push(promise);
  });

  const result = await Promise.allSettled(queries).catch(console.error);
  return result;
};

export default seedDb;
