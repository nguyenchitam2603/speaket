import { handleAction } from 'redux-actions';

import { RECEIVE_GITHUB_MEMBERS } from './../constants';
import { GithubMember } from './../models';

export default handleAction<Array<GithubMember>, Array<GithubMember>>(
  RECEIVE_GITHUB_MEMBERS,
  (state, action) => {
    return action.payload
  },
  new Array<GithubMember>()
);
