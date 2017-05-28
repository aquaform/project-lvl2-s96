import _ from 'lodash';


const buildNode = ({ key, type, afterValue, beforeValue, children = [] }) => {
  const result = { key, type, beforeValue, afterValue, children };
  return result;
};

const generateDiffs = (beforeConfig, afterConfig) => {
  const beforeConfigKeys = Object.keys(beforeConfig);
  const afterConfigKeys = Object.keys(afterConfig);
  const unionKeys = _.union(beforeConfigKeys, afterConfigKeys);
  const result = unionKeys.map((key) => {
    if (beforeConfig[key] === undefined) {
      if (_.isPlainObject(afterConfig[key])) {
        return buildNode({ key, type: 'added', children: generateDiffs(afterConfig[key], afterConfig[key]) });
      }
      return buildNode({ key, type: 'added', afterValue: afterConfig[key] });
    } else if (afterConfig[key] === undefined) {
      if (_.isPlainObject(beforeConfig[key])) {
        return buildNode({ key, type: 'removed', children: generateDiffs(beforeConfig[key], beforeConfig[key]) });
      }
      return buildNode({ key, type: 'removed', beforeValue: beforeConfig[key] });
    }

    if (!_.isPlainObject(beforeConfig[key]) && !_.isPlainObject(afterConfig[key])) {
      if (beforeConfig[key] === afterConfig[key]) {
        return buildNode({ key, type: 'unchanged', beforeValue: beforeConfig[key], afterValue: afterConfig[key] });
      }
      return buildNode({ key, type: 'changed', beforeValue: beforeConfig[key], afterValue: afterConfig[key] });
    }
    return buildNode({ key, type: 'unchanged', children: generateDiffs(beforeConfig[key], afterConfig[key]) });
  });
  return result;
};

export default generateDiffs;
