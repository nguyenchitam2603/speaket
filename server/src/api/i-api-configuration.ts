import * as Hapi from 'hapi';

export interface IApiConfiguration {
  controller: any;
  routes: Hapi.RouteConfiguration[];
}
