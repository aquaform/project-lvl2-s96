const replacer = (key, value) => {
  if (key === 'children' && value.length === 0) {
    return undefined;
  }

  return value;
};

const renderAstToJSON = ast => JSON.stringify(ast, replacer, 2);

export default renderAstToJSON;
