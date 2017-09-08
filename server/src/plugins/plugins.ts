import * as Hapi from 'hapi';
import * as path from 'path';

import { authCookiePlugin } from './auth-cookie.plugin';
import { goodPlugin } from './good.plugin';
import { inertPlugin } from './inert.plugin';
import { IPlugin } from './i-plugin';

let plugins: IPlugin[] = [
  authCookiePlugin,
  goodPlugin,
  inertPlugin
];

export function registerPlugins() {
  let server: Hapi.Server = this;

  plugins.forEach((plugin) => {
    server.register({
      register: plugin.require,
      options: plugin.options
    }, (err) => {
      if (err) {
        throw err;
      }

      if (plugin.callback) {
        plugin.callback.call(server);
      }
    });
  });
}
