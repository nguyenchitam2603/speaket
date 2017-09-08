import * as Boom from 'boom';
import * as Hapi from 'hapi';

import { userService } from '../../../share';

class SignInController {
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
}

export let signInController: SignInController = new SignInController();
