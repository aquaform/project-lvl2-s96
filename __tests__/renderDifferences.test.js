import renderDiffs from '../src/modules/renderDifferences';

test('Render differences', () => {
  const arrOfDiffs = [{ status: ' ', host: 'hexlet.io' },
    { status: '+', timeout: '20' },
    { status: '-', timeout: '50' },
    { status: '-', proxy: '123.234.53.22' },
    { status: '+', verbose: true }];

  const result = '  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true';

  expect(renderDiffs(arrOfDiffs)).toEqual(result);
});
