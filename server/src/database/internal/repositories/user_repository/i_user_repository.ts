import { Error } from '../../../constants';
import { IRepository } from '../../../abstracts';
import { User } from '../../../../share/models';

export interface IUserRepository extends IRepository<User> {
  validateUser(email: String, password: String): Promise<boolean>;
  addUser(user: User): Promise<Error>;
  addPasswordResetToken(email: string, token: string, expireTime: number): Promise<Error>;
  resetPassword(token: string, password: string): Promise<Error>;
  isTokenExpired(token: string): Promise<Error>;
  isExistUser(user: User): Promise<boolean>;
}
