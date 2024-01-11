import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import CareerButtons from '../../identifiers/career/CareerButtons';
import Career from '../../identifiers/career/pages/Career';
import ContainersCareer from '../../identifiers/career/ContainersCareer';
import {containerSteps} from '../components/container/ContainerSteps';
import ContainerByClass from '../../components/container/ContainerByClass';
import JobsPage from '../../pages/careerSite/JobsPage';
import {SocialMediaLinksEnum} from '../../enum/SocialMediaLinksEnum';
import Buttons from '../../identifiers/Buttons';

export abstract class CareerSteps {
	public async verifyThatCareerWasCreated(careerName: string, searchString: string = careerName) {
		await driver.executeFunc(async () => {
			await driver.Page.reload();
			await driver.getByTestId(Career.SarchCareerField).clear();
			await driver.getByTestId(Career.SarchCareerField).fill(searchString);
			await driver.getByTestId(Career.SearchButton).click();
			await driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`).waitFor();
		}, 5);
	}

	public async verifyThatManyCareersWasCreated(
		careerName: string,
		countOfCareers: number,
		searchString: string = careerName
	) {
		const indexes = Array.from({length: countOfCareers}, (_, index) => index + 1);
		for (const index of indexes) {
			await driver.executeFunc(async () => {
				await driver.Page.reload();
				await driver.getByTestId(Career.SarchCareerField).clear();
				await driver.getByTestId(Career.SarchCareerField).fill(`${searchString}${index}`);
				await driver.getByTestId(Career.SearchButton).click();
				await driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}${index}`).waitFor();
			}, 5);
		}
	}

	abstract switchLanguageViaHeader(language: string): Promise<void>;
	// public async switchLanguageViaHeader(language: string) {
	// 	const headerContainer = await containerSteps.getContainer(
	// 		ContainerByClass,
	// 		ContainersCareer.JobPageHeaderWrapper
	// 	);
	// 	let switcher: any;
	// 	switch (language.toLowerCase()) {
	// 		case 'ua':
	// 			switcher = headerContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
	// 			break;
	// 		case 'en':
	// 			switcher = headerContainer.Element.getByTestId(CareerButtons.EnLanguageSwitcher);
	// 	}

	// 	await switcher.click();
	// 	await expect(switcher).toHaveClass(/active-locale/);
	// }

	public async clickOnCareerCard(careerName: string) {
		await driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`).click({timeout: 5000});
	}

	public async getPaginationNumberButton(pageNumber: number) {
		return driver.getByTestId(Buttons.paginationNumberButton(pageNumber));
	}

	public async getPaginationNavigationArrowButton(direction: 'Next' | 'Prev') {
		return driver.getByTestId(Buttons.paginationNavigatinArrowButton(direction));
	}

	public async getBreadcrumbsText() {
		const breadcrumbs = await driver.component(ContainerByClass, Career.BreadcrumbsInCareer);
		return breadcrumbs.textContent();
	}

	public async getJobHeaderText() {
		const title = await driver.component(ContainerByClass, Career.JobHeaderTitle);
		return title.textContent();
	}

	public async dropdownIsExpanded(name: string) {
		const page = await driver.getPage(JobsPage);
		const dropdown = await page.getDropdownByName(name);
		const classAttribute = await dropdown.getAttribute('class');
		return classAttribute?.includes('is-open');
	}

	public async checkSocialMediaButtonRedirect(
		socialMediaShareIdentifier: string,
		socialMedia: SocialMediaLinksEnum
	): Promise<boolean> {
		const [newPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await driver.getByTestId(socialMediaShareIdentifier).click(),
		]);
		await newPage.waitForLoadState('domcontentloaded');
		const openedUrl = newPage.url();
		await newPage.close();
		return openedUrl.includes(socialMedia);
	}

	public async getApplyJobContent() {
		const page = await driver.getPage(JobsPage);
		const applyJobText = await page.applyJobBlock().textContent();
		return applyJobText;
	}
}

// const careerSteps = new CareerSteps();
// export {careerSteps};
