import * as classNames from 'classnames';
import * as React from 'react';

import { ISocialAuthService, SocialAuthService, UserService } from '../../../services';
import * as styles from './facebook_signin.style.css';

namespace SocialSignInComponent {
  export interface Props {
    appId: string;
    provider: string;
    onSignInSuccess: () => void;
    onSignInFailure: (error) => void;
  }

  export interface State {
  }
}

export class SocialSignInComponent extends React.Component<SocialSignInComponent.Props, SocialSignInComponent.State> {
  private socialAuthService: ISocialAuthService;

  constructor(props) {
    super(props);

    this.signInHandler = this.signInHandler.bind(this);
  }

  componentDidMount() {
    UserService.initSocial(this.props.provider, this.props.appId);
  }

  private signInHandler(): void {
    UserService.signInSocial(this.props.provider, () => this.props.onSignInSuccess(), null);
  }

  render() {
    return (
      <div onClick={this.signInHandler}>
        {this.props.children}
      </div>
    );
  }
}
