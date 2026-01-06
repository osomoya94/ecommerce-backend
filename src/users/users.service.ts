import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entitys';
import { createUser, updateUser } from './Dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password' | 'isAdmin' | 'confirmPassword'>[]> {
    return this.userRepository.fillUsers(page, limit);
  }

  async createUser(
    user: createUser,
  ): Promise<Omit<User, 'password' | 'confirmPassword' | 'isAdmin'>> {
    return this.userRepository.createUser(user);
  }

  async updateUser(
    id: string,
    userData: Partial<updateUser>,
  ): Promise<User | string> {
    return this.userRepository.updateUserById(id, userData);
  }

  async deleteUserById(id: string): Promise<string> {
    return this.userRepository.deleteUserById(id);
  }

  async getUsersById(
    id: string,
  ): Promise<Omit<User, 'password' | 'confirmPassword'>> {
    return this.userRepository.getById(id);
  }
}
