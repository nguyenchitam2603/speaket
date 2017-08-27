import * as Hapi from 'hapi';

import { signUpController } from './signup.controller';
import { signUpValidator } from './signup.validator';

export let signUpRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/api/signup',
    handler: signUpController.signUp,
    config: {
      validate: signUpValidator
    }
  }
];

