import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from './../app.routes';
import { ResetPasswordPayload, PasswordResetTokenPayload } from './../../models';
import { RestClientService } from '../../services';

import * as styles from './reset_password.style.css';

namespace ResetPasswordComponent {
  export interface Props {
  }

  export interface State {
    // Error when resetting password
    error: string;

    // UI display
    isResetting: boolean;
    isReset: boolean;
    isTokenValidating: boolean;
    tokenValidateStatus: boolean;

    // Payload
    newPassword: string;
    confirmPassword: string;
  }
}

export class ResetPasswordComponent extends React.Component<any, ResetPasswordComponent.State> {
  constructor() {
    super();

    this.state = {
      error: '',

      isResetting: false,
      isReset: false,
      isTokenValidating: false,
      tokenValidateStatus: false,

      newPassword: '',
      confirmPassword: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    RestClientService.getInstance().post(Routes.tokenStatusApi, new PasswordResetTokenPayload(this.props.match.params.token))
      .then((tokenValidateStatus) => {
        this.setState({ tokenValidateStatus: tokenValidateStatus, isTokenValidating: true })
      });
  }

  inputChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({ error: '', isResetting: true, isReset: false });

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ error: 'New password and confirm password are mismatched' });
    } else {
      RestClientService.getInstance().post(Routes.resetPasswordApi, new ResetPasswordPayload(this.props.match.params.token, this.state.newPassword))
        .then(() => {
          this.setState({ error: '', isResetting: false, isReset: true })
        })
        .catch(error => {
          this.setState({ error: error.message, isResetting: false, isReset: false })
        })
    }
  }

  render() {
    if (!this.state.isTokenValidating) {
      return false;
    } else if (!this.state.tokenValidateStatus) {
      return <Redirect to={{ pathname: Routes.forgotPasswordUrl, state: { isValidToken: false } }} />
    } else if (this.state.isReset) {
      return <Redirect to={Routes.signInUrl} />
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />

          <div className='login_wrapper'>
            <div id='register' className='form'>
              <section className='login_content'>
                <form onSubmit={this.submitHandler}>
                  <h1>Reset password</h1>
                  <div className={styles.error}>{this.state.error}</div>
                  <div className={styles.instruction}>Enter your email address and we will send you a link to reset your password.</div>
                  <div>
                    <input name='newPassword' type='password' className='form-control' placeholder='New password' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <input name='confirmPassword' type='password' className='form-control' placeholder='Confirm password' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-default" disabled={this.state.isResetting ? true : false}>
                      {
                        this.state.isResetting ? 'Updating password ...' : 'Update password'
                      }
                    </button>
                  </div>

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
