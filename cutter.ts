import path from 'path';
import fs from 'node:fs';
import { recitators } from '@/recitators';
import { IRecitationSuraa } from '@/interfaces';
import { recitationCutter } from '@/lib/recitationCutter';
import { audioAyaaFilenameFormatter } from '@/helper/audioAyaaFilenameFormatter';


// audio cutter per aya function
const initializer = async () => {
  const currentDirectory = process.cwd();
  for (const [index, recitator] of recitators.entries()) {
    console.log('[', index + 1, ']', 'Recitator:', recitator.name, '(', recitator.map, ')');
    
    const recitationFileMapping = path.join(currentDirectory, 'mapping', recitator.map + '.json');
    if (!fs.existsSync(recitationFileMapping))
      continue;

    const recitationMapping: IRecitationSuraa[] = JSON.parse(fs.readFileSync(recitationFileMapping, 'utf-8'));
    for (const suraa of recitationMapping) {
      console.log('@:', suraa.id, 'cut to', suraa.schema.length, 'verses');
      const audioPath = path.join(currentDirectory, 'public', recitator.dir);

      for (const ayaa of suraa.schema) {
        recitationCutter({
          fullAudiopath: path.join(audioPath, 'suraa_' + suraa.id + '.mp3'),
          ayaaFullAudioPath: audioAyaaFilenameFormatter(suraa.id, ayaa.i, audioPath),
          startTime: ayaa.s,
          endTime: ayaa.e
        });
      }
    }
  }
};

initializer();