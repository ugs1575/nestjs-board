// post-response.dto.ts
import { Expose } from 'class-transformer';

export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  authorId: number;
}