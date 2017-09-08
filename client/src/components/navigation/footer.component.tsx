import * as React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from './../app.routes';

namespace FooterComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class FooterComponent extends React.Component<FooterComponent.Props, FooterComponent.State> {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='sidebar-footer hidden-small'>
        <a data-toggle='tooltip' data-placement='top' title='' data-original-title='Settings'>
          <span className='glyphicon glyphicon-cog' aria-hidden='true'/>
        </a>
        <a data-toggle='tooltip' data-placement='top' title='' href='login.html' data-original-title='FullScreen'>
          <span className='glyphicon glyphicon-fullscreen' aria-hidden='true'/>
        </a>
        <a data-toggle='tooltip' data-placement='top' title='' href='login.html' data-original-title='Lock'>
          <span className='glyphicon glyphicon-eye-close' aria-hidden='true'/>
        </a>
        <Link to={Routes.signInUrl} data-toggle='tooltip' data-placement='top' title='' href='login.html' data-original-title='Logout'>
          <span className='glyphicon glyphicon-off' aria-hidden='true'/>
        </Link>
      </div>
    );
  }
}
