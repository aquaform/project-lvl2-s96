import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parserList';

const generateDiffs = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const unionKeys = _.union(firstConfigKeys, secondConfigKeys);
  const result = unionKeys.reduce((acc, key) => {
    if (firstConfig[key] === secondConfig[key]) {
      return `  ${acc}${key}: ${firstConfig[key]}\n`;
    } else if (secondConfig[key] === undefined) {
      return `${acc}- ${key}: ${firstConfig[key]}\n`;
    } else if (firstConfig[key] === undefined) {
      return `${acc}+ ${key}: ${secondConfig[key]}\n`;
    }
    return `${acc}+ ${key}: ${secondConfig[key]}\n- ${key}: ${firstConfig[key]}\n`;
  }
  , '');
  return `{\n${result}}`;
};

const getExt = pathToFile => path.extname(pathToFile);

const readFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export default(pathToFile1, pathToFile2) => {
  const firstFileData = readFile(pathToFile1);
  const firstFileExt = getExt(pathToFile1);
  const secondFileData = readFile(pathToFile2);
  const secondFileExt = getExt(pathToFile2);
  const firstConfig = getParser(firstFileExt)(firstFileData);
  const secondConfig = getParser(secondFileExt)(secondFileData);

  return generateDiffs(firstConfig, secondConfig);
};
