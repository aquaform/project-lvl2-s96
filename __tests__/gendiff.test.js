import gendiff from '../dist/gendiff';

const result = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';

test('Generate differences in JSON files', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in YML files', () => {
  const before = './__tests__/__fixtures__/before.yml';
  const after = './__tests__/__fixtures__/after.yml';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in INI files', () => {
  const before = './__tests__/__fixtures__/before.ini';
  const after = './__tests__/__fixtures__/after.ini';

  expect(gendiff(before, after)).toEqual(result);
});
