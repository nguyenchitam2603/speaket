import * as Mongoose from 'mongoose';

import { UserSchema } from '../schemas';
import { internalConnection } from '../../../../connections';

export let UserModel = internalConnection.model('user', UserSchema);
