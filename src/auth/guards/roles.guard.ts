// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../roles.enum';

type JwtUser = {
  sub: string;
  email: string;
  admin?: boolean;
  roles?: Role[];
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        ctx.getHandler(),
        ctx.getClass(),
      ]) ?? [];

    if (requiredRoles.length === 0) return true;

    const req = ctx.switchToHttp().getRequest<Request & { user?: JwtUser }>();
    const user = req.user;
    if (!user) throw new ForbiddenException('No user in request');

    const isAdminByFlag = user.admin === true;
    const hasEnum = user.roles?.some((r) => requiredRoles.includes(r)) === true;

    const ok = requiredRoles.some((r) =>
      r === Role.Admin ? isAdminByFlag || hasEnum : hasEnum,
    );

    if (!ok) throw new ForbiddenException('Insufficient role');
    return true;
  }
}
