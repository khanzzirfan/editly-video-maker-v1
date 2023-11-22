import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ffmpeg from './FFMpeg.utils';

@Injectable()
export class FfmpegService {
  private readonly isDev: boolean;
  private readonly logger = new Logger(FfmpegService.name);
  constructor(private readonly configService: ConfigService) {
    this.isDev = this.configService.get<boolean>('isDevelopment');
  }

  async generateThumbs(filePath, fileName, outputpath) {
    this.logger.debug('running ffmpeg process');
    /// try 2
    // const command =
    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        // .output(passthroughStream, { end: true })
        .outputOptions(
          '-frames',
          '1', // Capture just one frame of the video
        )
        // .format('mp4');
        .seekInput('00:01.000')
        .on('end', function () {
          this.logger.debug('Screenshot taken');
          resolve(null);
          return null;
        })
        .on('error', (err) => {
          return reject(new Error(err));
        })
        // .pipe(outputStream, { end: true })
        .save(outputpath)
        .run();
    });
  }

  async getMetadata(filePath) {
    this.logger.debug('get video metadata');
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, function (err, metadata) {
        if (err) {
          return reject(new Error(err));
        }
        console.log(metadata);
        const { streams } = metadata;
        const firstStream =
          (Array.isArray(streams) && streams.length > 0 && streams[0]) || {};
        const { height, width, duration } = firstStream;
        return resolve({ duration, height, width });
      });
    });
  }

  async generateThumbsPerSeconds(filePath, fileName, outputpath, second = 10) {
    this.logger.debug('running ffmpeg process');
    /// try 2
    // const command =
    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .output(outputpath)
        // .output(passthroughStream, { end: true })
        .outputOptions('-q:v', '2', '-vf', `fps=1/${second}`)
        // .format('mp4');
        .on('end', function () {
          this.logger.debug('Screenshot taken');
          resolve(null);
          return null;
        })
        .on('error', (err) => {
          return reject(new Error(err));
        })
        // .pipe(outputStream, { end: true })
        // .save(outputpath)
        .run();
    });
  }
}
