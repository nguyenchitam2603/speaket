import * as Hapi from 'hapi';

import { signInValidator, signUpValidator, signOutValidator } from './user.validator';
import { userController } from './user.controller';

export let userRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/signup',
    handler: userController.signUp,
    config: {
      auth: false,
      validate: signUpValidator
    }
  },
  {
    method: 'POST',
    path: '/signin',
    handler: userController.signIn,
    config: {
      auth: false,
      validate: signInValidator
    }
  },
  {
    method: 'GET',
    path: '/signout',
    handler: userController.signOut,
    config: {
      auth: {
        strategy: 'cookie',
        // mode: 'required',
        // scope: ['admin', 'user']
      },
      // auth: false,
    }
  },
  {
    method: 'GET',
    path: '/signin/status',
    handler: userController.getSignInStatus,
    config: {
      auth: {
        strategy: 'cookie',
        mode: 'try'
      }
    }
  }
];
