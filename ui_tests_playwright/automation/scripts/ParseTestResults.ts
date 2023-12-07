import * as fs from 'fs';
import {TestCase, TestResult, Reporter} from '@playwright/test/reporter';

export interface Summary {
	durationInMS: number;
	passed: string[];
	skipped: string[];
	failed: string[];
}

class JSONSummaryReporter implements Reporter, Summary {
	durationInMS = -1;
	passed: string[] = [];
	skipped: string[] = [];
	failed: string[] = [];

	startedAt = 0;

	onBegin() {
		this.startedAt = Date.now();
	}

	onTestEnd(test: TestCase, result: TestResult) {
		const title = [];
		const fileName = [];
		let clean = true;
		for (const s of test.titlePath()) {
			if (s === '' && clean) continue;
			clean = false;
			title.push(s);
			if (s.includes('spec.ts')) {
				fileName.push(s);
			}
		}

		// This will publish the file name + line number test begins on
		const s = `${fileName[0]}:${test.location.line}:${test.location.column}`;

		// Using the t variable in the push will push a full test test name + test description
		const t = title.join(' > ');

		const isWarned = t.includes('@warn');
		if (result.status === 'passed') {
			this.passed.push(s);
		} else if (result.status === 'skipped') {
			this.skipped.push(s);
		} else if (!isWarned) {
			this.failed.push(s);
		}
	}

	onEnd() {
		this.durationInMS = Date.now() - this.startedAt;

		// removing duplicate tests from passed array
		this.passed = [...new Set(this.passed)];

		fs.writeFileSync('./summary.json', JSON.stringify(this, null, '  '));
	}
}

export default JSONSummaryReporter;
