import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PostsModule, DatabaseModule, UsersModule, AuthenticationModule, CategoriesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
