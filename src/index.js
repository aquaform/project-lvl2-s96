import commander from 'commander';
import pkg from '../package.json';

export const start = () => {
  console.log('Welcome!');
};

export const program = commander;
program.version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');
