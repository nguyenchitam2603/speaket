import * as React from 'react';

import { Engineer } from './../../models';

namespace EngineerViewComponent {
  export interface Props {
    engineers: Array<Engineer>;
  }

  export interface State {
  }
}

export class EngineerViewComponent extends React.Component<EngineerViewComponent.Props, EngineerViewComponent.State> {
  render() {
    return (
      <div className='row'>
        <div className='col-md-10 col-sm-9 col-xs-9 col-md-offset-1 col-sm-offset-2 col-xs-offset-2'>
          <div className='x_panel'>
            <div>
              <h1>Register Engineer</h1>
              <div className='clearfix' />
            </div>
            <div className='x_content'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Middle name</th>
                    <th>Date of birth</th>
                    <th>Job</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.engineers.map((engineer, index) => {
                      return (
                        <tr key={index}>
                          <td>{engineer.firstName}</td>
                          <td>{engineer.lastName}</td>
                          <td>{engineer.middleName}</td>
                          <td>{engineer.dateOfBirth}</td>
                          <td>{engineer.job}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}