import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const firstConfig = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));
  return { firstConf: firstConfig, secondConf: secondConfig };
};
