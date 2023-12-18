import { Router, Request, Response } from 'express';
import { responseMessages as ResponseMessages } from '@/constant';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IRecitators } from '@/interface';
import { recitatorAudioList } from '@/utils';
import recitator from '@/data/recitators.json';

const router = Router();
const globalRecitators = [...recitator];

router.get('/recitator', (req: Request, res: Response) => {
  const recitators: readonly IRecitators[] = Object.freeze([...globalRecitators]);
  return res.status(200).json({
    header: {
      code: StatusCodes.OK,
      status: ReasonPhrases.OK,
    },
    body: {
      message: ResponseMessages.SUCCESSFUL,
      data: recitators,
    },
  });
});

router.get('/recitator/:id(\\d+)', async (req: Request, res: Response) => {
  const recitators: readonly IRecitators[] = Object.freeze([...globalRecitators]);
  const recitatorResult: IRecitators | undefined = recitators.find((recitator) => recitator.id === Number(req.params.id));
  let audioSurahSequence: number[] = [];

  if (recitatorResult) {
    const recitatorAudios = await recitatorAudioList(recitatorResult.path);
    const recitatorSurah = recitatorAudios
      .filter((audio) => audio.startsWith('SU') && audio.endsWith('.mp3'))
      .map((audio) => Number(audio.slice(2).slice(0, 3)))
      .sort((a, b) => a - b);
    audioSurahSequence = recitatorSurah;
  }

  return res.status(200).json({
    header: {
      code: StatusCodes.OK,
      status: ReasonPhrases.OK,
    },
    body: {
      message: recitatorResult ? ResponseMessages.SUCCESSFUL : ResponseMessages.SPESIFIC_NOT_FOUND,
      data: recitatorResult
        ? {
            ...recitatorResult,
            audioSurahSequence,
          }
        : null,
    },
  });
});

export { router };
