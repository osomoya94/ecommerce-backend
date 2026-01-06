import { UsersService } from './users.service';
import { updateUser } from './Dto/createUser.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(page?: number, limit?: number): Promise<Omit<import("./users.entitys").User, "password" | "isAdmin" | "confirmPassword">[]>;
    updateUser(id: string, userData: Partial<updateUser>): Promise<string | import("./users.entitys").User>;
    deleteUser(id: string): Promise<string>;
    getUserById(id: string): Promise<Omit<import("./users.entitys").User, "password" | "confirmPassword">>;
}
