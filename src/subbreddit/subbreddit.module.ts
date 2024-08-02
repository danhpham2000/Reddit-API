import { Module } from '@nestjs/common';
import { SubbredditService } from './subbreddit.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubbredditController } from './subbreddit.controller';

@Module({
  controllers: [SubbredditController],
  providers: [SubbredditService, PrismaService],
})
export class SubbredditModule {}
