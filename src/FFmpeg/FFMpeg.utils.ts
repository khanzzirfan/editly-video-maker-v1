import ffmpeg from 'fluent-ffmpeg';
import os from 'os';
// import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';

if (os.platform() === 'win32') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ffprobePath = require('@ffprobe-installer/ffprobe').path;
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
} else {
  // const ffmpegPath = './bin/ffmpeg/ffmpeg';
  ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
  ffmpeg.setFfprobePath(process.env.FFPROBE_PATH);
}
// import { path as ffprobePath } from '@ffprobe-installer/ffprobe';

export default ffmpeg;
