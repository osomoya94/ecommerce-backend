import { UsersRepository } from './users.repository';
import { User } from './users.entitys';
import { createUser, updateUser } from './Dto/createUser.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    getUsers(page: number, limit: number): Promise<Omit<User, 'password' | 'isAdmin' | 'confirmPassword'>[]>;
    createUser(user: createUser): Promise<Omit<User, 'password' | 'confirmPassword' | 'isAdmin'>>;
    updateUser(id: string, userData: Partial<updateUser>): Promise<User | string>;
    deleteUserById(id: string): Promise<string>;
    getUsersById(id: string): Promise<Omit<User, 'password' | 'confirmPassword'>>;
}
