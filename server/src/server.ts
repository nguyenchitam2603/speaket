import * as Hapi from 'hapi';

import { DbClientFactory, DbClientType } from './database';
import { ServerMethods } from './server.methods';

let server: Hapi.Server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: {
    cors: process.env.enable_cors === 'true'
  }
});

let serverMethods: ServerMethods = new ServerMethods(server);
serverMethods.registerPlugins();
serverMethods.registerRoutes();

server.start((err) => {
  if (err) {
    throw err;
  }

  DbClientFactory.createDbClient(DbClientType.MONGOOSE).connect();
  console.log('Server running at: ${server.info.uri}');
});
