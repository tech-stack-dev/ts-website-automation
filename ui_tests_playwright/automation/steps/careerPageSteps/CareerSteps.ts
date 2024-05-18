import {driver} from '../../base/driver/Driver';
import Career from '../../identifiers/career/pages/Career';
import ContainerByClass from '../../components/container/ContainerByClass';
import JobsPage from '../../pages/careerSite/JobsPage';
import Buttons from '../../identifiers/Buttons';
import Links from '../../preconditionsData/links/Links';

export abstract class CareerSteps {
	abstract clickOnFilter(): Promise<void>;

	abstract clickOnBurgerMenu(): Promise<void>;

	abstract switchLanguage(language: string): Promise<void>;

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
		socialMedia: Links
	): Promise<boolean> {
		const [newPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await driver.getByTestId(socialMediaShareIdentifier).click(),
		]);
		await newPage.waitForLoadState('domcontentloaded');
		const openedUrl = newPage.url();
		await newPage.close();
		return openedUrl.includes(socialMedia.toString());
	}

	public async getApplyJobContent() {
		const page = await driver.getPage(JobsPage);
		const applyJobText = await page.applyJobBlock().textContent();
		return applyJobText;
	}
}
