const renderAstToTree = (ast, indents = '') => {
  const result = ast.map((node) => {
    switch (node[1]) {
      case 'changed':
        if (node[4].length === 0) {
          return `  ${indents}+ ${node[0]}: ${node[3]}\n  ${indents}- ${node[0]}: ${node[2]}`;
        }
        return `  ${indents}+ ${node[0]}: ${renderAstToTree(node[4], `    ${indents}`)}`;
      case 'unchanged':
        if (node[4].length === 0) {
          return `  ${indents}  ${node[0]}: ${node[2]}`;
        }
        return `  ${indents}  ${node[0]}: ${renderAstToTree(node[4], `    ${indents}`)}`;
      case 'removed':
        if (node[4].length === 0) {
          return `  ${indents}- ${node[0]}: ${node[2]}`;
        }
        return `  ${indents}- ${node[0]}: ${renderAstToTree(node[4], `    ${indents}`)}`;
      case 'added':
        if (node[4].length === 0) {
          return `  ${indents}+ ${node[0]}: ${node[3]}`;
        }
        return `  ${indents}+ ${node[0]}: ${renderAstToTree(node[4], `    ${indents}`)}`;
      default:

    }
    return '';
  });
  return `{\n${result.join('\n')}\n${indents}}`;
};

export default renderAstToTree;
