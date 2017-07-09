import * as React from 'react';

import { EngineerProviderComponent } from './engineerProvider.component';
import { EngineerViewComponent } from './engineerView.component';
import { Engineer } from './../../models';

namespace EngineerComponent {
  export interface Props {
    engineers: Array<Engineer>,
    onRegister: (engineer: Engineer) => void
  }

  export interface State {
  }
}

export class EngineerComponent extends React.Component<EngineerComponent.Props, EngineerComponent.State> {
  render() {
    return (
      <div>
        <EngineerProviderComponent onRegister={this.props.onRegister}/>
        <EngineerViewComponent engineers={this.props.engineers}/>
      </div>
    );
  }
}
