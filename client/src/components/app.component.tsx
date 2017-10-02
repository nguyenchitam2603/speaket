import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as Routes from './app.routes';
import { DashboardComponent } from './dashboard';
import { ForgotPasswordComponent } from './forgot_password';
import { ResetPasswordComponent } from './reset_password';
import { SignInComponent } from './sign_in';
import { SignUpComponent } from './sign_up';
import { AuthorizedRoute } from './share/authorized_route';

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
        <Route path={Routes.signInUrl} component={SignInComponent} />
        <Route path={Routes.signUpUrl} component={SignUpComponent} />
        <Route path={Routes.forgotPasswordUrl} component={ForgotPasswordComponent} />
        <Route path={Routes.resetPasswordUrl} component={ResetPasswordComponent} />
        <AuthorizedRoute path={Routes.dashboardUrl} component={DashboardComponent} />
        <Redirect to={Routes.dashboardUrl} />
      </Switch>
    );
  }
}
