import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { plainToInstance } from 'class-transformer';
import { PostResponseDto } from './dto/post-response.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    let findAll = this.postsService.findAll();
    return plainToInstance(PostResponseDto, findAll);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);

    return plainToInstance(PostResponseDto, {
      id: post.id,
      title: post.title,
      content: post.content,
      username: post.author.name,//dto에 없는 건데 나옴..
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.postsService.update(+id, updatePostDto);

    return plainToInstance(PostResponseDto, {
      id: post.id,
      title: post.title,
      content: post.content,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
