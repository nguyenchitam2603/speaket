import { IPlugin } from './i-plugin';

export const goodPlugin: IPlugin = {
  require: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  },
  callback: null
};
