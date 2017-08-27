import { connect, Dispatch } from 'react-redux';

import { signUpAction } from './../../actions';
import { SignUpComponent } from './../../components/authentication/signup.component';
import { SignUpInfo } from './../../models';


function mapDispatchToProps(dispatch: Dispatch<{}>) {
  return {
    onSignUp: (signUpInfo: SignUpInfo) => {
      dispatch(signUpAction(signUpInfo));
    }
  }
}

export let SignUpContainer = connect(null, mapDispatchToProps)(SignUpComponent as any);
