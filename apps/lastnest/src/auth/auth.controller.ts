import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { LoginUserDTO } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: CreateUserDTO) {
    return await this.authService.signup(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDTO) {
    return await this.authService.login(data.email, data.password);
  }
}
