import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FfmpegService } from './FFmpeg.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [FfmpegService],
  exports: [FfmpegService],
})
export class FfmpegModule {}
