import * as core from '@actions/core';
import minimist from 'minimist';

try {
  core.info(`Setting link to package manager...`);

  // get input values
  const args = minimist(process.argv.slice(2));
  const packageName = args['package-name'];
  const releaseType = args['release-type'];
  const githubOrg = args['github-org'];

  let link = '';

  if (releaseType === 'node') {
    link = `https://www.npmjs.com/package/${packageName}`;
  } else if (releaseType === 'php') {
    link = `https://packagist.org/packages/${githubOrg}/${packageName}`;
  } else if (releaseType === 'ruby') {
    link = `https://rubygems.org/gems/${packageName}`;
  } else {
    core.warning(`Not set link for release type '${releaseType}'.`);
  }

  core.setOutput('package-manager-link', link);

  core.notice(`Check your package on ${link}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  core.setFailed(error.message);
}
