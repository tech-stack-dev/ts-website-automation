import {ButtonSteps} from './ButtonSteps';
import {ColorsEnum} from '../../../enum/ColorsEnum';
import {driver} from '../../../base/driver/Driver';
import Header from '../../../identifiers/mainSite/Header';
import Buttons from '../../../identifiers/Buttons';
import {Locator, expect} from '@playwright/test';

class DesktopButtonSteps extends ButtonSteps {
	async elementsHeaderColorCheck(button: Locator, color: ColorsEnum): Promise<void> {
		const header = driver.getByTestId(Header.Container_Header);
		const logo = header.getByTestId(Buttons.Logo);

		await button.click();
		await logo.hover(); // To remove hover from button
		await driver.Page.waitForTimeout(1000); // Wait for changing color

		const actualColor = await button.evaluate(async (el) => {
			return getComputedStyle(el).backgroundColor;
		});

		expect(actualColor).toBe(color);
	}
}

const desktopButtonSteps = new DesktopButtonSteps();
export {desktopButtonSteps};
