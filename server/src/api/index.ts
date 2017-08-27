import * as Hapi from 'hapi';

import { signUpRouteConfigurations } from './authentication';

export const apiRoutes: Hapi.RouteConfiguration[] = [
  ...signUpRouteConfigurations
];
