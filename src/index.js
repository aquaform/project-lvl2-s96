import _ from 'lodash';
import readData from './readData';

const generateDiffs = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const unionKeys = _.union(firstConfigKeys, secondConfigKeys);
  const result = unionKeys.reduce((acc, key) => {
    if (firstConfig[key] === secondConfig[key]) return `  ${acc}${key}: ${firstConfig[key]}\n`;
    if (secondConfig[key] === undefined) return `${acc}- ${key}: ${firstConfig[key]}\n`;
    if (firstConfig[key] === undefined) return `${acc}+ ${key}: ${secondConfig[key]}\n`;
    return `${acc}+ ${key}: ${secondConfig[key]}\n- ${key}: ${firstConfig[key]}\n`;
  }
  , '');
  return `{\n${result}}`;
};

export default(pathToFile1, pathToFile2) => {
  const firstConfig = readData(pathToFile1);
  const secondConfig = readData(pathToFile2);
  console.log(firstConfig);
  return generateDiffs(firstConfig.getData(), secondConfig.getData());
};
