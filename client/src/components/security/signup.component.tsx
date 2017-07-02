import * as React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from './../app.routes';

namespace SignUpComponent {
  export interface Props {

  }

  export interface State {

  }
}

export class SignUpComponent extends React.Component<SignUpComponent.Props, SignUpComponent.State> {
  render() {
    return (
      <div>
        <a className='hiddenanchor' id='signup' />
        <a className='hiddenanchor' id='signin' />

        <div className='login_wrapper'>
          <div id='register' className='form'>
            <section className='login_content'>
              <form>
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
                  <a className='btn btn-default submit' href='index.html'>Submit</a>
                </div>

                <div className='clearfix' />

                <div className='separator'>
                  <p className='change_link'>Already a member ?
                    <Link to={Routes.loginUrl} className='to_register'> Log in</Link>
                  </p>

                  <div className='clearfix' />
                  <br />

                  <div>
                    <h1><i className='fa fa-paw' /> Gentelella Alela!</h1>
                    <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
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