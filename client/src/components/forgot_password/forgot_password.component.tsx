import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';

import * as Routes from './../app.routes';
import { ForgotPasswordPayload } from './../../models';
import { RestClientService } from '../../services';

import * as styles from './forgot_password.style.css';

namespace ForgotPasswordComponent {
  export interface Props {
  }

  export interface State {
    // Error when signing in
    error: string;

    // UI display
    isEmailSending: boolean;
    isEmailSent: boolean;
    navigateToSignIn: boolean;

    // Payload
    email: string;
  }
}

export class ForgotPasswordComponent extends React.Component<any, ForgotPasswordComponent.State> {
  constructor(props) {
    super(props);

    let error: string = '';
    if (this.props.location.state) {
      if (!this.props.location.state.isValidToken) {
        error = 'It looks like you clicked on an expired ' +
          'password reset link. Please try again';
      }
    }

    this.state = {
      isEmailSending: false,
      isEmailSent: false,
      navigateToSignIn: false,

      email: '',
      error: error
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.sendEmailHandler = this.sendEmailHandler.bind(this);
    this.navigateToSignInHandler = this.navigateToSignInHandler.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendEmailHandler(event) {
    event.preventDefault();
    this.setState({ error: '', isEmailSending: true, isEmailSent: false });

    RestClientService.getInstance().post(Routes.forgotPasswordApi, new ForgotPasswordPayload(this.state.email))
      .then(() => {
        this.setState({ error: '', isEmailSending: false, isEmailSent: true });
      })
      .catch(error => {
        this.setState({ error: error.message, isEmailSending: false, isEmailSent: false });
      })
  }

  navigateToSignInHandler(event) {
    event.preventDefault();
    this.setState({ navigateToSignIn: true });
  }

  render() {
    if (this.state.navigateToSignIn) {
      return <Redirect to={Routes.signInUrl} />
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />

          <div className='login_wrapper'>
            <div id='register' className='form'>
              <section className='login_content'>
                <form>
                  <h1>Forgot password</h1>
                  {
                    this.state.isEmailSent ?
                      (
                        <div>
                          <div className={styles.instruction}>Check your email for a link to reset your password.
                            If it doesn't appear within a few minutes, check your spam folder.
                          </div>
                          <div>
                            <button autoFocus={true} type="submit" className="btn btn-default" onClick={this.navigateToSignInHandler}>Return to sign in</button>
                          </div>
                        </div>
                      ) :
                      (
                        <div>
                          <div className={styles.error}>{this.state.error}</div>
                          <div className={styles.instruction}>Enter your email address and we will send you a link to reset your password.</div>
                          <div>
                            <input name='email' type='email' className='form-control' placeholder='Enter your email address' required={true} onChange={this.inputChangeHandler} />
                          </div>
                          <div>
                            <button type="submit" className={classNames("btn", "btn-default", styles.send_button)}
                              disabled={this.state.isEmailSending ? true : false} onClick={this.sendEmailHandler}>
                              {
                                this.state.isEmailSending ? 'Sending email ...' : 'Send password reset email'
                              }
                            </button>
                          </div>
                        </div>
                      )
                  }

                  <div className='clearfix' />
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
