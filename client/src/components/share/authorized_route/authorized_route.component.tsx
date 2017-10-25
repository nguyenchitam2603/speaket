import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as Routes from '../../app.routes';
import { UserService } from '../../../services';

namespace AuthorizedRoute {
  export interface Props {
  }

  export interface State {
    isSignedIn: boolean;
    loading: boolean;
  }
}

export class AuthorizedRoute extends React.Component<any, AuthorizedRoute.State> {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      loading: false
    };
  }

  componentWillMount() {
    UserService.initSocialAuth()
      .then(() => {
        UserService.validateSignedIn(
          () => this.setState({ isSignedIn: true, loading: true }),
          () => this.setState({ isSignedIn: false, loading: true })
        );
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (!this.state.loading) {
      return false;
    } else {
      return (
        <Route {...rest} render={props => {
          return this.state.isSignedIn ? <Component {...props} /> : <Redirect to={{ pathname: Routes.signInUrl, state: { from: props.location } }} />
        }} />
      );
    }
  }
}
