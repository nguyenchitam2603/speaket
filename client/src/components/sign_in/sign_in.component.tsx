import * as React from 'react';
import * as classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from '../app.routes';
import { SignInPayload } from '../../models';
import { SocialSignInComponent } from '../share/socials/social_signin.component';
import { UserService } from '../../services';

import * as styles from './sign_in.style.css';

namespace SignInComponent {
  export interface Props {
  }

  export interface State {
    // Error when signing in
    error: string;

    // UI display
    isSigningIn: boolean;
    isSignedIn: boolean;

    // Payload
    email: string;
    password: string;
  }
}

export class SignInComponent extends React.Component<any, SignInComponent.State> {
  constructor(props) {
    super(props);

    this.state = {
      error: '',

      isSigningIn: false,
      isSignedIn: false,

      email: '',
      password: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
    this.socialSignInSuccessHandler = this.socialSignInSuccessHandler.bind(this);
    this.socialSignInFailureHandler = this.socialSignInFailureHandler.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signInHandler(event) {
    event.preventDefault();
    this.setState({ error: '', isSigningIn: true, isSignedIn: false });

    UserService.signIn(
      new SignInPayload(this.state.email, this.state.password),
      () => this.setState({ error: '', isSigningIn: false, isSignedIn: true }),
      (error) => this.setState({ error: error, isSigningIn: false, isSignedIn: false })
    );
  }

  socialSignInSuccessHandler() {
    this.setState({ error: '', isSignedIn: true });
  }

  socialSignInFailureHandler(error) {
    this.setState({ error: error });
  }

  render() {
    if (this.state.isSignedIn) {
      const { from } = this.props.location.state || { from: { pathname: Routes.baseUrl } }
      return <Redirect to={from} />;
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />
          <div className='login_wrapper'>
            <div className='animate form login_form'>
              <section className='login_content'>
                <form onSubmit={this.signInHandler}>
                  <h1>Sign in</h1>
                  <div className={styles.error}>{this.state.error}</div>
                  <div>
                    <input name='email' type='email' className='form-control' placeholder='Email' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <input name='password' type='password' className='form-control' placeholder='Password' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <button type='submit' className='btn btn-default' disabled={this.state.isSigningIn ? true : false}>
                      {
                        this.state.isSigningIn ? 'Signing in ...' : 'Sign in'
                      }
                    </button>
                  </div>

                  <br />
                  <div>
                    <Link to={Routes.forgotPasswordUrl}> Forgot password?</Link>
                  </div>
                  <div>
                    <p className='change_link'>New to Speaket?
                      <Link to={Routes.signUpUrl} className='to_register'> Create Account</Link>
                    </p>
                  </div>
                  <div className='clearfix' />
                  <div>
                    <h2>Or</h2>
                  </div>

                  <div className='separator'>
                    <SocialSignInComponent
                      provider='facebook'
                      appId={process.env.FACEBOOK_APP_ID}
                      onSignInSuccess={this.socialSignInSuccessHandler}
                      onSignInFailure={this.socialSignInFailureHandler}>
                      <button type='button' className={classNames("btn", "btn-md", "btn-social", "btn-facebook", styles.social_button)}>
                        <span className="fa fa-facebook" />
                        Sign in with Facebook
                      </button>
                    </SocialSignInComponent>

                    <SocialSignInComponent
                      provider='google'
                      appId={process.env.GOOGLE_APP_ID}
                      onSignInSuccess={this.socialSignInSuccessHandler}
                      onSignInFailure={this.socialSignInFailureHandler}>
                      <button type='button' className={classNames("btn", "btn-md", "btn-social", "btn-google", styles.social_button)}>
                        <span className="fa fa-google" />
                        Sign in with Google
                      </button>
                    </SocialSignInComponent>
                  </div>

                  <div className='separator'>
                    <div>
                      <h1><i className='fa fa-paw' /> Speaket</h1>
                      <p>©2017 All Rights Reserved.</p>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      );
    }
  }
}
