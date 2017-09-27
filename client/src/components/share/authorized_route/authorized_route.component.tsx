import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as Routes from '../../app.routes';
import { RestClientService } from '../../../services';

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
    }
  }

  componentWillMount() {
    RestClientService.getInstance().get(Routes.signInStatusApi)
      .then((isSignedIn) => {
        this.setState({ isSignedIn: isSignedIn, loading: true })
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
