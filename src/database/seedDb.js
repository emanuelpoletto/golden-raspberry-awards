const seedDb = async ({
  db, dataRows, isFirstRowAHeader = true, separator = ';',
}) => {
  let skipRow = isFirstRowAHeader;

  for (const row of dataRows) {
    if (row.trim() === '') {
      continue;
    }
    if (skipRow) {
      skipRow = false;
      continue;
    }

    const [
      year,
      title,
      studios,
      producers,
      winner,
    ] = row.split(separator).map((col) => col.trim());

    const extractItems = (items) => items
      .replace(' and ', ',')
      .replace(', and ', ',')
      .replace(',and ', ',')
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    const studiosList = extractItems(studios);
    const producersList = extractItems(producers);

    try {
      await db.run('BEGIN TRANSACTION');

      const { lastID: movieId } = await db.run(
        'INSERT INTO movies (year, title, winner) VALUES (?, ?, ?)',
        [parseInt(year, 10), title, Boolean(winner)],
      );

      for (const studio of studiosList) {
        let studioId = (await db.get(
          'SELECT id FROM studios WHERE studio = ?',
          [studio],
        ))?.id;
        if (!studioId) {
          studioId = (await db.run(
            'INSERT INTO studios (studio) VALUES (?)',
            [studio],
          ))?.lastID;
        }
        await db.run(
          'INSERT INTO movies_studios (movie_id, studio_id) VALUES (?, ?)',
          [movieId, studioId],
        );
      }

      for (const producer of producersList) {
        let producerId = (await db.get(
          'SELECT id FROM producers WHERE producer = ?',
          [producer],
        ))?.id;
        if (!producerId) {
          producerId = (await db.run(
            'INSERT INTO producers (producer) VALUES (?)',
            [producer],
          ))?.lastID;
        }
        await db.run(
          'INSERT INTO movies_producers (movie_id, producer_id) VALUES (?, ?)',
          [movieId, producerId],
        );
      }

      await db.run('COMMIT');
    } catch (error) {
      console.error('Error seeding database:', error);
      await db.run('ROLLBACK');
    }
  }
};

export default seedDb;
