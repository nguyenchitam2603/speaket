import * as Boom from 'boom';
import * as Hapi from 'hapi';

import { Error } from '../../../database';
import { User } from '../../../share/models';
import { userService } from '../../../share';

class SignUpController {
  public signUp(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    let user: User = request.payload;

    userService.addUser(user)
      .then((error: Error) => {
        if (error === Error.None) {
          (<any>request).cookieAuth.set({});
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
}

export let signUpController: SignUpController = new SignUpController();
