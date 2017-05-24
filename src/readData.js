import fs from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';

const getExtension = pathToFile => pathToFile.split('.').pop();

const readFileData = (pathToFile) => {
  const result = {};
  switch (getExtension(pathToFile)) {
    case 'json':
      result.conf = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
      break;
    case 'yml':
      result.conf = jsyaml.safeLoad(fs.readFileSync(pathToFile, 'utf8'));
      break;
    case 'ini':
      result.conf = ini.parse(fs.readFileSync(pathToFile, 'utf8'));
      break;
    default:
  }
  return result.conf;
};

export default (pathToFile1, pathToFile2) => {
  const result = {};
  result.firstConf = readFileData(pathToFile1);
  result.secondConf = readFileData(pathToFile2);
  return result;
};
