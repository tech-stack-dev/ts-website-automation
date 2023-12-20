import * as fs from 'fs';

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

console.log(`::set-output name=PASSED::${passed}`);
console.log(`::set-output name=FAILED::${failed}`);
console.log(`::set-output name=FLAKY::${flaky}`);
console.log(`::set-output name=SKIPPED::${skipped}`);
console.log(`::set-output name=TOTAL::${total}`);
