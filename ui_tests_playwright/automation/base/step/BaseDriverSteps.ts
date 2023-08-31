import {driver} from '../driver/Driver';
import {BrowsersEnum} from '../driver/BrowsersEnum';
import {Locator, expect} from '@playwright/test';
import Container from '../../identifiers/Container';

class BaseDriverSteps {
	public async createsNewBrowser(browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER) {
		await driver.createBrowser(browserName);
	}

	public async createsNewBrowserAndGoToUrl(url: string, browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER) {
		await driver.createBrowser(browserName);
		await driver.Page.goto(url, {timeout: 30000});
	}

	public async createNewPage() {
		const newPage = await driver.DriverContext.newPage();
		driver.Page = newPage;
		driver.ListOfPages.push(newPage);
	}

	public async switchToBrowser(browserName: BrowsersEnum) {
		driver.focusedDriver = driver.listOfDrivers.find((x) => x.DriverName === browserName)!;
	}

	public async switchToBrowserTab(tabNumber: number) {
		driver.Page = driver.ListOfPages[tabNumber];
	}

	public async closeBrowser() {
		await driver.DriverContext.close();
	}

	public async closeBrowserTab() {
		await driver.Page.close();
	}

	public async goToUrl(url: string) {
		await driver.Page.goto(url, {timeout: 30000});
	}

	public async checkUrl(expectedUrl: string) {
		await expect(driver.Page).toHaveURL(expectedUrl);
	}

	public async checkCarouselArrowsClick(ContainerName: Locator, clicksCount?: number) {
		const carousel = ContainerName.getByTestId(Container.ContainerCarousel);
		const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
		const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
		const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();

		await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
		await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
		await carouselButtonNext.click({delay: 1000});

		await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
		await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
		await carouselButtonPrev.click({delay: 1000});

		await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
		await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');

		clicksCount = clicksCount ? clicksCount : allSectionTitles.length - 1;

		for (let i = 0; i < clicksCount; i++) {
			await carouselButtonNext.click({delay: 1000});
		}

		await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
		await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'true');
	}

	// Need remove getByRole part after fixing data-id on CustomDev page on site
	public async checkAwardCardsVisibility(ContainerName: Locator, numberOfCards: number, role?: any) {
		const awardCards = role
			? ContainerName.getByTestId(Container.AwardCard).filter({
					has: driver.Page.getByRole(role),
			  })
			: ContainerName.getByTestId(Container.AwardCard);

		await expect(awardCards).toHaveCount(numberOfCards);

		for (const awardCard of await awardCards.all()) {
			await expect(awardCard).toBeVisible();
		}
	}

	public async checkContainerTitlesAndNumbers(containers: Locator[], expectedData: string[][]) {
		for (const [index, container] of containers.entries()) {
			const containerData = expectedData[index];

			await expect(container.getByTestId(Container.ContainerTitle)).toHaveText(containerData[0]);
			await expect(container.getByTestId(Container.ContainerNumber)).toHaveText(containerData[1]);
		}
	}
}

const baseDriverSteps = new BaseDriverSteps();

export {baseDriverSteps};
