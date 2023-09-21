import * as core from '@actions/core';
import * as github from '@actions/github';

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    core.info(`Hello ${nameToGreet}!`);
    const time = new Date().toTimeString();
    core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    core.info(`The event payload: ${payload}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
    core.setFailed(error.message);
}
