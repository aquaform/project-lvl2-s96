const indentSize = '  ';

const renderAstToTree = (ast, indents = 1) => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changed':
        if (node.children.length === 0) {
          return `${indentSize.repeat(indents)}+ ${node.key}: ${node.afterValue}\n${indentSize.repeat(indents)}- ${node.key}: ${node.beforeValue}`;
        }
        return `${indentSize.repeat(indents)}+ ${node.key}: ${renderAstToTree(node.children, indents + 2)}`;
      case 'unchanged':
        if (node.children.length === 0) {
          return `${indentSize.repeat(indents)}  ${node.key}: ${node.afterValue}`;
        }
        return `${indentSize.repeat(indents)}  ${node.key}: ${renderAstToTree(node.children, indents + 2)}`;
      case 'removed':
        if (node.children.length === 0) {
          return `${indentSize.repeat(indents)}- ${node.key}: ${node.beforeValue}`;
        }
        return `${indentSize.repeat(indents)}- ${node.key}: ${renderAstToTree(node.children, indents + 2)}`;
      case 'added':
        if (node.children.length === 0) {
          return `${indentSize.repeat(indents)}+ ${node.key}: ${node.afterValue}`;
        }
        return `${indentSize.repeat(indents)}+ ${node.key}: ${renderAstToTree(node.children, indents + 2)}`;
      default:
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${indentSize.repeat(indents - 1)}}`;
};

export default renderAstToTree;
