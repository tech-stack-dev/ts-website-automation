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

console.log(`echo "PASSED=${passed}" >> "$GITHUB_OUTPUT"`);
console.log(`echo "FAILED=${failed}" >> "$GITHUB_OUTPUT"`);
console.log(`echo "FLAKY=${flaky}" >> "$GITHUB_OUTPUT"`);
console.log(`echo "SKIPPED=${skipped}" >> "$GITHUB_OUTPUT"`);
console.log(`echo "TOTAL=${total}" >> "$GITHUB_OUTPUT"`);
