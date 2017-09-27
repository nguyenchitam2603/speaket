import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from './../../app.routes';
import { RestClientService } from '../../../services';

namespace FooterComponent {
  export interface Props {
  }

  export interface State {
    isSignedOut: boolean;
  }
}

export class FooterComponent extends React.Component<FooterComponent.Props, FooterComponent.State> {


  constructor(props) {
    super(props);

    this.state = {
      isSignedOut: false
    }

    this.handleNormalLogout = this.handleNormalLogout.bind(this);
  }

  handleNormalLogout(event) {
    event.preventDefault();

    RestClientService.getInstance().get(Routes.signOutApi)
      .then(() => {
        this.setState({ isSignedOut: true })
      })
      .catch(error => {
        this.setState({ isSignedOut: false })
      });
  }

  render() {
    return (
      <div className='sidebar-footer hidden-small'>
        <a title='Settings'>
          <span className='glyphicon glyphicon-cog' aria-hidden='true' />
        </a>
        <a title='FullScreen'>
          <span className='glyphicon glyphicon-fullscreen' aria-hidden='true' />
        </a>
        <a title='Lock'>
          <span className='glyphicon glyphicon-eye-close' aria-hidden='true' />
        </a>
        {(
          this.state.isSignedOut ? <Redirect to={Routes.signInUrl} /> :
            <a title='Logout' onClick={this.handleNormalLogout}>
              <span className='glyphicon glyphicon-off' aria-hidden='true' />
            </a>
        )}
      </div>
    );
  }
}
