import {expect} from '@playwright/test';
import CareerButtons from '../../identifiers/career/CareerButtons';
import {CareerSteps} from './CareerSteps';
import {driver} from '../../base/driver/Driver';
import {containerSteps, headerMenuSteps} from '../../fixtures/DesktopMobileSetup';
import ContainerByClass from '../../components/container/ContainerByClass';
import ContainersCareer from '../../identifiers/career/ContainersCareer';
import Buttons from '../../identifiers/Buttons';

class MobileCareerSteps extends CareerSteps {
	async clickOnFilter(): Promise<void> {
		await driver.getByTestId(CareerButtons.FilterButton).click();
	}

	async switchLanguage(language: string): Promise<void> {
		let switcher;
		const parent = await containerSteps.getContainer(ContainerByClass, {
			desktopLocator: ContainersCareer.MainModalMenuWrapper,
		});

		switch (language) {
			case 'ua': {
				switcher = parent.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
				break;
			}
			case 'en': {
				switcher = parent.Element.getByTestId(CareerButtons.EnLanguageSwitcher);
				break;
			}
			default: {
				throw new Error(`${language} is not exist`);
			}
		}

		await headerMenuSteps.clickOnBurgerMenu();
		await switcher.click();
		await driver.Page.waitForLoadState('networkidle');
		await expect(switcher).toHaveClass(/active-locale/);
		await driver.getByTestId(Buttons.Close).click();
	}
}
const mobileCareerSteps = new MobileCareerSteps();

export {mobileCareerSteps};
