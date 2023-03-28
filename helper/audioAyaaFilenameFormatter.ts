import path from 'path';

export const audioAyaaFilenameFormatter = (suraaNumber: number, ayaaNumber: number, recitationPath: string): string => {
  const suraaNumberFormatted = suraaNumber < 100 ? suraaNumber.toString().padStart(3, '0') : suraaNumber.toString();
  const ayaaNumberFormatted = ayaaNumber < 100 ? ayaaNumber.toString().padStart(3, '0') : ayaaNumber.toString();
  return path.join(recitationPath, ayaaNumberFormatted + suraaNumberFormatted + '.mp3');
};