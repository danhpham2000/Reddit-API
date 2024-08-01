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

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  async findAllPosts() {
    return await this.postService.findAllPosts();
  }

  @Get(':id')
  async findPostById(@Param('id') id: number) {
    return await this.postService.findPostById(+id);
  }

  @Post()
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
}
