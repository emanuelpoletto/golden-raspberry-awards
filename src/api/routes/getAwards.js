import initDb from '../../database/initDb.js';
import extractQueryParams from '../../util/extractQueryParams.js';

const DEFAULT_LIMIT = 10;

const getAwardsRoute = async (req, res) => {
  req.query = extractQueryParams(req);

  const db = await initDb();
  const result = await db.all(
    'SELECT year, title, studios, producers, winner FROM movies LIMIT ?',
    req.query?.limit || DEFAULT_LIMIT,
  );

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};

export default getAwardsRoute;
