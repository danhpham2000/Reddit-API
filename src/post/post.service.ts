import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { SubbredditService } from 'src/subbreddit/subbreddit.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private subbredditService: SubbredditService,
  ) {}

  async findAllPosts(srId: number): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      where: { subbredditId: srId },
    });
  }

  async findPostById(id: number, srId: number): Promise<Post> {
    const post = this.prismaService.post.findUnique({
      where: { id: id, subbredditId: srId },
    });
    if (!post) {
      throw new Error('Post not found!');
    }
    return post;
  }

  async createPost(newPost: Post): Promise<void> {
    newPost.upVote = 0;
    newPost.createdAt = new Date(Date.now());
  }

  async updatePost(id: number, post: Post): Promise<Post> {
    const currentPost = await this.prismaService.post.update({
      where: { id },
      data: post,
    });
    if (!currentPost) {
      throw new Error('Post not found!');
    }
    return currentPost;
  }

  async deletePost(id: number): Promise<void> {
    await this.prismaService.post.delete({ where: { id } });
  }

  async votePost(srId: number, id: number, vote: string) {
    const currentPost = await this.prismaService.post.findFirst({
      where: { id: id, subbredditId: srId },
    });
    let numVote = currentPost.upVote;
    if (vote === 'upvote') {
      numVote += 1;
    } else if (vote === 'downvote') {
      numVote -= 1;
    }
    await this.prismaService.post.update({
      where: { id: id, subbredditId: srId },
      data: {
        upVote: numVote,
      },
    });
  }
}
