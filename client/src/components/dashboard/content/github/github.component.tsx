import * as React from 'react';

import { GithubMember } from './../../../../models';

namespace GithubComponent {
  export interface Props {
    githubMembers: Array<GithubMember>;
    fetchGithubMembers: () => void;
  }

  export interface State {
  }
}

export class GithubComponent extends React.Component<GithubComponent.Props, GithubComponent.State> {
  componentDidMount() {
    this.props.fetchGithubMembers.call(this);
  }

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
                  <th>Name</th>
                  <th>Avatar</th>
                </thead>
                <tbody>
                  {
                    this.props.githubMembers.map(member => {
                      return (
                        <tr>
                          <td>{member.name}</td>
                          <td>
                            <img src={member.avatarUrl} width="100"/>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}