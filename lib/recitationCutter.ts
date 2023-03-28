import Ffmpeg from 'fluent-ffmpeg';
import path from 'path';

export const recitationCutter = (data : { fullAudiopath: string; ayaaFullAudioPath: string; startTime: string; endTime: string}) => {
  return new Promise((resolve, reject) => {
    Ffmpeg(data.fullAudiopath)
    .inputOptions([
      '-ss ' + data.startTime,
      '-to ' + data.endTime,
    ])
    .audioCodec('copy')
    .output(data.ayaaFullAudioPath)
    .on('error', reject)
    .on('end', () => resolve(true))
    .run();
  });
};