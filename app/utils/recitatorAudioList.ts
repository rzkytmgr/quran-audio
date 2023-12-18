import fs from 'node:fs/promises';
import path from 'node:path';

export const recitatorAudioList = async (recitatorAudioPath: string) => {
  const recitatorAudioDirectoryFiles = await fs.readdir(path.resolve('app', 'public', recitatorAudioPath));
  return recitatorAudioDirectoryFiles;
};
