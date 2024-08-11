import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CurrentUserDto } from 'src/post/dtos';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async register(user: User): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await this.prismaService.user.create({
      data: { name: user.name, email: user.email, password: hashedPassword },
    });
  }

  async login(user: CurrentUserDto): Promise<string> {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return 'You are logged in';
  }
}
