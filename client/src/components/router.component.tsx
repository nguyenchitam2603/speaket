import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppComponent } from './app.component';
import { LoginComponent, SignUpComponent } from './authentication';
import { SignUpContainer } from './../containers';
import * as Routes from './app.routes';

namespace RouterComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class RouterComponent extends React.Component<RouterComponent.Props, RouterComponent.State> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={Routes.loginUrl} render={() => <LoginComponent />} />
          <Route path={Routes.signupUrl} render={() => <SignUpContainer />} />
          <Route path={Routes.baseUrl} render={() => <AppComponent />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
