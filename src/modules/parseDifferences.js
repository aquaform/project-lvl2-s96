import * as _ from 'lodash';

const makeDiff = (status, key, value) => {
  const result = {};
  result.status = status;
  result[key] = value;
  return result;
};

export default (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const result = firstConfigKeys.reduce((acc, key) => {
    const newAcc = acc;
    if (secondConfig[key] !== undefined) {
      if (secondConfig[key] === firstConfig[key]) newAcc.push(makeDiff(' ', key, firstConfig[key]));
      else {
        newAcc.push(makeDiff('+', key, secondConfig[key]));
        newAcc.push(makeDiff('-', key, firstConfig[key]));
      }
    } else newAcc.push(makeDiff('-', key, firstConfig[key]));
    return newAcc;
  }
  , []);
  const newKeysInSecondConfig = _.difference(secondConfigKeys, firstConfigKeys);
  newKeysInSecondConfig.reduce((acc, key) => {
    const newAcc = acc;
    newAcc.push(makeDiff('+', key, secondConfig[key]));
    return newAcc;
  }, result);
  return result;
};
