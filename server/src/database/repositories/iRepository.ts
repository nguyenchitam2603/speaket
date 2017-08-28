import * as Mongoose from 'mongoose';

export interface IRepository<T> {
  model: any; 

  retrieve(): Promise<any>;
  findById(id: String): Promise<T>;
  findOne(condition: Object): Promise<T>;
  find(condition: Object, fields: Object, options: Object): Promise<T[]>;
  create(item: T): Promise<any>;
  update(id: String, item: T): Promise<any>;
  delete(id: String): Promise<any>;
}
