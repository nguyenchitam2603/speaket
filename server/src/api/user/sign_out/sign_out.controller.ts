import * as Boom from 'boom';
import * as Hapi from 'hapi';

class SignOutController {
  public signOut(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    (<any>request).cookieAuth.clear();
    reply.redirect('/login');
  }
}

export let signOutController: SignOutController = new SignOutController();
