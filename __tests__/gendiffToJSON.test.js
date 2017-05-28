import gendiff from '../src/';

const result =
  `[
  {
    "key": "host",
    "type": "unchanged",
    "beforeValue": "hexlet.io",
    "afterValue": "hexlet.io"
  },
  {
    "key": "timeout",
    "type": "changed",
    "beforeValue": 50,
    "afterValue": 20
  },
  {
    "key": "proxy",
    "type": "removed",
    "beforeValue": "123.234.53.22"
  },
  {
    "key": "verbose",
    "type": "added",
    "afterValue": true
  }
]`;

const result2 =
  `[
  {
    "key": "common",
    "type": "unchanged",
    "children": [
      {
        "key": "setting1",
        "type": "unchanged",
        "beforeValue": "Value 1",
        "afterValue": "Value 1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "beforeValue": 200
      },
      {
        "key": "setting3",
        "type": "unchanged",
        "beforeValue": true,
        "afterValue": true
      },
      {
        "key": "setting6",
        "type": "removed",
        "children": [
          {
            "key": "key",
            "type": "unchanged",
            "beforeValue": "value",
            "afterValue": "value"
          }
        ]
      },
      {
        "key": "setting4",
        "type": "added",
        "afterValue": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "children": [
          {
            "key": "key5",
            "type": "unchanged",
            "beforeValue": "value5",
            "afterValue": "value5"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "unchanged",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "beforeValue": "bas",
        "afterValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "beforeValue": "bar",
        "afterValue": "bar"
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "children": [
      {
        "key": "abc",
        "type": "unchanged",
        "beforeValue": "12345",
        "afterValue": "12345"
      }
    ]
  },
  {
    "key": "group3",
    "type": "added",
    "children": [
      {
        "key": "fee",
        "type": "unchanged",
        "beforeValue": "100500",
        "afterValue": "100500"
      }
    ]
  }
]`;

test('Generate differences with difficult JSON files', () => {
  const before = './__tests__/__fixtures__/before2.json';
  const after = './__tests__/__fixtures__/after2.json';

  expect(gendiff(before, after, 'json')).toEqual(result2);
});


test('Generate differences with simple JSON files', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';

  expect(gendiff(before, after, 'json')).toEqual(result);
});
