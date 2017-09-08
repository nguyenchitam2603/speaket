import { DbClientType } from '../../../../constants';
import { IDbContext, MongooseDbContext } from '../../../../abstracts';
import { ModelFactory } from './model_factory';

let databaseConfig = null;
if (process.env.ENVIRONMENT === 'DEV') {
  databaseConfig = require('../../../../../../config/database/database.config.dev.json');
} else if (process.env.ENVIRONMENT === 'PROD') {
  databaseConfig = require('../../../../../../config/database/database.config.prod.json');
}

export class DbContextFactory {
  static createDbContext<T>(modelClassName: String): IDbContext<T> {
    let dbContext: IDbContext<T> = null;

    switch (databaseConfig['Speaket_database']) {
      case DbClientType.Mongoose: {
        let model = ModelFactory.createModel(modelClassName);
        dbContext = new MongooseDbContext<T>(model);
        break;
      }

      default: {
        throw 'Invalid engine';
      }
    }

    return dbContext;
  }
}
