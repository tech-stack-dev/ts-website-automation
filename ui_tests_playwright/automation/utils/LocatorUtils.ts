import {Locator} from '@playwright/test';
import Colors from '../preconditionsData/Colors';
import { ColorsEnum } from '../enum/ColorsEnum';

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

	public async checkBackgroundColor(element: Locator, background: ColorsEnum): Promise<boolean> {
		const actualColor = await element.evaluate(async (el) => {
			return getComputedStyle(el).backgroundColor;
		});
		return actualColor === background;
	}
}

const locatorUtils = new LocatorUtils();
export {locatorUtils};
