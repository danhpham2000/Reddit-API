import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CurrentUserDto, NewUserDto } from 'src/post/dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async register(newUser: NewUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    try {
      await this.prismaService.user.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken');
        }
      }
    }
  }

  async login(user: CurrentUserDto): Promise<any> {
    try {
      const currentUser = await this.prismaService.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!currentUser) {
        throw new ForbiddenException('Email does not found');
      }
      const isMatch = await bcrypt.compare(user.password, currentUser.password);
      if (!isMatch) {
        throw new ForbiddenException('Password is incorrect');
      }
      return { message: 'You are logged in' };
    } catch (error) {
      return error.message;
    }
  }
}
