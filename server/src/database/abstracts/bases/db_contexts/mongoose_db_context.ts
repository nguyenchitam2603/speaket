import * as Mongoose from 'mongoose';

import { IDbContext } from '../../interfaces';
import { UserModel } from '../../../internal/engines/mongoose/models';

export class MongooseDbContext<T> implements IDbContext<T> {
  constructor(private model: Mongoose.Model<any>) {
    (<any>Mongoose.Promise) = global.Promise;
  }

  public retrieve(): Promise<any> {
    return this.model.find({}).exec();
  }

  public findById(id: String): Promise<T> {
    return this.model.findById(id).exec() as Promise<any>;
  }

  public findOne(condition: Object): Promise<T> {
    return this.model.findOne(condition).exec()
      .catch((error) => {
        console.log('failed to find item. Error: ', error);
      });
  }

  public find(condition: Object, fields: Object, options: Object): Promise<T[]> {
    return this.model.find(condition, fields, options).exec() as Promise<any[]>;
  }

  public create(item: T): Promise<any> {
    return this.model.create(item)
      .catch((error) => {
        console.log('failed to create item. Error: ', error);
      });
  }

  public update(id: String, item: T): Promise<any> {
    return this.model.update({ _id: id }, item).exec()
      .catch((error) => {
        console.log('failed to create item. Error: ', error);
      });
  }

  public delete(id: String): Promise<any> {
    return this.model.remove({ _id: id }).exec()
      .catch((error) => {
        console.log('failed to delete item. Error: ', error);
      });
  }
}
