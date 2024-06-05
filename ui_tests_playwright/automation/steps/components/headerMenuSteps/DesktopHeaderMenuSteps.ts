import {HeaderMenuSteps} from './HeaderMenuSteps';
import {Locator, expect} from '@playwright/test';

class DesktopHeaderMenuSteps extends HeaderMenuSteps {
	async clickOnBurgerMenu(): Promise<void> {
		console.log('This step is skipped for desktop');
		return Promise.resolve();
	}

	async checkDropdownButtonText(button: Locator, text: string): Promise<void> {
		await expect(button).toHaveText(text);
	}
}

const desktopHeaderMenuSteps = new DesktopHeaderMenuSteps();
export {desktopHeaderMenuSteps};
