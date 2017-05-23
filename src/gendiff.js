import fs from 'fs';
import * as _ from 'lodash';

export default (pathToFile1, pathToFile2) => {
  const firstConfig = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));

  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);

  const result = firstConfigKeys.reduce((acc, key) => {
    const newAcc = acc;
    if (secondConfig[key] !== undefined) {
      if (secondConfig[key] === firstConfig[key]) {
        const value = {};
        value.status = '=';
        value[key] = firstConfig[key];
        newAcc.push(value);
      } else {
        const valueAdd = {};
        valueAdd.status = '+';
        valueAdd[key] = secondConfig[key];
        newAcc.push(valueAdd);
        const valueRem = {};
        valueRem.status = '-';
        valueRem[key] = firstConfig[key];
        newAcc.push(valueRem);
      }
    } else {
      const valueRem = {};
      valueRem.status = '-';
      valueRem[key] = firstConfig[key];
      newAcc.push(valueRem);
    }
    return newAcc;
  }
  , []);

  const newKeysInSecondConfig = _.difference(secondConfigKeys, firstConfigKeys);
  newKeysInSecondConfig.reduce((acc, key) => {
    const newAcc = acc;
    const value = {};
    value.status = '+';
    value[key] = secondConfig[key];
    newAcc.push(value);
    return newAcc;
  }, result);


  console.log(result);
};
