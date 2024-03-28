import http from 'node:http';

const PORT = process.env.PORT || 3000;

const startServer = async (router, port = PORT) => {
  const server = http.createServer(router);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

export default startServer;
