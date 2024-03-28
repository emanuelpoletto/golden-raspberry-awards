import getAwardsRoute from './getAwards.js';
import getAwardsIntervalsRoute from './getAwardsIntervals.js';

const routes = new Map();

routes.set('GET /', (req, res) => res.end('Golden Raspberry Awards'));
routes.set('GET /awards', getAwardsRoute);
routes.set('GET /awards/intervals', getAwardsIntervalsRoute);

export default routes;
