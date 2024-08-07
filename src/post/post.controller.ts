import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos';

@Controller('sr')
export class PostController {
  constructor(private postService: PostService) {}
  @Get(':srId/posts')
  async findAllPosts(@Param('srId') srId: number) {
    return await this.postService.findAllPosts(+srId);
  }

  @Get(':srId/posts/:id')
  async findPostById(@Param('id') id: number, @Param('srId') srId: number) {
    return await this.postService.findPostById(+id, +srId);
  }

  @Post(':srId/posts')
  @HttpCode(201)
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Put(':id')
  @HttpCode(204)
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
  ) {
    return await this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') id: number) {
    return await this.postService.deletePost(+id);
  }

  @Post(':srId/posts/:id/upvote')
  @HttpCode(204)
  async upvotePost(@Param('srId') srId: number, @Param('id') id: number) {
    return await this.postService.upVotePost(+id, +srId);
  }
}
