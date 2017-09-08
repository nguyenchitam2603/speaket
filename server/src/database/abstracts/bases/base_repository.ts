import { IDbContext, IRepository } from '../interfaces';

export abstract class BaseRepository<T> implements IRepository<T> {
  constructor(protected dbContext: IDbContext<T>) {
  }

  retrieve(): Promise<any> {
    return this.dbContext.retrieve();
  }

  findById(id: String): Promise<T> {
    return this.dbContext.findById(id);
  }

  findOne(condition: Object): Promise<T> {
    return this.dbContext.findOne(condition);
  }

  find(condition: Object, fields: Object, options: Object): Promise<T[]> {
    return this.dbContext.find(condition, fields, options);
  }

  create(item: T): Promise<any> {
    return this.dbContext.create(item);
  }

  update(id: String, item: T): Promise<any> {
    return this.dbContext.update(id, item);
  }

  delete(id: String): Promise<any> {
    return this.dbContext.delete(id);
  }
}
