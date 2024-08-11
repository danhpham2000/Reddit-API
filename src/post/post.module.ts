import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubbredditModule } from 'src/subbreddit/subbreddit.module';

@Module({
  imports: [PrismaModule, SubbredditModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
