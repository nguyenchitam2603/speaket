import * as React from 'react';
import * as classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from '../app.routes';
import { SignInPayload } from '../../models';
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
    loading: boolean;

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
      loading: false,

      email: '',
      password: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
    this.socialSignInSuccessHandler = this.socialSignInSuccessHandler.bind(this);
    this.socialSignInFailureHandler = this.socialSignInFailureHandler.bind(this);
  }

  componentDidMount() {
    UserService.initSocialAuth()
      .then(() => {
        UserService.validateSignedIn(
          () => this.setState({ error: '', isSignedIn: true, loading: true }),
          () => this.setState({ error: '', isSignedIn: false, loading: true })
        )
      });
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
      () => this.setState({ error: '', isSigningIn: false, isSignedIn: true, loading: true }),
      (error) => this.setState({ error: error, isSigningIn: false, isSignedIn: false, loading: true })
    );
  }

  signInSocialHandler(provider) {
    UserService.signInSocial(provider, this.socialSignInSuccessHandler, this.socialSignInFailureHandler)
  }

  socialSignInSuccessHandler() {
    this.setState({ error: '', isSignedIn: true });
  }

  socialSignInFailureHandler() {
    this.setState({ error: 'Failed to login' });
  }

  render() {
    if (!this.state.loading) {
      return false;
    } else {
      if (this.state.isSignedIn) {
        const { from } = this.props.location.state || { from: { pathname: Routes.baseUrl } }
        return <Redirect to={from} />;
      } else {
        let socialAuths = process.env.SOCIAL_AUTHS.map((socialAuth, index) => {
          let btnClass = "btn-" + socialAuth.provider;
          let spanClass = "fa-" + socialAuth.provider;
          let formattedName = socialAuth.provider.toLowerCase();
          formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

          return (
            <button type='button' className={classNames("btn", "btn-md", "btn-social", `${btnClass}`, styles.social_button)}
              onClick={() => this.signInSocialHandler('facebook')} key={index}>
              <span className={classNames("fa", `${spanClass}`)} />
              Sign in with {formattedName}
            </button>
          )
        });

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
                        {this.state.isSigningIn ? 'Signing in ...' : 'Sign in'}
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
                      {socialAuths}
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
}
