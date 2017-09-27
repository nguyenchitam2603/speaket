import * as Hapi from 'hapi';

import { IPlugin } from './i-plugin';

export const authCookiePlugin: IPlugin = {
  require: require('hapi-auth-cookie'),
  options: {},
  callback: function () {
    let server: Hapi.Server = this;

    // Set our server authentication strategy
    server.auth.strategy('cookie', 'cookie', {
      password: 'speaket-secret-session-security-password', // Cookie secret
      isHttpOnly: false,
      cookie: 'login-cookie',                               // Cookie name
      isSecure: false,                                      // Required for non-https applications
      ttl: 24 * 60 * 60 * 1000                              // Set session to 1 day
    });
  }
};
