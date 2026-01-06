import { User } from './users.entitys';
import { createUser, updateUser } from './Dto/createUser.dto';
import { Repository } from 'typeorm';
export declare class UsersRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    fillUsers(page: number, limit: number): Promise<Omit<User, 'password' | 'isAdmin' | 'confirmPassword'>[]>;
    createUser(newUser: createUser): Promise<Omit<User, 'password' | 'confirmPassword' | 'isAdmin'>>;
    updateUserById(id: string, userData: Partial<updateUser>): Promise<string>;
    deleteUserById(id: string): Promise<string>;
    getById(id: string): Promise<Omit<User, 'password' | 'confirmPassword'>>;
    findOneByEmail(email: string): Promise<User>;
}
