import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import PostsSearchService from './postsSearch.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 120000,
      max: 100,
    }),
    TypeOrmModule.forFeature([Post]),
    SearchModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
