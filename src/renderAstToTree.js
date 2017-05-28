const renderAstToTree = (ast, indents = '') => {
  const result = ast.map((diff) => {
    switch (diff[1]) {
      case 'changed':
        if (diff[4].length === 0) {
          return `  ${indents}+ ${diff[0]}: ${diff[3]}\n  ${indents}- ${diff[0]}: ${diff[2]}`;
        }
        return `  ${indents}+ ${diff[0]}: ${renderAstToTree(diff[4], `    ${indents}`)}`;
      case 'unchanged':
        if (diff[4].length === 0) {
          return `  ${indents}  ${diff[0]}: ${diff[2]}`;
        }
        return `  ${indents}  ${diff[0]}: ${renderAstToTree(diff[4], `    ${indents}`)}`;
      case 'removed':
        if (diff[4].length === 0) {
          return `  ${indents}- ${diff[0]}: ${diff[2]}`;
        }
        return `  ${indents}- ${diff[0]}: ${renderAstToTree(diff[4], `    ${indents}`)}`;
      case 'added':
        if (diff[4].length === 0) {
          return `  ${indents}+ ${diff[0]}: ${diff[3]}`;
        }
        return `  ${indents}+ ${diff[0]}: ${renderAstToTree(diff[4], `    ${indents}`)}`;
      default:

    }
    return '';
  });
  return `{\n${result.join('\n')}\n${indents}}`;
};

export default renderAstToTree;
