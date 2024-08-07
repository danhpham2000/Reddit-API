import { Injectable } from '@nestjs/common';
import { Subbreddit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubbredditService {
  constructor(private prismaService: PrismaService) {}

  async findAllSubbreddits(): Promise<Subbreddit[]> {
    return await this.prismaService.subbreddit.findMany();
  }

  async findSubbredditById(id: number): Promise<Subbreddit> {
    const subbreddit = await this.prismaService.subbreddit.findUnique({
      where: { id },
    });
    if (!subbreddit) {
      throw new Error('Cannot find this subbreddit with this');
    }
    return subbreddit;
  }

  async createSubbreddit(subbreddit: Subbreddit): Promise<void> {
    subbreddit.createdAt = new Date(Date.now());
    await this.prismaService.subbreddit.create({
      data: subbreddit,
    });
  }

  async updateSubbreddit(id: number, newSubbreddit: Subbreddit): Promise<void> {
    await this.prismaService.subbreddit.update({
      where: { id },
      data: newSubbreddit,
    });
  }

  async deleteSubbreddit(id: number): Promise<void> {
    await this.prismaService.subbreddit.delete({ where: { id } });
  }
}
