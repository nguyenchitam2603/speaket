import { createAction } from 'redux-actions';

import { GithubMember } from './../models';
import { RECEIVE_GITHUB_MEMBERS } from './../constants';

const receiveGithubMembers = createAction<Array<GithubMember>>(RECEIVE_GITHUB_MEMBERS);

export const fetchGithubMembers = () => (dispatch) => {
  let githubMembersUrl: string = 'https://api.github.com/orgs/lemoncode/members';

  fetch(githubMembersUrl)
  .then((response: Response) => {
    return response.json();
  })
  .then((data: Array<any>) => {
    let githubMembers: Array<GithubMember> = [];
    data.map(member => {
      let githubMember: GithubMember = new GithubMember(member.login, member.avatar_url);
      githubMembers.push(githubMember);
    })

    dispatch(receiveGithubMembers(githubMembers));
  });

  return;
}
