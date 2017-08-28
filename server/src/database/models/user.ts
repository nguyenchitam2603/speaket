import { IRepository } from './../repositories';
import { User } from './../entities';

export class UserController {
  constructor(private repository: IRepository<User>) {  
  }

  public getUser(condition: Object) {
    this.repository.findOne(condition)
    .then((result) => {
      console.log('result la cai nay', result);
    })
  }

  public getUserList(condition: Object, fields: Object, options: Object) {
    this.repository.find(condition, fields, options)
    .then((result) => {
      console.log('result la cai nay', result);
    })
  }

  public addUser(user: User) {
    this.repository.create(user)
    .then((result) => {
      console.log('result la cai nay', result);
    })
  }

  public deleteUser(id: String) {
    this.repository.delete(id)
    .then((result) => {
      console.log('result cua delete user', result);
    })
  }

  public updateUser(id: String, user: User) {
    this.repository.update(id, user)
    .then((result) => {
      console.log('result cua delete user', result);
    })
  }
}
