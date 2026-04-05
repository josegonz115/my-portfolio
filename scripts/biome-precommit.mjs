#!/usr/bin/env node

import { execFileSync, spawnSync } from 'node:child_process';
import process from 'node:process';

const BIOME_FILE_PATTERN = /\.(?:[cm]?js|jsx|[cm]?ts|tsx|json|jsonc|css|scss|md)$/i;

function getStagedFiles() {
  const output = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'], {
    encoding: 'utf8',
  });

  return output.split('\0').filter(Boolean);
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });

  if (result.status === null) {
    if (result.error instanceof Error) {
      throw result.error;
    }

    throw new Error(`Failed to run command: ${command}`);
  }

  return result.status;
}

function main() {
  const stagedFiles = getStagedFiles();
  const biomeFiles = stagedFiles.filter((file) => BIOME_FILE_PATTERN.test(file));

  if (biomeFiles.length === 0) {
    process.exit(0);
  }

  run('bunx', ['biome', 'check', '--write', '--no-errors-on-unmatched', ...biomeFiles]);
  const addStatus = run('git', ['add', '--', ...biomeFiles]);

  if (addStatus !== 0) {
    process.exit(addStatus);
  }

  const verifyStatus = run('bunx', ['biome', 'check', '--no-errors-on-unmatched', ...biomeFiles]);

  if (verifyStatus !== 0) {
    console.error('\nBiome pre-commit check failed.');
    console.error('To fix locally:');
    console.error('  bun run lint:fix');
    console.error('  bun run lint');
    console.error('Then re-stage changes and run commit again.');
    process.exit(verifyStatus);
  }
}

try {
  main();
} catch (error) {
  console.error('Failed to run Biome pre-commit checks.');
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
