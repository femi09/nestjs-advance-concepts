import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import PostsSearchService from './postsSearch.service';
import { RedisOptions } from 'src/config/app-options.constant';
@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    TypeOrmModule.forFeature([Post]),
    SearchModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
