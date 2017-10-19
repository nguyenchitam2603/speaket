import * as Hapi from 'hapi';

import { IApiConfiguration } from './i-api-configuration';
import { userApiConfiguration } from './user';

export const apiConfigurations: IApiConfiguration[] = [
  userApiConfiguration
];
