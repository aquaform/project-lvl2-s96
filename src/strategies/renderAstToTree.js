const renderAstToTree = (ast, indents = 2) => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changed':
        if (node.children.length === 0) {
          return `${' '.repeat(indents)}+ ${node.key}: ${node.afterValue}\n${' '.repeat(indents)}- ${node.key}: ${node.beforeValue}`;
        }
        return `${' '.repeat(indents)}+ ${node.key}: ${renderAstToTree(node.children, indents + 4)}`;
      case 'unchanged':
        if (node.children.length === 0) {
          return `${' '.repeat(indents)}  ${node.key}: ${node.afterValue}`;
        }
        return `${' '.repeat(indents)}  ${node.key}: ${renderAstToTree(node.children, indents + 4)}`;
      case 'removed':
        if (node.children.length === 0) {
          return `${' '.repeat(indents)}- ${node.key}: ${node.beforeValue}`;
        }
        return `${' '.repeat(indents)}- ${node.key}: ${renderAstToTree(node.children, indents + 4)}`;
      case 'added':
        if (node.children.length === 0) {
          return `${' '.repeat(indents)}+ ${node.key}: ${node.afterValue}`;
        }
        return `${' '.repeat(indents)}+ ${node.key}: ${renderAstToTree(node.children, indents + 4)}`;
      default:
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(indents - 2)}}`;
};

export default renderAstToTree;
