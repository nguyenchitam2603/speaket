import * as Routes from '../components/app.routes';
import { RestClientService } from './restClient.service';
import { SignInPayload } from '../models';
import { SocialAuthService, ISocialAuthService } from './social_auths';

export class UserService {
  public static validateSignedIn(onSignedIn: () => void, onNotSignedIn: () => void): void {
    let promises: Promise<boolean>[] = [];

    for (let auth of process.env.SOCIAL_AUTHS) {
      promises.push(SocialAuthService.getService(auth.provider).isSignedIn());
    }

    Promise.all(promises)
      .then((values: boolean[]) => {
        let isSignedIn = values.reduce((a, b) => { return a || b }, false);

        if (isSignedIn) {
          onSignedIn();
          return bPromise;
        } else {
          return RestClientService.getInstance().get(Routes.signInStatusApi)
        }
      })
      .then((isSignedIn: any) => {
        if (isSignedIn) onSignedIn();
        else onNotSignedIn();
      });
  }

  public static signIn(credientials: SignInPayload, onSuccess: () => void, onFailure: (error) => void): void {
    RestClientService.getInstance().post(Routes.signInApi, credientials)
      .then(() => {
        onSuccess();
      })
      .catch(error => {
        onFailure(error.message);
      })
  }

  public static initSocialAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      let promises: Promise<void>[] = [];

      for (let auth of process.env.SOCIAL_AUTHS) {
        promises.push(SocialAuthService.getService(auth.provider).load(auth.appId));
      }

      Promise.all(promises)
        .then(() => {
          resolve();
        })
    });
  }

  public static signInSocial(provider: string, onSuccess: () => void, onFailure: () => void): void {
    let socialAuthService: ISocialAuthService = SocialAuthService.getService(provider);

    socialAuthService.signOut()
      .then(() => socialAuthService.signIn())
      .then(() => onSuccess())
  }

  public static signOut(onSuccess: () => void, onFailure: (error) => void): void {
    let promises: Promise<boolean>[] = [];

    for (let auth of process.env.SOCIAL_AUTHS) {
      promises.push(SocialAuthService.getService(auth.provider).signOut());
    }

    Promise.all(promises)
      .then((values: boolean[]) => {
        let isSignedOut = (values.reduce((a, b) => { return a || b }, false));

        if (isSignedOut) {
          onSuccess();
          return bPromise;
        }
        else {
          return RestClientService.getInstance().get(Routes.signOutApi);
        }
      })
      .then(result => {
        onSuccess();
      });
  }
}
