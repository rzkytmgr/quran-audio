import path from 'path';
import fs from 'node:fs';
import { recitators } from '@/recitators';
import { IRecitationMap } from '@/interfaces';
import { recitationCutter } from '@/lib/recitationCutter';
import { audioAyaaFilenameFormatter } from '@/helper/audioAyaaFilenameFormatter';


// audio cutter per aya function
const initializer = async () => {
  const currentWorkingDirectory = process.cwd();
  
  for (const [index, recitator] of recitators.entries()) {
    console.log(index + 1, 'Recitator:', recitator.name, '(', recitator.map, ')');
    const mappingFilepath = path.join(currentWorkingDirectory, 'mapping', recitator.map + '.json');

    if (!fs.existsSync(mappingFilepath))
      continue;

    const audioCuttingMap: IRecitationMap = JSON.parse(fs.readFileSync(mappingFilepath, 'utf-8'));
    
    for (const suraa of audioCuttingMap.suraa) {
      console.log('[', suraa.id, ']', 'Cutting total', suraa.schema.length, 'ayaa in', audioCuttingMap.directory);
      const fullSuraaAudio = path.join(currentWorkingDirectory, 'public', audioCuttingMap.directory, 'suraa_' + suraa.id + '.mp3');

      for (const ayaa of suraa.schema) {
        try {
          await recitationCutter({
            fullAudiopath: fullSuraaAudio,
            ayaaFullAudioPath: audioAyaaFilenameFormatter(suraa.id, ayaa.i, path.dirname(fullSuraaAudio)),
            startTime: ayaa.s,
            endTime: ayaa.e,
          });
        } catch (err) {
          console.log('[', suraa.id , ':', ayaa.i,'] Error:', err);
          continue;
        }
      }
    }
  }
};

initializer();