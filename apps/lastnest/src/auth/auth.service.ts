import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }
  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }
    if (user.password === password) {
      const payload = { sub: user._id, email: user.email, roles: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
