import { handleAction } from 'redux-actions';

import { Engineer, IAppState } from './../models';
import { REGISTER_ENGINEER } from './../constants';

const initialState = new Array<Engineer>()

export default handleAction<Array<Engineer>, Engineer>(
  REGISTER_ENGINEER,
  (state, action) => {
    return [
      ...state,
      action.payload
    ]
  },
  initialState
);
