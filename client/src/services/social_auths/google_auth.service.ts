import { ISocialAuthService } from './i_social_auth.service';

export class GoogleAuthService implements ISocialAuthService {
  private static instance;
  private constructor() { }

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }

    return GoogleAuthService.instance;
  }

  public load(appId: string): Promise<void> {
    return new Promise<void>(resolve => {
      var wd = window as any;

      ((d, s, id, cb) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        const js: any = d.createElement(s);
        js.id = id;
        js.src = '//apis.google.com/js/client:platform.js';
        js.onload = cb;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'google-login', () => {
        wd.gapi.load('auth2', () => {
          if (!wd.gapi.auth2.getAuthInstance()) {
            wd.gapi.auth2.init({ client_id: appId })
              .then(() => resolve());
          }
        });
      });
    });
  }

  public isSignedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let wd = window as any;
      let auth = wd.gapi.auth2.getAuthInstance();

      resolve(auth.isSignedIn.get());
    });
  }

  public signIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let wd = window as any;
      let auth = wd.gapi.auth2.getAuthInstance();

      if (!auth.isSignedIn.get()) {
        auth.signIn()
        .then(response => resolve(true))
        .catch(err => resolve(false));
      }
    });
  }

  public signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let wd = window as any;
      let auth = wd.gapi.auth2.getAuthInstance();

      if (auth.isSignedIn.get()) {
        auth.signOut()
        .then(response => resolve(true))
        .catch(err => resolve(false));
      } else {
        resolve(false)
      }
    });
  }

  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      let wd = window as any;
      let auth = wd.gapi.auth2.getAuthInstance();

      if (auth.isSignedIn.get()) {
        resolve(auth.currentUser.get().getBasicProfile());
      } else {
        resolve(null);
      }
    });
  }
}
