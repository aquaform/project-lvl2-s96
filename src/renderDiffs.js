import renderAstToTree from './renderAstToTree';
import renderAstToPlain from './renderAstToPlain';

const formats = {
  tree: ast => renderAstToTree(ast),
  plain: ast => renderAstToPlain(ast) };

const renderAst = format => ast => formats[format](ast);

export default renderAst;
