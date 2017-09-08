import * as Hapi from 'hapi';

import { signUpRouteConfigurations, signInRouteConfigurations, signOutRouteConfigurations } from './user';

export const apiRoutes: Hapi.RouteConfiguration[] = [
  ...signUpRouteConfigurations,
  ...signInRouteConfigurations,
];
