import * as fs from 'fs';
import * as core from '@actions/core';

const content = fs.readFileSync('test-output.txt', 'utf-8');

const passedMatches = content.match(/(\d+) passed/);
const failedMatches = content.match(/(\d+) failed/);
const flakyMatches = content.match(/(\d+) flaky/);
const skippedMatches = content.match(/(\d+) skipped/);

const passed = passedMatches ? Number(passedMatches[1]) : 0;
const failed = failedMatches ? Number(failedMatches[1]) : 0;
const flaky = flakyMatches ? Number(flakyMatches[1]) : 0;
const skipped = skippedMatches ? Number(skippedMatches[1]) : 0;

const total = passed + failed + flaky + skipped;

fs.unlinkSync('test-output.txt');

core.setOutput('PASSED', `${passed}`);
core.setOutput('FAILED', `${failed}`);
core.setOutput('FLAKY', `${flaky}`);
core.setOutput('SKIPPED', `${skipped}`);
core.setOutput('TOTAL', `${total}`);
