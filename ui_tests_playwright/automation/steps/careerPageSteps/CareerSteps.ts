import { driver } from '../../base/driver/Driver';
import Career from '../../identifiers/Career';
import Containers from '../../identifiers/Containers';
import { stringUtils } from '../../utils/StringUtils';
import ContainerByClass from '../../components/Container/ContainerByClass';
import { containerSteps } from '../components/Container/ContainerSteps';
import Button from '../../identifiers/Button';
import { expect } from '@playwright/test';

class CareerSteps {
	public async verifyThatCareerWasCreated(careerName: string) {
		await driver.executeFunc(async () => {
			await driver.Page.reload();
			await driver.getByTestId(Career.searchCareerField).clear();
			await driver.getByTestId(Career.searchCareerField).fill(careerName);
			await driver.getByTestId(Career.searchButton).click();
			await driver.getByTestId(`${Containers.careerCardWithoutModifier}${careerName}`)
				.waitFor();
		}, 5);
	}

	public async switchLanguageViaHeader(language: string) {
		const headerContainer = await containerSteps.getContainer(
			ContainerByClass,
			Containers.jobPageHeaderWrapper
		);
		let switcher: any;
		switch (language.toLowerCase()) {
			case 'ua':
				switcher = headerContainer.Element.getByTestId(
					Button.UaLanguageSwitcher
				);
				break;
			case 'en':
				switcher = headerContainer.Element.getByTestId(
					Button.EnLanguageSwitcher
				);
		}

		await switcher.click();
		await expect(switcher).toHaveClass(/active-locale/);
	}

	public async clickOnCareerCard(careerName: string) {
		await driver
			.getByTestId(
				`${Containers.careerCardWithoutModifier
				}${careerName}`
			)
			.click();
	}

	public async getBreadcrumbsText() {
		const breadcrumbs = await driver.component(
			ContainerByClass,
			Career.breadcrumbsInCareer
		);
		return breadcrumbs.textContent();
	}

	public async getJobHeaderText() {
		const title = await driver.component(
			ContainerByClass,
			Career.jobHeaderTitle
		);
		return title.textContent();
	}
}

const careerSteps = new CareerSteps();

export { careerSteps };
