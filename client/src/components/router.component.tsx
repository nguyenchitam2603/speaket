import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AppComponent } from './app.component';
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
        <Route path={Routes.baseUrl} render={() => <AppComponent />} />
      </BrowserRouter>
    );
  }
}
