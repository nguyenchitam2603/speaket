import * as Hapi from 'hapi';

import { ServerMethods } from './server.methods';

let server: Hapi.Server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000 });
let serverMethods: ServerMethods = new ServerMethods(server);

serverMethods.registerPlugins();
serverMethods.registerRoutes();

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: ${server.info.uri}');
});
