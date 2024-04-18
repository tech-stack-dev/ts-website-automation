import {expect} from '@playwright/test';
import ContainerByClass from '../../components/container/ContainerByClass';
import CareerButtons from '../../identifiers/career/CareerButtons';
import ContainersCareer from '../../identifiers/career/ContainersCareer';
import {containerSteps} from '../../fixtures/DesktopMobileSetup';
import {CareerSteps} from './CareerSteps';
import {driver} from '../../base/driver/Driver';

class DesktopCareerSteps extends CareerSteps {
	async clickOnFilter(): Promise<void> {
		console.log('This step is skipped for desktop');
		return Promise.resolve();
	}

	async clickOnBurgerMenu(): Promise<void> {
		console.log('This step is skipped for desktop');
		return Promise.resolve();
	}

	async switchLanguage(language: string): Promise<void> {
		let switcher;
		const parentIdentifier = (await driver.getByTestId(ContainersCareer.NavigationHeaderClass).isVisible())
			? ContainersCareer.NavigationHeaderClass
			: ContainersCareer.JobPageHeaderWrapper;
		const parent = await containerSteps.getContainer(ContainerByClass, {desktopLocator: parentIdentifier});

		switch (language) {
			case 'ua': {
				switcher = parent.getByTestId(CareerButtons.UaLanguageSwitcher);
				break;
			}
			case 'en': {
				switcher = parent.getByTestId(CareerButtons.EnLanguageSwitcher);
				break;
			}
			default: {
				throw new Error(`${language} is not exist`);
			}
		}

		await switcher.click();
		await expect(switcher).toHaveClass(/active-locale/);
	}
}
const desktopCareerSteps = new DesktopCareerSteps();

export {desktopCareerSteps};
