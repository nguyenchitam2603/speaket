import { Engineer, GithubMember } from './../models';

export interface IAppState {
  engineers: Array<Engineer>;
  githubMembers: Array<GithubMember>;
}
