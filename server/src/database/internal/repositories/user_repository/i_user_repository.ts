import { Error } from '../../../constants';
import { IRepository } from '../../../abstracts';
import { User } from '../../../../share/models';

export interface IUserRepository extends IRepository<User> {
  validateUser(email: String, password: String): Promise<boolean>;
  addUser(user: User): Promise<Error>;
  isExistUser(user: User): Promise<boolean>;
}
