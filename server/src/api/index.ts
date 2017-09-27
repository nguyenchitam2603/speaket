import * as Hapi from 'hapi';

import { userRouteConfigurations } from './user';

export const apiRoutes: Hapi.RouteConfiguration[] = [
  ...userRouteConfigurations
];
