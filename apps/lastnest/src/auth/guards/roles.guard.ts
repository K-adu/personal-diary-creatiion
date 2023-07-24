import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('0');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('1');
    if (!requiredRoles) {
      console.log('2');
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('this is from role guard printing user', user);
    console.log(requiredRoles);
    const boolean = requiredRoles.some((role) => user.roles?.includes(role));
    return boolean;
  }
}
