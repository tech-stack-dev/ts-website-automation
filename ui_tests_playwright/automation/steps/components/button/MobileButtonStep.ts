import {Locator, expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {ColorsEnum} from '../../../enum/ColorsEnum';
import Buttons from '../../../identifiers/Buttons';
import {ButtonSteps} from './ButtonSteps';
import {playwrightUtils} from '../../../utils/PlaywrightUtils';

class MobileButtonSteps extends ButtonSteps {
	async buttonColorCheck(button: Locator, color: ColorsEnum): Promise<void> {
		const elemetColor = driver.locator('//preceding-sibling::div//div');

		await button.click();
		await driver.getByTestId(Buttons.Close).hover();

		await playwrightUtils.expectWithRetries(
			async () => {
				const actualColor = await button.locator(elemetColor).evaluate(async (el) => {
					return getComputedStyle(el).color;
				});

				expect(actualColor).toBe(color);
			},
			5,
			2000
		);
	}
}

const mobileButtonSteps = new MobileButtonSteps();
export {mobileButtonSteps};
