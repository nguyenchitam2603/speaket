import * as React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../app.routes';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';

namespace DashboardComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class DashboardComponent extends React.Component<any, DashboardComponent.State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // React will remove dom elements of AppComponent after logout
    // When logging in again, the doms are losted, so their click event
    // also losted too. Loading custom.js will assign the event handler
    // to the dom again
    const script = document.createElement("script");
    script.src = "/js/custom.min.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className='container body'>
        <div className='main_container'>
          <div className='col-md-3 left_col'>
            <SidebarComponent />
          </div>

          <div className='top_nav'>
            <div className='nav_menu'>
              <nav>
                <div className='nav toggle'>
                  <a id='menu_toggle'><i className='fa fa-bars' /></a>
                </div>

                <ul className='nav navbar-nav navbar-right'>
                  <li className=''>
                    <a href='javascript:;' className='user-profile dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>
                      <img src='images/img.jpg' alt='' />John Doe
                      <span className=' fa fa-angle-down' />
                    </a>
                    <ul className='dropdown-menu dropdown-usermenu pull-right'>
                      <li><a href='javascript:;'> Profile</a></li>
                      <li>
                        <a href='javascript:;'>
                          <span className='badge bg-red pull-right'>50%</span>
                          <span>Settings</span>
                        </a>
                      </li>
                      <li><a href='javascript:;'>Help</a></li>
                      <li>
                        <Link to={Routes.signInUrl}>
                          <i className='fa fa-sign-out pull-right' /> Log Out
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li role='presentation' className='dropdown'>
                    <a href='javascript:;' className='dropdown-toggle info-number' data-toggle='dropdown' aria-expanded='false'>
                      <i className='fa fa-envelope-o' />
                      <span className='badge bg-green'>6</span>
                    </a>
                    <ul id='menu1' className='dropdown-menu list-unstyled msg_list' role='menu'>
                      <li>
                        <a>
                          <span className='image'><img src='images/img.jpg' alt='Profile Image' /></span>
                          <span>
                            <span>John Smith</span>
                            <span className='time'>3 mins ago</span>
                          </span>
                          <span className='message'>
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className='image'><img src='images/img.jpg' alt='Profile Image' /></span>
                          <span>
                            <span>John Smith</span>
                            <span className='time'>3 mins ago</span>
                          </span>
                          <span className='message'>
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className='image'><img src='images/img.jpg' alt='Profile Image' /></span>
                          <span>
                            <span>John Smith</span>
                            <span className='time'>3 mins ago</span>
                          </span>
                          <span className='message'>
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className='image'><img src='images/img.jpg' alt='Profile Image' /></span>
                          <span>
                            <span>John Smith</span>
                            <span className='time'>3 mins ago</span>
                          </span>
                          <span className='message'>
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className='text-center'>
                          <a>
                            <strong>See All Alerts</strong>
                            <i className='fa fa-angle-right' />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className='right_col' role='main'>
            <div className=''>
              <div className='page-title'>
                <div className='title_left' />
                <div className='title_right' />
              </div>
              <div className='clearfix' />
              <div className='row'>
                <div className='col-md-12 col-sm-12 col-xs-12'>
                  <div className='x_panel'>
                    <div className='x_content'>
                      <ContentComponent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
