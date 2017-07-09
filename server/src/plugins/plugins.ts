import * as Hapi from 'hapi';
import * as path from 'path';

import { goodPlugin } from './good.plugin';
import { inertPlugin } from './inert.plugin';
import { IPlugin } from './iPlugin';

let plugins: IPlugin[] = [
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
    });
  });
}
