import * as Boom from 'boom';
import * as Hapi from 'hapi';

import { Error } from '../../database';
import { User } from '../../share/models';
import { userService } from '../../share';

class UserController {
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
}

export let userController: UserController = new UserController();
