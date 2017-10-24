import { ISocialAuthService } from './i_social_auth.service';

export class FacebookAuthService implements ISocialAuthService {
  private static instance;
  private constructor() { }

  public static getInstance(): FacebookAuthService {
    if (!FacebookAuthService.instance) {
      FacebookAuthService.instance = new FacebookAuthService();
    }

    return FacebookAuthService.instance;
  }

  public load(appId: string): Promise<void> {
    return new Promise<void>(resolve => {
      var wd = window as any;

      wd.fbAsyncInit = () => {
        wd.FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v2.10'
        });
        wd.FB.AppEvents.logPageView();
        return resolve();
      };

      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        const js: any = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  }

  public isSignedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let wd = window as any;

      wd.FB.getLoginStatus(response => {
        resolve(response && response.status === 'connected');
      });
    });
  }

  public signIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var wd = window as any;

      wd.FB.getLoginStatus(response => {
        if (response && response.status !== 'connected') {
          wd.FB.login(response => {
            resolve(response.status === 'connected');
          }, { scope: 'public_profile, email' });
        }
      });
    });
  }

  public signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var wd = window as any;

      wd.FB.getLoginStatus(response => {
        if (response && response.status === 'connected') {
          wd.FB.logout(response => {
            resolve(response.status !== 'connected');
          });
        } else {
          resolve(false);
        }
      });
    });
  }

  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      let wd = window as any;

      wd.FB.api('/me', 'GET', {
        fields: 'email, name, id, first_name, last_name, picture'
      }, response => resolve(response));
    });
  }
}
