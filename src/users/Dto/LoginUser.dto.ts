import { PickType } from '@nestjs/swagger';
import { createUser } from './createUser.dto';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export class LoginUserDto extends PickType(createUser, ['email', 'password']) {}
