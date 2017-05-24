import readData from './readData';
import parseDiffs from './parseDifferences';
import renderDiffs from './renderDifferences';

const gendiff = (pathToFile1, pathToFile2) => {
  const firstConfig = readData(pathToFile1, pathToFile2).firstConf;
  const secondConfig = readData(pathToFile1, pathToFile2).secondConf;

  const result = parseDiffs(firstConfig, secondConfig);

  return renderDiffs(result);
};

export default gendiff;
