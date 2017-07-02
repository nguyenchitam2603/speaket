import * as React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from './../app.routes';

namespace LoginComponent {
  export interface Props {

  }

  export interface State {

  }
}

export class LoginComponent extends React.Component<LoginComponent.Props, LoginComponent.State> {
  render() {
    return (
      <div>
        <a className='hiddenanchor' id='signup' />
        <a className='hiddenanchor' id='signin' />
        <div className='login_wrapper'>
          <div className='animate form login_form'>
            <section className='login_content'>
              <form>
                <h1>Login</h1>
                <div>
                  <input type='text' className='form-control' placeholder='Username' required={true} />
                </div>
                <div>
                  <input type='password' className='form-control' placeholder='Password' required={true} />
                </div>
                <div>
                  <Link to={Routes.baseUrl} className='btn btn-default submit'> Log in</Link>
                  <a className='reset_pass' href='#'>Lost your password?</a>
                </div>

                <div className='clearfix' />

                <div className='separator'>
                  <p className='change_link'>New to site?
                    <Link to={Routes.signupUrl} className='to_register'> Create Account</Link>
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
