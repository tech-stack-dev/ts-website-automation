import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import CareerButton from '../../identifiers/Career/CareerButton';
import Career from '../../identifiers/Career/pages/Career';
import Containers from '../../identifiers/Career/Containers';
import {containerSteps} from '../components/container/ContainerSteps';
import ContainerByClass from '../../components/container/ContainerByClass';

class CareerSteps {
	public async verifyThatCareerWasCreated(careerName: string, searchString: string = careerName) {
		await driver.executeFunc(async () => {
			await driver.Page.reload();
			await driver.getByTestId(Career.SarchCareerField).clear();
			await driver.getByTestId(Career.SarchCareerField).fill(searchString);
			await driver.getByTestId(Career.SearchButton).click();
			await driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`).waitFor();
		}, 5);
	}

	public async switchLanguageViaHeader(language: string) {
		const headerContainer = await containerSteps.getContainer(ContainerByClass, Containers.JobPageHeaderWrapper);
		let switcher: any;
		switch (language.toLowerCase()) {
			case 'ua':
				switcher = headerContainer.Element.getByTestId(CareerButton.UaLanguageSwitcher);
				break;
			case 'en':
				switcher = headerContainer.Element.getByTestId(CareerButton.EnLanguageSwitcher);
		}

		await switcher.click();
		await expect(switcher).toHaveClass(/active-locale/);
	}

	public async clickOnCareerCard(careerName: string) {
		await driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`).click();
	}

	public async getBreadcrumbsText() {
		const breadcrumbs = await driver.component(ContainerByClass, Career.BreadcrumbsInCareer);
		return breadcrumbs.textContent();
	}

	public async getJobHeaderText() {
		const title = await driver.component(ContainerByClass, Career.JobHeaderTitle);
		return title.textContent();
	}
}

const careerSteps = new CareerSteps();
export {careerSteps};
