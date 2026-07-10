import { alternateFilenamePattern } from './regexPattern';

export default function getFileDetails(filename) {
  const CM_TO_M = 100;
  const alternateFilename = alternateFilenamePattern(filename);
  const splittedFilename = filename.split('_');
  const printSizeIndex = alternateFilename ? 1 : 2;
  const printSize = splittedFilename[printSizeIndex].split('x');
  const isNumber = alternateFilename
    ? false
    : Number(splittedFilename[4].replace('x', ''));
  const printCount =
    alternateFilename || typeof isNumber !== 'number' ? 1 : isNumber;
  return {
    filename: alternateFilename
      ? splittedFilename[0]
      : `${splittedFilename[0]}_${splittedFilename[1]}_${splittedFilename[3]}`,
    printWidth: printSize[0] / CM_TO_M,
    printHeight: printSize[1] / CM_TO_M,
    printCount: printCount,
  };
}
