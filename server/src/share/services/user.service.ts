import { Error } from '../../database';
import { IUserRepository, UserRepository } from '../../database/internal/repositories';
import { User } from '../../share/models';

export class UserService {
  constructor(private userRepository: IUserRepository) {
  }

  public validateUser(email: String, password: String): Promise<boolean> {
    return this.userRepository.validateUser(email, password);
  }

  public addUser(user: User): Promise<Error> {
    return this.userRepository.addUser(user);
  }
}

export let userService: UserService = new UserService(new UserRepository());
