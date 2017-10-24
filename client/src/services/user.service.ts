import * as Routes from '../components/app.routes';
import { RestClientService } from './restClient.service';
import { SignInPayload } from '../models';
import { SocialAuthService, ISocialAuthService } from './social_auths';

export class UserService {
  public static validateSignedIn(onSignedIn: () => void, onNotSignedIn: () => void): void {
    Promise.all([
      SocialAuthService.getService('facebook').isSignedIn(),
      SocialAuthService.getService('google').isSignedIn()
    ])
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
      })
      .catch(error => onNotSignedIn());
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

  public static initSocial(provider: string, appId: string): Promise<void> {
    let socialAuthService: ISocialAuthService = SocialAuthService.getService(provider);
    return socialAuthService.load(appId);
  }

  public static signInSocial(provider: string, onSuccess: () => void, onFailure: () => void): void {
    let socialAuthService: ISocialAuthService = SocialAuthService.getService(provider);

    socialAuthService.signIn()
      .then(() => onSuccess());
  }

  public static signOut(onSuccess: () => void, onFailure: (error) => void): void {
    Promise.all([
      SocialAuthService.getService('facebook').signOut(),
      SocialAuthService.getService('google').signOut()
    ])
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
