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

  public validateUser(email: string, password: string): Promise<boolean> {
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

  public addUser(user: User): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      this.isExistUser(user)
        .then(result => {
          if (result !== true) {
            return this.hashPassword(user.password);
          } else {
            resolve(Error.DuplicateData);
            return { then: () => { return; } };   // Pseudo then to break the promise chain
          }
        })
        .then((hash: any) => {
          user.password = hash;
          return this.create(user);
        })
        .then(result => {
          if (!!result) resolve(Error.None);
          else resolve(Error.InvalidData);
        });
    });
  }

  public addPasswordResetToken(email: string, token: string, expireTime: number): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      this.findOne({ email: email })
        .then((user: User) => {
          if (user) {
            user.passwordResetToken = token;
            user.passwordResetTokenExpireTime = expireTime;
            return user;
          } else {
            resolve(Error.InvalidData);
            return { then: () => { return; } };   // Pseudo then to break the promise chain
          }
        })
        .then((user: any) => {
          return this.update(user._id, user);
        })
        .then((result: any) => {
          if (result.nModified > 0) resolve(Error.None);
          else resolve(Error.InvalidData);
        });
    });
  }

  public resetPassword(token: string, password: string): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      let user = null;

      this.findOne({ passwordResetToken: token })
        .then((result: any) => {
          if (result) {
            result.passwordResetToken = null;
            result.passwordResetTokenExpireTime = null;
            user = result;
            return;
          } else {
            resolve(Error.InvalidData);
            return { then: () => { return; } };   // Pseudo then to break the promise chain
          }
        })
        .then(() => {
          return this.hashPassword(password);
        })
        .then((hash: string) => {
          user.password = hash;
          return this.update(user._id, user);
        })
        .then(result => {
          resolve(Error.None);
        });
    });
  }

  public isTokenExpired(token: string): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      this.findOne({ passwordResetToken: token })
        .then((user) => {
          if (!user) {
            resolve(Error.InvalidData);
          } else {
            if (user.passwordResetTokenExpireTime > Date.now()) {
              resolve(Error.None);
            } else {
              resolve(Error.TokenExpired);
            }
          }
        });
    });
  }

  public isExistUser(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.findOne({ email: user.email })
        .then(result => {
          resolve(!!result);
        });
    });
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
