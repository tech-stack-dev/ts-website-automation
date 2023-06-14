import {Locator} from '@playwright/test';

class LocatorUtils {
	public async getMessagesFromLocators(locators: Locator[]): Promise<string[]> {
		const messages: string[] = [];

		for (const locator of locators) {
			const element = await locator.textContent();
			if (element) {
				messages.push(element.trim());
			}
		}

		return messages;
	}
}

const locatorUtils = new LocatorUtils();
export {locatorUtils};
