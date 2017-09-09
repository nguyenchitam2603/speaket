import { connect, Dispatch } from 'react-redux';

import { fetchGithubMembers } from './../../actions';
import { GithubComponent } from './../../components/dashboard/content/github/github.component';
import { IAppState } from './../../models';

function mapStateToProps(state: IAppState) {
  return {
    githubMembers: state.githubMembers
  }
}

function mapDispatchToProps(dispatch: Dispatch<{}>) {
  return {
    fetchGithubMembers: () => {
      dispatch(fetchGithubMembers())
    }
  }
}

export const GithubContainer = connect(mapStateToProps, mapDispatchToProps)(GithubComponent as any);
