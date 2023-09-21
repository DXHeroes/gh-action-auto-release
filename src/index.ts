import * as core from '@actions/core';

const VALID_RELEASE_TYPES = ['test', 'node'];

try {
    core.info(`Validating input parameters...`);

    // get input values
    const releaseType = core.getInput('release-type');
    const packageName = core.getInput('package-name');
    
    // validate release type is provided and is valid
    if (!releaseType) {
        throw new Error(`Release type is required.`);
    } else {
        if (VALID_RELEASE_TYPES.includes(releaseType)) {
            throw new Error(`Release type '${releaseType}' is not valid. Valid values are: ${VALID_RELEASE_TYPES.join(', ')}.`);
        }
    }

    // validate package name is provided
    if (!packageName) {
        throw new Error(`Package name is required.`);
    }

    core.notice(`Configuration valid. Processing release for package '${packageName}' with release type '${releaseType}'.`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
    core.setFailed(error.message);
}
