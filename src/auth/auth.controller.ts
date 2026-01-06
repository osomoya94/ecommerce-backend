import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/Dto/LoginUser.dto';
import { createUser } from 'src/users/Dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auhtService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signin')
  signIn(@Body() loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    return this.auhtService.signIn(email, password);
  }

  @ApiTags('Auth')
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  signUp(@Body() user: createUser) {
    return this.userService.createUser(user);
  }
}
