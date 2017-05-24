import gendiff from '../src/gendiff';

test('Generate differences in JSON files', () => {
  const before = './__tests__/test-files/before.json';
  const after = './__tests__/test-files/after.json';

  const result = '  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in YML files', () => {
  const before = './__tests__/test-files/before.yml';
  const after = './__tests__/test-files/after.yml';

  const result = '  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in INI files', () => {
  const before = './__tests__/test-files/before.ini';
  const after = './__tests__/test-files/after.ini';

  const result = '  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true';

  expect(gendiff(before, after)).toEqual(result);
});
