import initDb from '../../database/initDb.js';
import extractQueryParams from '../../util/extractQueryParams.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const getAwardsRoute = async (req, res) => {
  req.query = extractQueryParams(req);

  const db = await initDb();
  const result = await db.all(
    `SELECT m.year AS year,
      m.title AS title,
      GROUP_CONCAT(DISTINCT s.studio) AS studios,
      GROUP_CONCAT(DISTINCT p.producer) AS producers
      FROM movies m
    LEFT JOIN movies_studios ms ON m.id = ms.movie_id
    LEFT JOIN studios s ON ms.studio_id = s.id
    LEFT JOIN movies_producers mp ON m.id = mp.movie_id
    LEFT JOIN producers p ON mp.producer_id = p.id
    WHERE winner = 1
    GROUP BY m.id
    ORDER BY m.year ASC, m.title ASC
    LIMIT ?, ?`,
    [
      Number(req.query?.offset) || 0,
      Number(req.query?.limit) || DEFAULT_LIMIT,
    ],
  );

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};

export default getAwardsRoute;
