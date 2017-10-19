import * as Hapi from 'hapi';
import { FileHandlerRouteObject } from 'inert';

import { apiConfigurations } from './api';

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
    path: '/{param*}',
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

export function registerRoutes() {
  let server: Hapi.Server = this;

  // Static file routes
  fileRouteConfigurations.forEach(configuration => {
    server.route(configuration);
  });

  // Api routes
  apiConfigurations.forEach(configuration => {
    server.bind(configuration.controller);
    server.route(configuration.routes);
  });
}
