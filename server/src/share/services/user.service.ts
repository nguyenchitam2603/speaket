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

  public addPasswordResetToken(email: string, token: string, expireTime: number): Promise<Error> {
    return this.userRepository.addPasswordResetToken(email, token, expireTime);
  }

  public resetPassword(token: string, password: string): Promise<Error> {
    return this.userRepository.resetPassword(token, password);
  }

  public isTokenExpired(token: string): Promise<Error> {
    return this.userRepository.isTokenExpired(token);
  }
}

export let userService: UserService = new UserService(new UserRepository());
