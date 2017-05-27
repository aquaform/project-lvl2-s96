import gendiff from '../dist/';

const result = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
const result2 = `{
  common: {
    setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
    + setting4: blah blah
    + setting5: {
       key5: value5
      }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
  }`

test('Generate differences in JSON files', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';

  expect(gendiff(before, after)).toEqual(result);
});

test('Generate differences in difficult JSON files', () => {
  const before = './__tests__/__fixtures__/before2.json';
  const after = './__tests__/__fixtures__/after2.json';

  expect(gendiff(before, after)).toEqual(result2);
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
