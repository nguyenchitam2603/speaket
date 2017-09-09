import * as React from 'react';
import { Route } from 'react-router-dom';

import * as Routes from '../../app.routes';
import { EngineerContainer, GithubContainer } from './../../../containers';

namespace ContentComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class ContentComponent extends React.Component<ContentComponent.Props, ContentComponent.State> {
  render() {
    return (
      <div>
        <Route path={Routes.engineerUrl} render={() => <EngineerContainer />} />
        <Route path={Routes.githubUrl} render={() => <GithubContainer />} />
      </div>
    );
  }
}
