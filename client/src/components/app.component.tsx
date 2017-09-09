import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Routes from './app.routes';
import { DashboardComponent } from './dashboard';
import { SignInComponent } from './sign_in';
import { SignUpComponent } from './sign_up';

namespace AppComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class AppComponent extends React.Component<AppComponent.Props, AppComponent.State> {
  render() {
    return (
      <Switch>
        <Route path={Routes.dashboardUrl} render={() => <DashboardComponent />} />
        <Route path={Routes.signInUrl} render={() => <SignInComponent />} />
        <Route path={Routes.signUpUrl} render={() => <SignUpComponent />} />
      </Switch>
    );
  }
}
