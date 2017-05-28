import program from 'commander';
import pkg from '../package.json';
import gendiff from '.';

program.version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((pathToFile1, pathToFile2, options) => {
    const diffs = gendiff(pathToFile1, pathToFile2, options.format);
    console.log(diffs);
  });

export default () => {
  program.parse(process.argv);
};
