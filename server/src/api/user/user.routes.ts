import * as Hapi from 'hapi';

import { IApiConfiguration } from '../i-api-configuration';
import {
  signInValidator, signUpValidator, signOutValidator, forgotPasswordValidator,
  resetPasswordValidator, getTokenStatusValidator
} from './user.validator';
import { userController } from './user.controller';

export const userApiConfiguration: IApiConfiguration = {
  controller: userController,
  routes: [
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
    },
    {
      method: 'POST',
      path: '/forgot-password',
      handler: userController.forgotPassword,
      config: {
        auth: false,
        validate: forgotPasswordValidator
      }
    },
    {
      method: 'POST',
      path: '/reset-password',
      handler: userController.resetPassword,
      config: {
        auth: false,
        validate: resetPasswordValidator
      }
    },
    {
      method: 'POST',
      path: '/token-status',
      handler: userController.getTokenStatus,
      config: {
        auth: false,
        validate: getTokenStatusValidator
      }
    }
  ]
}
