import {driver} from '../../../base/driver/Driver';
import Buttons from '../../../identifiers/Buttons';
import {HeaderMenuSteps} from './HeaderMenuSteps';
import {Locator, expect} from '@playwright/test';

class MobileHeaderMenuSteps extends HeaderMenuSteps {
	async clickOnBurgerMenu(): Promise<void> {
		await driver.getByTestId(Buttons.BurgerMenuButton).click();
	}

	async checkDropdownButtonText(button: Locator, text: string): Promise<void> {
		await expect(button.locator('//preceding-sibling::div')).toHaveText(text);
	}
}

const mobileHeaderMenuSteps = new MobileHeaderMenuSteps();
export {mobileHeaderMenuSteps};
