import * as Hapi from 'hapi';

import { signOutController } from './sign_out.controller';
import { signOutValidator } from './sign_out.validator';

export let signOutRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/api/signout',
    handler: signOutController.signOut,
    config: {
      auth: {
        strategy: 'cookie',
        scope: ['admin', 'user']
      },
      validate: signOutValidator
    }
  }
];
