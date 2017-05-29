const indentSize = '  ';

const renderAstToTree = (ast, indents = 1) => {
  const newIndentSize = indentSize.repeat(indents);
  const newIndents = indents + 2;

  const result = ast.map((node) => {
    switch (node.type) {
      case 'changed':
        if (node.children.length === 0) {
          return `${newIndentSize}+ ${node.key}: ${node.afterValue}\n${newIndentSize}- ${node.key}: ${node.beforeValue}`;
        }
        return `${newIndentSize}+ ${node.key}: ${renderAstToTree(node.children, newIndents)}`;
      case 'unchanged':
        if (node.children.length === 0) {
          return `${newIndentSize}  ${node.key}: ${node.afterValue}`;
        }
        return `${newIndentSize}  ${node.key}: ${renderAstToTree(node.children, newIndents)}`;
      case 'removed':
        if (node.children.length === 0) {
          return `${newIndentSize}- ${node.key}: ${node.beforeValue}`;
        }
        return `${newIndentSize}- ${node.key}: ${renderAstToTree(node.children, newIndents)}`;
      case 'added':
        if (node.children.length === 0) {
          return `${newIndentSize}+ ${node.key}: ${node.afterValue}`;
        }
        return `${newIndentSize}+ ${node.key}: ${renderAstToTree(node.children, newIndents)}`;
      default:
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${indentSize.repeat(indents - 1)}}`;
};

export default renderAstToTree;
