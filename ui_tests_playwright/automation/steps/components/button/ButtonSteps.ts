import {Locator} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import { ColorsEnum } from '../../../enum/ColorsEnum';

export abstract class ButtonSteps {
	abstract elementsHeaderColorCheck(button: Locator, color: ColorsEnum): Promise<void>;

	public async clickButton(type: any, identifier: string, parent?: Locator) {
		await (await driver.component(type, identifier, parent)).click();
	}
}
