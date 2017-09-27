import * as Hapi from 'hapi';

import { ServerMethods } from './server.methods';

let server: Hapi.Server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    }
  }
});

let serverMethods: ServerMethods = new ServerMethods(server);
serverMethods.registerPlugins()
.then(() => serverMethods.registerRoutes())
.then(() => {
  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
  });
});
