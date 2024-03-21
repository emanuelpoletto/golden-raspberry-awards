import routes from './routes/index.js';

const router = (req, res) => {
  const path = req.url.split('?')[0];
  const route = routes.get(`${req.method} ${path}`);

  if (!route) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }

  try {
    route(req, res);
  } catch (error) {
    res.statusCode = error.statusCode || 500;
    res.statusMessage = error.statusMessage || 'Internal Server Error';
    res.end({ error: error.message });
  }
};

export default router;
