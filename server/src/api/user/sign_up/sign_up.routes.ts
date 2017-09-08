import * as Hapi from 'hapi';

import { signUpController } from './sign_up.controller';
import { signUpValidator } from './sign_up.validator';

export let signUpRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/signup',
    handler: signUpController.signUp,
    config: {
      auth: false,
      validate: signUpValidator
    }
  }
];
