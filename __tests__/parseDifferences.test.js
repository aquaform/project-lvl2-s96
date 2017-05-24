import parseDiffs from '../src/modules/parseDifferences';

test('Parse differences', () => {
  const before = { host: 'hexlet.io',
    timeout: '50',
    proxy: '123.234.53.22' };
  const after = { timeout: '20',
    verbose: true,
    host: 'hexlet.io' };

  const result = [{ status: ' ', host: 'hexlet.io' },
    { status: '+', timeout: '20' },
    { status: '-', timeout: '50' },
    { status: '-', proxy: '123.234.53.22' },
    { status: '+', verbose: true }];

  expect(parseDiffs(before, after)).toEqual(result);
});
