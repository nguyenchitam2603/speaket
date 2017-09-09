import * as React from 'react';
import { Link } from 'react-router-dom';

import { menuItemMap } from './menu.map';

namespace MenuComponent {
  export interface Props {
  }

  export interface State {
  }
}

export class MenuComponent extends React.Component<MenuComponent.Props, MenuComponent.State> {
  private getMenuItemTree() {
    let menuItemTree = (
      <ul className='nav side-menu'>
        {
          menuItemMap.subMenuItems.map((menuItem, index) => {
            return (
              <li key={index}>
                <a>
                  <i className='fa fa-home' /> {menuItem.name}
                  <span className='fa fa-chevron-down' />
                </a>

                <ul className='nav child_menu' >
                  {
                    menuItem.subMenuItems.map((subMenuItem, index) => {
                      return (
                        <li key={index}>
                          <Link to={subMenuItem.link}>{subMenuItem.name}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    );

    return menuItemTree;
  }

  render() {
    return (
      <div id='sidebar-menu' className='main_menu_side hidden-print main_menu' >
        <div className='menu_section' >
          <h3>General</h3>
          {this.getMenuItemTree()}
        </div>
      </div>
    );
  }
}
