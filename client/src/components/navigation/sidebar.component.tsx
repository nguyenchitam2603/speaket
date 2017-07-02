import * as React from 'react';
import { Link } from 'react-router-dom';

import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
// import { menuController } from './../controllers';
import * as Routes from './../app.routes';

namespace SidebarComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class SidebarComponent extends React.Component<SidebarComponent.Props, SidebarComponent.State> {
  render() {
    return (
      <div className='left_col scroll-view'>
        <div className='navbar nav_title'>
          <Link to={Routes.baseUrl} className='site_title'>
            <i className='fa fa-paw' />
            <span>Gentelella Alela!</span>
          </Link>
        </div>
        <div className='clearfix' />
        <br />

        <MenuComponent />
        <FooterComponent />
      </div>
    );
  }
}
