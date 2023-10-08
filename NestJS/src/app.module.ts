import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],//여길 순회
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
