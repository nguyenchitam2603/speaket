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
    redirect: boolean,
    signup_error: string,
    email: string,
    password: string
  }
}

export class SignUpComponent extends React.Component<any, SignUpComponent.State> {
  constructor() {
    super();

    this.state = {
      redirect: false,
      signup_error: '',
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    RestClientService.getInstance().post(Routes.signUpApi, new SignUpPayload(this.state.email, this.state.password))
      .then(() => {
        this.setState({ signup_error: '', redirect: true });
      })
      .catch(error => {
        this.setState({ signup_error: error.message });
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={Routes.baseUrl} />;
    } else {
      return (
        <div>
          <a className='hiddenanchor' id='signup' />
          <a className='hiddenanchor' id='signin' />

          <div className='login_wrapper'>
            <div id='register' className='form'>
              <section className='login_content'>
                <form onSubmit={this.handleSubmit}>
                  <h1>Create Account</h1>
                  <div className={styles.signup_error}>{this.state.signup_error}</div>
                  <div>
                    <input name='email' type='email' className='form-control' placeholder='Email' required={true} onChange={this.handleInputChange} />
                  </div>
                  <div>
                    <input name='password' type='password' className='form-control' placeholder='Password' required={true} onChange={this.handleInputChange} />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-default">Submit</button>
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
