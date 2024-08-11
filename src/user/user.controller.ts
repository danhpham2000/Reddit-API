import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CurrentUserDto, NewUserDto } from 'src/post/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userDto: NewUserDto) {
    return await this.userService.register(userDto);
  }

  async login(@Body() userDto: CurrentUserDto) {}
}
