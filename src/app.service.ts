/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import type editly from 'editly';

const getEditly = async (): Promise<typeof editly> => {
  const lib = await (eval(`import('editly')`) as Promise<{
    default: typeof import('editly');
  }>);
  return lib.default;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async genVideo(): Promise<void> {
    try {
      const editly = await getEditly();
      console.log('generating video using editly');
      await editly({
        outPath: 'tmp/out.mp4',
        width: 1280,
        height: 720,
        fps: 30,
        defaults: {
          // You can pass any ffmpeg supported option here
          // https://ffmpeg.org/ffmpeg.html#toc-Options
        },
        clips: [
          {
            duration: 5,
            layers: [
              {
                type: 'video',
                path:
                  'https://d1r0cf5836ptgd.cloudfront.net/public%2Firfan%40trolio.com%2F6472d56e805c3bffc3cded33%2Fvideos%2FYra_kbKljX%2Fbig_buck_bunny_720p_1mb.mp4',
              },
            ],
          },
          {
            duration: 5,
            layers: [
              {
                type: 'video',
                path:
                  'https://d1r0cf5836ptgd.cloudfront.net/public%2Firfan%40trolio.com%2F6472d56e805c3bffc3cded33%2Fvideos%2F0JBBHZW1L3%2Fforest.mp4',
              },
            ],
          },
        ],
        // Testing options:
        enableFfmpegLog: false,
        verbose: false,
        fast: false,
      });
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}
