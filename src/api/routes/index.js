import getAwardsRoute from './getAwards.js';

const routes = new Map();

routes.set('GET /', (req, res) => res.end('Golden Raspberry Awards'));
routes.set('GET /awards', getAwardsRoute);

export default routes;
