import * as bcrypt from 'bcryptjs';

import { BaseRepository } from '../../../abstracts';
import { DbContextFactory } from '../../engines';
import { Error } from '../../../constants';
import { IUserRepository } from './i_user_repository';
import { User } from '../../../../share/models';

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(DbContextFactory.createDbContext<User>(User.name));
  }

  validateUser(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.findOne({ email: email })
        .then(result => {
          if (!!!result) {
            resolve(false);
          } else {
            bcrypt.compare(password, result.password, (error, result) => {
              resolve(result);
            });
          }
        });
    });
  }

  addUser(user: User): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      this.isExistUser(user)
        .then(result => {
          if (result !== true) {
            bcrypt.hash(user.password, 10, (error, hash) => {
              user.password = hash;
              this.create(user)
                .then(result => {
                  if (!!result) resolve(Error.None);
                  else resolve(Error.InvalidData);
                });
            });
          } else {
            resolve(Error.DuplicateData);
          }
        });
    });
  }

  isExistUser(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.findOne({ email: user.email })
        .then(result => {
          resolve(!!result);
        });
    });
  }
}
