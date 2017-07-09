import * as Hapi from 'hapi';
import { FileHandlerRouteObject } from 'inert';

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
  ...fileRouteConfigurations
];

export function registerRoutes() {
  let server: Hapi.Server = this;

  routeConfigurations.forEach(routeConfiguration => {
    server.route(routeConfiguration);
  });
}
