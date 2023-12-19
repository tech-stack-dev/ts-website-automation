import {expect} from '@playwright/test';

class PlaywrightUtils {
	async expectWithRetries(func: any, retriesCount = 5, interval = 1000) {
		const intervalsFromRetries = Array.from({length: retriesCount}, () => interval);
		return await expect(async () => {
			await func;
		}).toPass({timeout: (retriesCount + 1) * interval, intervals: intervalsFromRetries});
	}
}

const playwrightUtils = new PlaywrightUtils();
export {playwrightUtils};
