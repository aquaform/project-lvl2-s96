import _ from 'lodash';

const makeDiff = (status, key, value) => {
  const result = {};
  result.status = status;
  result[key] = value;
  return result;
};

export default (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const unionKeys = _.union(firstConfigKeys, secondConfigKeys);

  return unionKeys.reduce((acc, key) => {
    if (firstConfig[key] === secondConfig[key]) return [...acc, makeDiff(' ', key, firstConfig[key])];
    if (secondConfig[key] === undefined) return [...acc, makeDiff('-', key, firstConfig[key])];
    if (firstConfig[key] === undefined) return [...acc, makeDiff('+', key, secondConfig[key])];

    return [...acc, makeDiff('+', key, secondConfig[key]), makeDiff('-', key, firstConfig[key])];
  }
  , []);
};
