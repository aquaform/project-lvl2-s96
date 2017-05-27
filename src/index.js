import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsersList';

const generateDiffs = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const unionKeys = _.union(firstConfigKeys, secondConfigKeys);
  console.log(_.isPlainObject(firstConfig));
  const result = unionKeys.map((key) => {
    if (firstConfig[key] === secondConfig[key]) {
      return `  ${key}: ${firstConfig[key]}`;
    } else if (secondConfig[key] === undefined) {
      return `- ${key}: ${firstConfig[key]}`;
    } else if (firstConfig[key] === undefined) {
      return `+ ${key}: ${secondConfig[key]}`;
    }
    return [`+ ${key}: ${secondConfig[key]}`, `- ${key}: ${firstConfig[key]}`];
  });
  return `{\n${_.flatten(result).join('\n')}\n}`;
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
