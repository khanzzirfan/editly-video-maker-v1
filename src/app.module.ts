import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FfmpegModule } from './FFmpeg/FFmpeg.module';

@Module({
  imports: [FfmpegModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
