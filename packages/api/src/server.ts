import fastify from 'fastify';
import { initializeRoutes } from './router/router';
import { logger } from './utils/logger';
import multipart from '@fastify/multipart';

const server = fastify();
server.register(multipart, {
  limits: {
    fileSize: 1e+6 // 1mb
  }
});
initializeRoutes(server);
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  };
  logger.info('started api', { address });
});