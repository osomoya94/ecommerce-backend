import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/Dto/LoginUser.dto';
import { createUser } from 'src/users/Dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly auhtService;
    private readonly userService;
    constructor(auhtService: AuthService, userService: UsersService);
    signIn(loginUser: LoginUserDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
    signUp(user: createUser): Promise<Omit<import("../users/users.entitys").User, "password" | "isAdmin" | "confirmPassword">>;
}
