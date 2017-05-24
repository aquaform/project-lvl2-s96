const renderDiff = diff => Object.keys(diff).reduce((acc, key) => {
  const value = `${key}` === 'status' ? `${acc}${diff[key]}` : `${acc} ${key}: ${diff[key]}`;
  return value;
}, '');

export default diffs => diffs.reduce((acc, diff, i) => {
  if (diffs.length === i + 1) {
    return `${acc}${renderDiff(diff)}`;
  }
  return `${acc}${renderDiff(diff)}\n`;
}, '');
