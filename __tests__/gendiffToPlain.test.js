import gendiff from '../src/';

const result = [
  "Property 'timeout' was updated. From '50' to '20'",
  "Property 'proxy' was removed",
  "Property 'verbose' was added with value: 'true'",
].join('\n');

const result2 = [
  "Property 'common.setting2' was removed",
  "Property 'common.setting6' was removed",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with complex value",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group2' was removed",
  "Property 'group3' was added with complex value",
].join('\n');

test('Generate differences with difficult JSON files', () => {
  const before = './__tests__/__fixtures__/before2.json';
  const after = './__tests__/__fixtures__/after2.json';

  expect(gendiff(before, after, 'plain')).toEqual(result2);
});

test('Generate differences with difficult YML files', () => {
  const before = './__tests__/__fixtures__/before2.yml';
  const after = './__tests__/__fixtures__/after2.yml';

  expect(gendiff(before, after, 'plain')).toEqual(result2);
});

test('Generate differences with difficult INI files', () => {
  const before = './__tests__/__fixtures__/before2.ini';
  const after = './__tests__/__fixtures__/after2.ini';

  expect(gendiff(before, after, 'plain')).toEqual(result2);
});


test('Generate differences with simple JSON files', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';

  expect(gendiff(before, after, 'plain')).toEqual(result);
});

test('Generate differences in simple YML files', () => {
  const before = './__tests__/__fixtures__/before.yml';
  const after = './__tests__/__fixtures__/after.yml';

  expect(gendiff(before, after, 'plain')).toEqual(result);
});

test('Generate differences in simple INI files', () => {
  const before = './__tests__/__fixtures__/before.ini';
  const after = './__tests__/__fixtures__/after.ini';

  expect(gendiff(before, after, 'plain')).toEqual(result);
});
