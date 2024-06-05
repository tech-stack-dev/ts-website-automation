import {Locator} from '@playwright/test';

export abstract class HeaderMenuSteps {
	abstract clickOnBurgerMenu(): Promise<void>;

	abstract checkDropdownButtonText(button: Locator, text: string): Promise<void>;
}
