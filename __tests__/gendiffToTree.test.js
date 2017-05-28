import gendiff from '../src/';

const result = [
  '{',
  '    host: hexlet.io',
  '  + timeout: 20',
  '  - timeout: 50',
  '  - proxy: 123.234.53.22',
  '  + verbose: true',
  '}'].join('\n');

const result2 = [
  '{',
  '    common: {',
  '        setting1: Value 1',
  '      - setting2: 200',
  '        setting3: true',
  '      - setting6: {',
  '            key: value',
  '        }',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '    }',
  '    group1: {',
  '      + baz: bars',
  '      - baz: bas',
  '        foo: bar',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '    }',
  '  + group3: {',
  '        fee: 100500',
  '    }',
  '}'].join('\n');

test('Generate differences with difficult JSON files', () => {
  const before = './__tests__/__fixtures__/before2.json';
  const after = './__tests__/__fixtures__/after2.json';

  expect(gendiff(before, after)).toEqual(result2);
});

test('Generate differences with difficult YML files', () => {
  const before = './__tests__/__fixtures__/before2.yml';
  const after = './__tests__/__fixtures__/after2.yml';

  expect(gendiff(before, after)).toEqual(result2);
});

test('Generate differences with difficult INI files', () => {
  const before = './__tests__/__fixtures__/before2.ini';
  const after = './__tests__/__fixtures__/after2.ini';

  expect(gendiff(before, after)).toEqual(result2);
});

test('Generate differences with simple JSON files', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in simple YML files', () => {
  const before = './__tests__/__fixtures__/before.yml';
  const after = './__tests__/__fixtures__/after.yml';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in simple INI files', () => {
  const before = './__tests__/__fixtures__/before.ini';
  const after = './__tests__/__fixtures__/after.ini';

  expect(gendiff(before, after)).toEqual(result);
});
