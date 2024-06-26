import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { PrivateFilesModule } from './private-files/private-files.module';
import { SearchModule } from './search/search.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostsModule, DatabaseModule, UsersModule, AuthenticationModule, CategoriesModule, FilesModule, PrivateFilesModule, SearchModule, SubscribersModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
