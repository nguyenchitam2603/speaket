import * as Hapi from 'hapi';

import { registerPlugins } from './plugins';
import { registerRoutes } from './server.routes';

const serverMethods: IServerMethod[] = [
  {
    name: 'registerPlugins',
    method: registerPlugins
  },
  {
    name: 'registerRoutes',
    method: registerRoutes
  }
];

interface IServerMethod {
  name: string;
  method: Hapi.ServerMethod;
  options?: Hapi.ServerMethodOptions;
}

export class ServerMethods {
  constructor(private server: Hapi.Server) {
    serverMethods.forEach((method) => {
      server.method(method.name, method.method, method.options);
    });
  }

  public registerPlugins(): void {
    this.server.methods.registerPlugins.call(this.server);
  }

  public registerRoutes(): void {
    this.server.methods.registerRoutes.call(this.server);
  }
}
