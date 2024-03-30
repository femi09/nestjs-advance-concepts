import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommentsQuery } from '../implementations/getComments.query';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from '../../comment.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsQuery) {
    const { postId } = query;
    if (postId) {
      return this.commentsRepository.find({
        where: {
          post: {
            id: postId,
          },
        },
      });
    }
    return this.commentsRepository.find();
  }
}
