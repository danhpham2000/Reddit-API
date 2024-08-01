import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post';

@Injectable()
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Heelo',
      description: 'Jello',
      createdAt: Date.now(),
      upVote: 0,
    },
    {
      id: 2,
      title: 'Hello 2',
      description: 'Hello 2',
      createdAt: Date.now(),
      upVote: 0,
    },
  ];

  async findAllPosts(): Promise<Post[]> {
    return this.posts;
  }

  async findPostById(id: number): Promise<Post> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new Error('Post not found!');
    }
    return post;
  }

  async createPost(newPost: Post): Promise<void> {
    newPost.id = this.posts.length + 1;
    newPost.upVote = 0;
    newPost.createdAt = Date.now();
    await this.posts.push(newPost);
  }

  async updatePost(id: number, post: Post): Promise<Post> {
    const currentPost = await this.posts.find((p) => p.id === id);
    if (!currentPost) {
      throw new Error('Post not found!');
    }
    currentPost.title = post.title;
    currentPost.description = post.description;
    return currentPost;
  }

  async deletePost(id: number): Promise<void> {
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}
