import * as React from 'react';
import * as classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from '../app.routes';
import { RestClientService } from '../../services';
import { SignInPayload } from '../../models';
import SocialLoginComponent from '../share/socials/social_button.component';

import * as styles from './sign_in.style.css';

declare var process;

namespace SignInComponent {
  export interface Props {
  }

  export interface State {
    redirect: boolean,
    signin_error: string,
    email: string,
    password: string
  }
}

export class SignInComponent extends React.Component<SignInComponent.Props, SignInComponent.State> {
  constructor() {
    super();

    this.state = {
      redirect: false,
      signin_error: '',
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNormalLogin = this.handleNormalLogin.bind(this);
    this.handleSocialLoginSuccess = this.handleSocialLoginSuccess.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleNormalLogin(event) {
    event.preventDefault();

    RestClientService.getInstance().post('/signin', new SignInPayload(this.state.email, this.state.password))
      .then(() => {
        this.setState({ signin_error: '', redirect: true })
      })
      .catch(error => {
        this.setState({ signin_error: error.message })
      })
  }

  handleSocialLoginSuccess(user) {
    this.setState({ signin_error: '', redirect: true })
  }

  handleSocialLoginFailure(error) {
    this.setState({ signin_error: error.message })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={Routes.dashboardUrl} />;
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />
          <div className='login_wrapper'>
            <div className='animate form login_form'>
              <section className='login_content'>
                <form onSubmit={this.handleNormalLogin}>
                  <h1>Login</h1>
                  <div className={styles.signin_error}>{this.state.signin_error}</div>
                  <div>
                    <input name='email' type='email' className='form-control' placeholder='Email' required={true} onChange={this.handleInputChange} />
                  </div>
                  <div>
                    <input name='password' type='password' className='form-control' placeholder='Password' required={true} onChange={this.handleInputChange} />
                  </div>
                  <div>
                    <button type='submit' className='btn btn-default'>Log in</button>
                  </div>

                  <br />
                  <div>
                    <a href='#'>Lost your password?</a>
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
                    <SocialLoginComponent
                      provider='facebook'
                      appId={process.env.FACEBOOK_APP_ID}
                      onLoginSuccess={this.handleSocialLoginSuccess}
                      onLoginFailure={this.handleSocialLoginFailure}>
                      <button type='button' className={classNames("btn", "btn-md", "btn-social", "btn-facebook", styles.social_button)}>
                        <span className="fa fa-facebook"/>
                        Log in with Facebook
                      </button>
                    </SocialLoginComponent>

                    <SocialLoginComponent
                      provider='google'
                      appId={process.env.GOOGLE_APP_ID}
                      onLoginSuccess={this.handleSocialLoginSuccess}
                      onLoginFailure={this.handleSocialLoginFailure}>
                      <button type='button' className={classNames("btn", "btn-md", "btn-social", "btn-google", styles.social_button)}>
                        <span className="fa fa-google"/>
                        Log in with Google
                      </button>
                    </SocialLoginComponent>
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
