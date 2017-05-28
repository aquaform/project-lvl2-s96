import fs from 'fs';
import path from 'path';
import getParser from './parsersList';
import buildAstOfDiffs from './buildAstOfDiffs';
import renderFromAstOfDiffs from './renderDiffs';

const getExt = pathToFile => path.extname(pathToFile);

const readFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default(pathToFile1, pathToFile2, format = 'tree') => {
  const firstFileData = readFile(pathToFile1);
  const firstFileExt = getExt(pathToFile1);
  const secondFileData = readFile(pathToFile2);
  const secondFileExt = getExt(pathToFile2);
  const firstConfig = getParser(firstFileExt)(firstFileData);
  const secondConfig = getParser(secondFileExt)(secondFileData);
  const astOfDiffs = buildAstOfDiffs(firstConfig, secondConfig);
  return renderFromAstOfDiffs(format)(astOfDiffs);
};
