import { DbClientType } from '../constants';
import { IDbClient, MongooseDbClient } from '../abstracts';

let databaseConfig = null;
if (process.env.ENVIRONMENT === 'DEV') {
  databaseConfig = require('../../../config/database/database.config.dev.json');
} else if (process.env.ENVIRONMENT === 'PROD') {
  databaseConfig = require('../../../config/database/database.config.prod.json');
}

export class DbClientFactory {
  public static createDbClient(dbType: DbClientType) {
    let dbClient: IDbClient = null;

    switch (dbType) {
      case DbClientType.Mongoose: {
        dbClient = new MongooseDbClient(databaseConfig['Mongoose']['connection_string'], databaseConfig['Mongoose']['connection_options']);
        break;
      }

      default: {
        throw 'Invalid database';
      }
    }

    return dbClient;
  }
}
