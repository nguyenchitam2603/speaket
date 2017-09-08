export interface IDbClient {
  connection: any;

  connect();
  disconnect();
}
