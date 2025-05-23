import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    //todo : find user
    const { userId, ...rest } = createPostDto;

    return this.postRepository.save({
      ...rest,              // title, content 전개
      author: { id: userId } // 관계 필드는 수동 맵핑
    });
  }

  async findAll() {
    return await this.postRepository.find({
      relations: ["author"]
    });
  }

  async findOne(id: number) {
    try {
      return await this.postRepository.findOneOrFail({
        where: { id },
        relations: ["author"]
      });
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    try {
      const post = await this.postRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    const post = await this.postRepository.findOne(id);

    return await this.postRepository.save({
        ...post,
        ...updatePostDto,
    });
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}
