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

  public registerPlugins(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.methods.registerPlugins.call(this.server);
      resolve();
    });
  }

  public registerRoutes(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.methods.registerRoutes.call(this.server);
      resolve();
    });
  }
}
