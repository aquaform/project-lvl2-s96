#!/usr/bin/env node
import program from 'commander';
import start from '..';
import pkg from '../../package.json';

program.version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
start();
