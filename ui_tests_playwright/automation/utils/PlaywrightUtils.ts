import {expect} from '@playwright/test';

class PlaywrightUtils {
	async expectWithRetries(func: any, retriesCount = 5, timeout = 1000) {
		const intervalsFromRetries = Array.from({length: retriesCount}, () => timeout);
		return await expect(() => {func}).toPass({timeout: timeout, intervals: intervalsFromRetries});
	}
}

const playwrightUtils = new PlaywrightUtils();
export {playwrightUtils};
