import { RestClientService } from './../../services';
import { SignUpInfo } from './../../models';

export const signUpAction = (signupInfo: SignUpInfo) => (dispatch) => {
  return RestClientService.getInstance().post('/api/signup', signupInfo);
}
