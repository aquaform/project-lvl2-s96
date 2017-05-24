const renderDiff = diff => Object.keys(diff).reduce((acc, key) => {
  const value = `${key}` === 'status' ? `${acc}${diff[key]}` : `${acc} ${key}: ${diff[key]}`;
  return value;
}, '');

export default diffs => diffs.reduce((acc, diff) => `${acc}${renderDiff(diff)}\n`, '');
