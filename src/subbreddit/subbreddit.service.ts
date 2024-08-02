import { Injectable } from '@nestjs/common';
import { Subbreddit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubbredditService {
  constructor(private prismaService: PrismaService) {}

  async findAllSubbreddits(): Promise<Subbreddit[]> {
    return await this.prismaService.subbreddit.findMany();
  }

  async findSubbredditById(id: number) {
    const subbreddit = this.prismaService.subbreddit.findUnique({
      where: { id },
    });
    if (!subbreddit) {
      throw new Error('Can not find this subbreddit');
    }
    return subbreddit;
  }

  async createSubbreddit() {}
}
