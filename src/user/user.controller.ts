import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUserDto, NewUserDto } from 'src/post/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: NewUserDto) {
    return await this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: CurrentUserDto) {
    return await this.userService.login(userDto);
  }
}
