import parseFiles from './modules/parseFiles';
import parseDiffs from './modules/parseDifferences';
import renderDiffs from './modules/renderDifferences';

const gendiff = (pathToFile1, pathToFile2) => {
  const firstConfig = parseFiles(pathToFile1, pathToFile2).firstConf;
  const secondConfig = parseFiles(pathToFile1, pathToFile2).secondConf;

  const result = parseDiffs(firstConfig, secondConfig);

  return renderDiffs(result);
};

export default gendiff;
