import * as Hapi from 'hapi';
import { FileHandlerRouteObject } from 'inert';

import { apiRoutes } from './api';

let fileRouteConfigurations: Hapi.RouteConfiguration[] = [
  {
    method: 'GET',
    path: '/',
    handler: {
      file: 'index.html'
    }
  },
  {
    method: 'GET',
    path: '/js/{file*}',
    handler: {
      directory: {
        path: 'js'
      }
    }
  },
  {
    method: 'GET',
    path: '/css/{file*}',
    handler: {
      directory: {
        path: 'css'
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{file*}',
    handler: {
      directory: {
        path: 'fonts'
      }
    }
  }
];

let routeConfigurations: Hapi.RouteConfiguration[] = [
  ...fileRouteConfigurations,
  ...apiRoutes
];

export function registerRoutes() {
  let server: Hapi.Server = this;

  routeConfigurations.forEach(routeConfiguration => {
    server.route(routeConfiguration);
  });
}
