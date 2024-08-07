import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubbredditService } from 'src/subbreddit/subbreddit.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, SubbredditService],
})
export class PostModule {}
