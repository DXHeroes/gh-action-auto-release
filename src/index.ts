import * as core from '@actions/core';
import minimist from 'minimist';

// https://github.com/google-github-actions/release-please-action/tree/main#release-types-supported
const VALID_RELEASE_PLEASE_RELEASE_TYPES = [
  'elixir',
  'dart',
  'go',
  'helm',
  'java',
  'maven',
  'node',
  'ocaml',
  'python',
  'php',
  'ruby',
  'rust',
  'sfdx',
  'simple',
  'terraform-module',
];

// custom release types that release-please doesn't support
//   are rewritten to a different for publish action
const VALID_RELEASE_TYPES = [...VALID_RELEASE_PLEASE_RELEASE_TYPES, 'csharp'];

try {
  core.info(`Validating input parameters...`);

  // get input values
  const args = minimist(process.argv.slice(2));
  const releaseType = args['release-type'];
  const packageName = args['package-name'];

  // validate release type is provided and is valid
  if (!releaseType) {
    throw new Error(`Release type is required.`);
  } else if (!VALID_RELEASE_TYPES.includes(releaseType)) {
    throw new Error(`Release type '${releaseType}' is not valid. Valid values are: ${VALID_RELEASE_TYPES.join(', ')}.`);
  }

  // validate package name is provided
  if (!packageName) {
    throw new Error(`Package name is required.`);
  }

  // rewrite custom release types to a different release type
  if (!VALID_RELEASE_PLEASE_RELEASE_TYPES.includes(releaseType)) {
    core.setOutput('release-please-release-type', 'simple');
  } else {
    core.setOutput('release-please-release-type', releaseType);
  }

  core.notice(`Configuration valid. Processing release for package '${packageName}' with release type '${releaseType}'.`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  core.setFailed(error.message);
}
