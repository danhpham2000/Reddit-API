import {
  Body,
  Controller,
  Delete,
  Get,
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
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
  ) {
    return await this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return await this.postService.deletePost(+id);
  }

  @Post(':srId/posts/:id/:vote')
  async votePost(
    @Param('srId') srId: number,
    @Param('id') id: number,
    @Param('vote') vote: string,
  ) {
    return await this.postService.votePost(+id, +srId, vote);
  }
}
