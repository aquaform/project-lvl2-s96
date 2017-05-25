import fs from 'fs';
import jsYaml from 'js-yaml';
import ini from 'ini';

class JsonFile {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
  }
  getData() {
    return JSON.parse(fs.readFileSync(this.pathToFile, 'utf8'));
  }
}

class YmlFile {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
  }
  getData() {
    return jsYaml.safeLoad(fs.readFileSync(this.pathToFile, 'utf8'));
  }
}

class IniFile {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
  }
  getData() {
    return ini.parse(fs.readFileSync(this.pathToFile, 'utf8'));
  }
}

export default (pathToFile) => {
  switch (pathToFile.split('.').pop()) {
    case 'json':
      return new JsonFile(pathToFile);
    case 'yml':
      return new YmlFile(pathToFile);
    case 'ini':
      return new IniFile(pathToFile);
    default:
      return {};
  }
};
