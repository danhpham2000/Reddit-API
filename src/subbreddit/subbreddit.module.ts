import { Module } from '@nestjs/common';
import { SubbredditService } from './subbreddit.service';

@Module({
  providers: [SubbredditService],
})
export class SubbredditModule {}
