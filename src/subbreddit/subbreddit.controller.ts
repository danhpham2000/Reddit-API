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
import { SubbredditService } from './subbreddit.service';
import { CreateSubbredditDto, UpdateSubbredditDto } from 'src/post/dtos';

@Controller('sr')
export class SubbredditController {
  constructor(private subbredditService: SubbredditService) {}

  @Get()
  async findAllSubbreddits() {
    return await this.subbredditService.findAllSubbreddits();
  }

  @Get(':id')
  async findSubbredditById(@Param('id') id: number) {
    return await this.subbredditService.findSubbredditById(+id);
  }

  @Post()
  @HttpCode(201)
  async createSubbreddit(@Body() createSubbredditDto: CreateSubbredditDto) {
    return await this.subbredditService.createSubbreddit(createSubbredditDto);
  }

  @Put(':id')
  @HttpCode(204)
  async updateSubbreddit(
    @Param('id') id: number,
    @Body() updateSubbredditDto: UpdateSubbredditDto,
  ) {
    return await this.subbredditService.updateSubbreddit(
      +id,
      updateSubbredditDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteSubbreddit(@Param('id') id: number) {
    return await this.subbredditService.deleteSubbreddit(+id);
  }
}
