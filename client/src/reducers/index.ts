import { combineReducers } from 'redux';

import engineers from './engineer.reducer';
import githubMembers from './githubMembers.reducer';
import { IAppState } from './../models';

export const reducers = combineReducers<IAppState>({
  engineers,
  githubMembers
});
