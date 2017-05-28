const renderAstToPlain = (ast, host = '') => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changed':
        if (host === '') {
          return `Property '${node.key}' was updated. From '${node.beforeValue}' to '${node.afterValue}'`;
        }
        return `Property '${host}.${node.key}' was updated. From '${node.beforeValue}' to '${node.afterValue}'`;
      case 'added':
        if (node.children.length > 0) {
          if (host === '') {
            return `Property '${node.key}' was added with complex value`;
          }
          return `Property '${host}.${node.key}' was added with complex value`;
        }
        if (host === '') {
          return `Property '${node.key}' was added with value: '${node.afterValue}'`;
        }
        return `Property '${host}.${node.key}' was added with value: '${node.afterValue}'`;
      case 'removed':
        if (host === '') {
          return `Property '${node.key}' was removed`;
        }
        return `Property '${host}.${node.key}' was removed`;
      case 'unchanged':
        if (host === '' && node.children.length > 0) {
          return renderAstToPlain(node.children, node.key);
        }
        return null;
      default:
    }
    return null;
  });
  return result.filter(item => item !== null).join('\n');
};

export default renderAstToPlain;
