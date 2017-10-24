import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as Routes from './../../app.routes';
import { UserService } from '../../../services';

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
    };

    this.signOutHandler = this.signOutHandler.bind(this);
  }

  public signOutHandler(event): void {
    event.preventDefault();
    UserService.signOut(() => this.setState({ isSignedOut: true }), null);
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
            <a title='Sign Out' onClick={this.signOutHandler}>
              <span className='glyphicon glyphicon-off' aria-hidden='true' />
            </a>
        )}
      </div>
    );
  }
}
