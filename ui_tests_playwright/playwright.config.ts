import {PlaywrightTestConfig, devices} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import ExternalSourceLinks from './automation/preconditionsData/links/ExternalSourceLinks';
import {QaseAwsSecret} from './automation/providers/QaseAwsSecret';
import EnvProvider from './automation/providers/EnvProvider';
import DateTimeUtils from './automation/utils/DateTimeUtils';

// Read from default ".env" file.
dotenv.config();

// Alternatively, read from "../my.env" file.
dotenv.config({path: path.resolve(__dirname, '..', 'my.env')});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
	testDir: './automation',
	/* Maximum time one test can run for. */
	timeout: 0,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 10 * 1000,
		navigationTimeout: 15 * 1000,
		/* Grant permission to read and write to the clipboard */
		permissions: ['clipboard-read', 'clipboard-write'],
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: process.env.BASE_URL,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',
		testIdAttribute: 'data-id',
		screenshot: 'only-on-failure',
	},
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 2,
	/* Opt out of parallel tests on CI. */
	workers: 10,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['html', {open: 'never'}],
		['list'],
		[
			'./TsQaseReporter', // Report to Qase
			// 'playwright-qase-reporter', // Report to Qase with automatic creation of test cases, for tests that have no matches by ID and title
			{
				apiToken: QaseAwsSecret.getQaseApiToken(),
				projectCode: 'TS',
				basePath: ExternalSourceLinks.QaseApiUrl,
				uploadAttachments: true,
				runComplete: true,
				logging: true,
				rootSuiteTitle: `Automated run ${DateTimeUtils.currentDateTime}`,
				environmentId: EnvProvider.qaseEnvironmentId,
			},
		],
	],

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 13'],
			},
			grep: [new RegExp('@mobile')],
		},
		{
			name: 'Desktop_Chrome',
			use: {
				channel: 'chrome',
			},
			grep: [new RegExp('@desktop')],
		},
		// {
		//   name: 'chromium',
		//   use: {
		//     ...devices['Desktop Chrome'],
		//   },
		// },

		// {
		//   name: 'firefox',
		//   use: {
		//     ...devices['Desktop Firefox'],
		//   },
		// },

		// {
		//   name: 'webkit',
		//   use: {
		//     ...devices['Desktop Safari'],
		//   },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: {
		//     ...devices['Pixel 5'],
		//   },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// Example of usage tags in tests for specific browser
		// {
		//   name: 'Desktop_Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		//   grep: [new RegExp("@desktop")],
		// },
		// {
		// 	name: 'Google Chrome',
		// 	use: {
		// 		channel: 'chrome',
		// 	},
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
};

export default config;
