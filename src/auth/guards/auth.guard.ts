// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '../../roles.enum';

type JwtUser = {
  sub: string;
  email: string;
  admin?: boolean;
  roles?: Role[];
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request & { user?: JwtUser }>();

    const auth = req.headers['authorization'];
    if (!auth) throw new UnauthorizedException('Missing Authorization header');

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token type');

    try {
      const payload = await this.jwt.verifyAsync<JwtUser>(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid/expired token');
    }
  }
}
