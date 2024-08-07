import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

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
    const currentSubbreddit = await this.prismaService.subbreddit.findUnique({
      where: { id: newPost.subbredditId },
    });
    if (!currentSubbreddit) {
      throw new Error('There is no subbreddit with that id');
    }
    newPost.subbredditId = currentSubbreddit.id;
    await this.prismaService.post.create({
      data: newPost,
    });
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

  async upVotePost(srId: number, id: number) {
    const currentPost = await this.prismaService.post.findUnique({
      where: { id },
    });
    const numVote = currentPost.upVote;
    await this.prismaService.post.update({
      where: { id: id, subbredditId: srId },
      data: {
        upVote: numVote + 1,
      },
    });
  }
}
