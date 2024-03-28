import initDb from '../../database/initDb.js';

const getIntervals = (winners) => {
  const intervals = {
    min: [],
    max: [],
  };
  const records = {};

  for (const { year, producer } of winners) {
    if (!records[producer]) {
      records[producer] = {
        producer,
        interval: 0,
        previousWin: year,
        followingWin: 0,
      };
      continue;
    }
    const record = { ...records[producer] };
    record.followingWin = year;
    record.interval = record.followingWin - record.previousWin;
    if (intervals.min[0]?.interval === record.interval) {
      intervals.min.push({ ...record });
    }
    if (intervals.max[0]?.interval === record.interval) {
      intervals.max.push({ ...record });
    }
    if (!intervals.min.length || intervals.min[0]?.interval > record.interval) {
      intervals.min = [{ ...record }];
    }
    if (!intervals.max.length || intervals.max[0]?.interval < record.interval) {
      intervals.max = [{ ...record }];
    }
    record.previousWin = year;
    records[producer] = record;
  }
  return intervals;
};

const getAwardsIntervalsRoute = async (req, res) => {
  const db = await initDb();
  const winners = await db.all(`
    SELECT m.year AS year, p.producer AS producer FROM movies m
    JOIN movies_producers mp ON m.id = mp.movie_id
    JOIN producers p ON mp.producer_id = p.id
    WHERE m.winner = 1
      AND p.producer IS NOT NULL
      AND p.producer != ''
    ORDER BY p.producer ASC, m.year ASC
  `);
  const result = getIntervals(winners);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};

export default getAwardsIntervalsRoute;
