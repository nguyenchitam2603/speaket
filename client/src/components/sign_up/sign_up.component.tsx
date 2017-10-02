import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from './../app.routes';
import { RestClientService } from '../../services';
import { SignUpPayload } from './../../models';

import * as styles from './sign_up.style.css';

namespace SignUpComponent {
  export interface Props {
  }

  export interface State {
    // Error when signing up
    error: string;

    // UI display
    isSigningUp: boolean;
    isSignedUp: boolean;

    // Payload
    email: string;
    password: string;
  }
}

export class SignUpComponent extends React.Component<any, SignUpComponent.State> {
  constructor() {
    super();

    this.state = {
      error: '',

      isSigningUp: false,
      isSignedUp: false,

      email: '',
      password: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({ error: '', isSigningUp: true, isSignedUp: false });

    RestClientService.getInstance().post(Routes.signUpApi, new SignUpPayload(this.state.email, this.state.password))
      .then(() => {
        this.setState({ error: '', isSigningUp: false, isSignedUp: true });
      })
      .catch(error => {
        this.setState({ error: error.message, isSigningUp: false, isSignedUp: false });
      })
  }

  render() {
    if (this.state.isSignedUp) {
      return <Redirect to={Routes.baseUrl} />;
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />

          <div className='login_wrapper'>
            <div id='register' className='form'>
              <section className='login_content'>
                <form onSubmit={this.submitHandler}>
                  <h1>Create Account</h1>
                  <div className={styles.error}>{this.state.error}</div>
                  <div>
                    <input name='email' type='email' className='form-control' placeholder='Email' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <input name='password' type='password' className='form-control' placeholder='Password' required={true} onChange={this.inputChangeHandler} />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-default" disabled={this.state.isSigningUp ? true : false}>
                      {
                        this.state.isSigningUp ? 'Signing up ...' : 'Sign up'
                      }
                    </button>
                  </div>

                  <div className='clearfix' />

                  <div className='separator'>
                    <p className='change_link'>Already a member ?
                      <Link to={Routes.signInUrl} className='to_register'> Log in</Link>
                    </p>

                    <div className='clearfix' />
                    <br />

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
