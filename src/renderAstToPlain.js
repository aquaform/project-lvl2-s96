const renderAstToPlain = (ast, host = '') => {
  const result = ast.map((node) => {
    switch (node[1]) {
      case 'changed':
        if (host === '') {
          return `Property '${node[0]}' was updated. From '${node[2]}' to '${node[3]}'`;
        }
        return `Property '${host}.${node[0]}' was updated. From '${node[2]}' to '${node[3]}'`;
      case 'added':
        if (node[4].length > 0) {
          if (host === '') {
            return `Property '${node[0]}' was added with complex value`;
          }
          return `Property '${host}.${node[0]}' was added with complex value`;
        }
        if (host === '') {
          return `Property '${node[0]}' was added with value: '${node[3]}'`;
        }
        return `Property '${host}.${node[0]}' was added with value: '${node[3]}'`;
      case 'removed':
        if (host === '') {
          return `Property '${node[0]}' was removed`;
        }
        return `Property '${host}.${node[0]}' was removed`;
      case 'unchanged':
        if (host === '' && node[4].length > 0) {
          return renderAstToPlain(node[4], node[0]);
        }
        return null;
      default:
    }
    return null;
  });
  return result.filter(item => item !== null).join('\n');
};

export default renderAstToPlain;
