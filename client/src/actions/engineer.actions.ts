import { createAction } from 'redux-actions';

import { Engineer } from './../models';
import { REGISTER_ENGINEER } from './../constants';

export const registerEngineer = createAction<Engineer>(REGISTER_ENGINEER);
