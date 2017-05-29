import renderAstToTree from './renderAstToTree';
import renderAstToPlain from './renderAstToPlain';
import renderAstToJSON from './renderAstToJSON';

const formats = {
  tree: ast => renderAstToTree(ast),
  plain: ast => renderAstToPlain(ast),
  json: ast => renderAstToJSON(ast) };

const renderAst = format => ast => formats[format](ast);

export default renderAst;
