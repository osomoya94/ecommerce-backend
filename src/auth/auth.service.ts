import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositopry: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y Password son obligatorios');
    }
    const user = await this.userRepositopry.findOneByEmail(email);
    if (!user || !user.password) {
      return { message: 'Email o Password incorrecto' };
    }

    const passwordValid = await bcrypt.compare(password, user.confirmPassword);

    if (!passwordValid) {
      return { message: 'Email o Password incorrecto' };
    }

    const payLoad = {
      sub: user.id,
      id: user.id,
      email: user.email,
      admin: user.isAdmin === true,
      roles: user.isAdmin ? [Role.Admin] : [Role.User],
    };

    const token = this.jwtService.sign(payLoad);

    return { message: 'Inicio de sesión exitoso', token };
  }
}
