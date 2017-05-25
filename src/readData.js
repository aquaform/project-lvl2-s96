import fs from 'fs';
import jsYaml from 'js-yaml';
import ini from 'ini';

export default (pathToFile) => {
  switch (pathToFile.split('.').pop()) {
    case 'json':
      return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
    case 'yml':
      return jsYaml.safeLoad(fs.readFileSync(pathToFile, 'utf8'));
    case 'ini':
      return ini.parse(fs.readFileSync(pathToFile, 'utf8'));
    default:
      return {};
  }
};
