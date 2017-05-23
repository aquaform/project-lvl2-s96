import fs from 'fs';
import * as _ from 'lodash';

const makeDiff = (status, key, value) => {
  const result = {};
  result.status = status;
  result[key] = value;
  return result;
};

const parseFiles = (pathToFile1, pathToFile2) => {
  const firstConfig = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));
  return { firstConf: firstConfig, secondConf: secondConfig };
};

export const findDiffs = (firstConfig, secondConfig) => {
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

const renderDiff = diff => Object.keys(diff).reduce((acc, key) => {
  const value = `${key}` === 'status' ? `${acc} ${diff[key]}` : ` ${acc} ${key}: ${diff[key]}`;
  return value;
}, '');

const renderDiffs = diffs => diffs.reduce((acc, diff) => `${acc} ${renderDiff(diff)}\n`, '');

export const gendiff = (pathToFile1, pathToFile2) => {
  const firstConfig = parseFiles(pathToFile1, pathToFile2).firstConf;
  const secondConfig = parseFiles(pathToFile1, pathToFile2).secondConf;

  const result = findDiffs(firstConfig, secondConfig);

  return renderDiffs(result);
};
