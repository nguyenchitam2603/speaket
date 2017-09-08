import * as React from 'react';
import SocialLoginComponent from 'react-social-login'

namespace ButtonComponent {
  export interface Props {
    triggerLogin: any;
    children: any;
  }

  export interface State {
  }
}

class ButtonComponent extends React.Component<ButtonComponent.Props, ButtonComponent.State> {
  render() {
    return (
      <div onClick={this.props.triggerLogin}>
        {this.props.children}
      </div>
    );
  }
}

export default SocialLoginComponent(ButtonComponent);
