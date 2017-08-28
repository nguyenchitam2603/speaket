import { DbClientType } from './dbClientType';
import { IDbClient } from './iDbClient';
import { MongooseDbClient } from './mongooseDbClient';

let databaseConfig = require('../../../config/database/' + process.env.database_config_file);

export class DbClientFactory {
  public static createDbClient(dbType: DbClientType) {
    let dbClient: IDbClient = null;

    switch (dbType) {
      case DbClientType.MONGOOSE: {
        dbClient = new MongooseDbClient(databaseConfig['mongoose']['connection_string'], databaseConfig['mongoose']['connection_options']);
        break;
      }

      default: {
        throw 'Invalid database';
      }
    }

    return dbClient;
  }
}
