import * as classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router-dom';

import { EngineerViewContainer, EngineerProviderContainer, EngineerContainer, GithubContainer } from './../containers';
import * as Routes from './app.routes';
import { SidebarComponent } from './navigation';

namespace AppComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class AppComponent extends React.Component<AppComponent.Props, AppComponent.State> {
  render() {
    return (
      <div className='container body'>
        <div className='main_container'>
          <div className='col-md-3 left_col'>
            <SidebarComponent />
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
                      <Route path={Routes.engineerUrl} render={() => <EngineerContainer />} />
                      <Route path={Routes.githubUrl} render={() => <GithubContainer />} />
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
