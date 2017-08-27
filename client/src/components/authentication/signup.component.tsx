import * as React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from './../app.routes';
import { SignUpInfo } from './../../models';

namespace SignUpComponent {
  export interface Props {
    onSignUp: (signUpInfo: SignUpInfo) => void
  }

  export interface State {
  }
}

export class SignUpComponent extends React.Component<SignUpComponent.Props, SignUpComponent.State> {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignUp(new SignUpInfo('tam', '123', 'abc@gmai.com'));
  }

  render() {
    return (
      <div>
        <a className='hiddenanchor' id='signup' />
        <a className='hiddenanchor' id='signin' />

        <div className='login_wrapper'>
          <div id='register' className='form'>
            <section className='login_content'>
               <form onSubmit={this.handleSubmit}>
                <h1>Create Account</h1>
                <div>
                  <input type='text' className='form-control' placeholder='Username' />
                </div>
                <div>
                  <input type='email' className='form-control' placeholder='Email' />
                </div>
                <div>
                  <input type='password' className='form-control' placeholder='Password' />
                </div>
                <div>
                  <button type="submit" className="btn btn-default">Submit</button>
                  {/* <a className='btn btn-default submit'>Submit</a> */}
                </div>

                <div className='clearfix' />

                <div className='separator'>
                  <p className='change_link'>Already a member ?
                    <Link to={Routes.loginUrl} className='to_register'> Log in</Link>
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