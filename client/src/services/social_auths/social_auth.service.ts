import { FacebookAuthService } from './facebook_auth.service';
import { GoogleAuthService } from './google_auth.service';
import { ISocialAuthService } from './i_social_auth.service';

export class SocialAuthService {
  public static getService(provider: string): ISocialAuthService {
    let socialAuthService: ISocialAuthService = null;

    switch (provider) {
      case 'facebook':
        socialAuthService = FacebookAuthService.getInstance();
        break;

      case 'google':
        socialAuthService = GoogleAuthService.getInstance();
        break;

      default:
        throw 'Invalid model type';
    }

    return socialAuthService;
  }
}
