import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppComponent } from './app.component';
import { SignInComponent, SignUpComponent } from './../components/user';
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
          <Route path={Routes.signInUrl} render={() => <SignInComponent />} />
          <Route path={Routes.signUpUrl} render={() => <SignUpComponent />} />
          <Route path={Routes.baseUrl} render={() => <AppComponent />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
