import * as Hapi from 'hapi';

import { signInController } from './sign_in.controller';
import { signInValidator } from './sign_in.validator';

export let signInRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/signin',
    handler: signInController.signIn,
    config: {
      auth: false,
      validate: signInValidator
    }
  }
];
