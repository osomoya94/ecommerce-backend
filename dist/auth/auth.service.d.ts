import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepositopry;
    private readonly jwtService;
    constructor(userRepositopry: UsersRepository, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
}
