import { findDiffs } from '../src/gendiff';

test('Find differences', () => {
  const before = { host: 'hexlet.io',
    timeout: '50',
    proxy: '123.234.53.22'
  };
  const after = { timeout: '20',
    verbose: true,
    host: 'hexlet.io'
  };

  const result = '  host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n + verbose: true';

  expect(findDiffs(before, after)).toEqual(result);
});
