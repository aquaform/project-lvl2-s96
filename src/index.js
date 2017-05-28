import fs from 'fs';
import path from 'path';
import getParser from './parsersList';
import generateAstOfDiffs from './buildAstOfDiffs';
import renderFromAstOfDiffs from './renderFromAstOfDiffs';

const getExt = pathToFile => path.extname(pathToFile);

const readFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default(pathToFile1, pathToFile2) => {
  const firstFileData = readFile(pathToFile1);
  const firstFileExt = getExt(pathToFile1);
  const secondFileData = readFile(pathToFile2);
  const secondFileExt = getExt(pathToFile2);
  const firstConfig = getParser(firstFileExt)(firstFileData);
  const secondConfig = getParser(secondFileExt)(secondFileData);
  const astOfDiffs = generateAstOfDiffs(firstConfig, secondConfig);

  return renderFromAstOfDiffs(astOfDiffs);
};
