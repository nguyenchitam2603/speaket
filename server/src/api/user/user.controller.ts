import * as Boom from 'boom';
import * as crypto from 'crypto';
import * as Hapi from 'hapi';

import { Error } from '../../database';
import { User } from '../../share/models';
import { userService, mailService } from '../../share';

class UserController {
  private readonly TOKEN_EXPIRATION_TIME = 3 * 24 * 60 * 60 * 1000; // Token will be expired after 3 days

  public signUp(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let user: User = request.payload;

    userService.addUser(user)
      .then((error: Error) => {
        if (error === Error.None) {
          (<any>request).cookieAuth.set({ email: user.email });
          reply(JSON.stringify('Login successfully'));
        } else if (error === Error.DuplicateData) {
          reply(Boom.unauthorized('Duplicate email address'));
        } else if (error === Error.InvalidData) {
          reply(Boom.unauthorized('Invalid email address'));
        }
      })
      .catch((error) => {
        reply(Boom.badImplementation());
      });
  }

  public signIn(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let email = request.payload.email;
    let password = request.payload.password;

    userService.validateUser(email, password)
      .then((isSuccessful: boolean) => {
        if (isSuccessful) {
          (<any>request).cookieAuth.set({ email: email });
          reply(JSON.stringify('Login successfully'));
        } else {
          reply(Boom.unauthorized('Invalid email or password'));
        }
      })
      .catch((error) => {
        reply(Boom.badImplementation());
      });
  }

  public signOut(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    (<any>request).cookieAuth.clear();
    reply(JSON.stringify('Logout successfully'));
  }

  public getSignInStatus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    reply(request.auth.isAuthenticated);
  }

  public forgotPassword(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let token: string = crypto.randomBytes(100).toString('hex');
    let tokenExpireTime: number =  Date.now() + this.TOKEN_EXPIRATION_TIME;
    let resetLink: string = request.headers.origin + '/reset-password/' + token;
    let email: string = request.payload.email;

    userService.addPasswordResetToken(email, token, tokenExpireTime)
      .then((error: Error) => {
        if (error === Error.None) {
          return mailService.sendPasswordResetEmail(email, resetLink);
        } else {
          reply(Boom.badData('No account with that email address exists.'));
          return { then: () => { return; } };   // Pseudo then to break the promise chain
        }
      })
      .then(response => {
        console.log('Reset email sent');
        reply(JSON.stringify('Email sent successfully'));
      });
  }

  public resetPassword(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let token: string = request.payload.token;
    let password: string = request.payload.password;

    userService.resetPassword(token, password)
      .then((error: Error) => {
        if (error === Error.None) {
          reply(JSON.stringify('Password changed successfully'));
        } else if (error === Error.InvalidData) {
          reply(Boom.badData('Invalid link'));
        }
      });
  }

  public getTokenStatus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let token: string = request.payload.token;

    userService.isTokenExpired(token)
      .then((error) => {
        reply(error === Error.None);
      });
  }
}

export let userController: UserController = new UserController();
