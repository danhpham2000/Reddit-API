import { Module } from '@nestjs/common';
import { SubbredditService } from './subbreddit.service';
import { SubbredditController } from './subbreddit.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubbredditController],
  providers: [SubbredditService],
})
export class SubbredditModule {}
