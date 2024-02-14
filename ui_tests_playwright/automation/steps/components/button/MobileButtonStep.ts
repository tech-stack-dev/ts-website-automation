import {Locator, expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {ColorsEnum} from '../../../enum/ColorsEnum';
import Buttons from '../../../identifiers/Buttons';
import {ButtonSteps} from './ButtonSteps';

class MobileButtonSteps extends ButtonSteps {
	async elementsHeaderColorCheck(button: Locator, color: ColorsEnum): Promise<void> {
		const elemetColor = driver.locator('//preceding-sibling::div//div');

		await button.click();
		await driver.getByTestId(Buttons.Close).hover();
		await driver.Page.waitForTimeout(1000); // Wait for changing color

		const actualColor = await button.locator(elemetColor).evaluate(async (el) => {
			return getComputedStyle(el).color;
		});

		expect(actualColor).toBe(color);
	}
}

const mobileButtonSteps = new MobileButtonSteps();
export {mobileButtonSteps};
