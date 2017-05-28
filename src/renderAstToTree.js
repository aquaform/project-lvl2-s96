const renderAstToTree = (ast, indents = '') => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changed':
        if (node.children.length === 0) {
          return `  ${indents}+ ${node.key}: ${node.afterValue}\n  ${indents}- ${node.key}: ${node.beforeValue}`;
        }
        return `  ${indents}+ ${node.key}: ${renderAstToTree(node.children, `    ${indents}`)}`;
      case 'unchanged':
        if (node.children.length === 0) {
          return `  ${indents}  ${node.key}: ${node.afterValue}`;
        }
        return `  ${indents}  ${node.key}: ${renderAstToTree(node.children, `    ${indents}`)}`;
      case 'removed':
        if (node.children.length === 0) {
          return `  ${indents}- ${node.key}: ${node.beforeValue}`;
        }
        return `  ${indents}- ${node.key}: ${renderAstToTree(node.children, `    ${indents}`)}`;
      case 'added':
        if (node.children.length === 0) {
          return `  ${indents}+ ${node.key}: ${node.afterValue}`;
        }
        return `  ${indents}+ ${node.key}: ${renderAstToTree(node.children, `    ${indents}`)}`;
      default:
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${indents}}`;
};

export default renderAstToTree;
