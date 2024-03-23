import initDb from '../../database/initDb.js';

const getIntervals = (winners) => {
  const intervals = {};

  for (const { year, producer } of winners) {
    if (!intervals[producer]) {
      intervals[producer] = {
        minInterval: Infinity,
        maxInterval: -Infinity,
        prevYear: year,
      };
    } else {
      const interval = year - intervals[producer].prevYear;
      if (interval < intervals[producer].minInterval) {
        intervals[producer].minInterval = interval;
        intervals[producer].minPrevious = intervals[producer].prevYear;
        intervals[producer].minFollowing = year;
      }
      if (interval > intervals[producer].maxInterval) {
        intervals[producer].maxInterval = interval;
        intervals[producer].maxPrevious = intervals[producer].prevYear;
        intervals[producer].maxFollowing = year;
      }
      intervals[producer].prevYear = year;
    }
  }

  let minIntervals = [];
  let maxIntervals = [];

  Object.entries(intervals).forEach(([producer, {
    minInterval,
    maxInterval,
    minPrevious,
    minFollowing,
    maxPrevious,
    maxFollowing,
  }]) => {
    const minRecord = {
      producer,
      interval: minInterval,
      previousWin: minPrevious,
      followingWin: minFollowing,
    };

    if (minInterval !== Infinity) {
      if (!minIntervals.length || minIntervals[0].interval > minInterval) {
        minIntervals = [minRecord];
      } else if (minIntervals[0].interval === minInterval) {
        minIntervals.push(minRecord);
      }
    }

    const maxRecord = {
      producer,
      interval: maxInterval,
      previousWin: maxPrevious,
      followingWin: maxFollowing,
    };

    if (maxInterval !== -Infinity) {
      if (!maxIntervals.length || maxIntervals[0].interval < maxInterval) {
        maxIntervals = [maxRecord];
      } else if (maxIntervals[0].interval === maxInterval) {
        maxIntervals.push(maxRecord);
      }
    }
  });

  return { min: minIntervals, max: maxIntervals };
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
