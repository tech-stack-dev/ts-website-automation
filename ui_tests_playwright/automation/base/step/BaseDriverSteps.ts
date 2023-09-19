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
		const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).all();
		const attribute = 'data-disabled';

		await expect(carouselButtonPrev).toHaveAttribute(attribute, 'true');
		await expect(carouselButtonNext).toHaveAttribute(attribute, 'false');
		await carouselButtonNext.click({delay: 1000});

		await expect(carouselButtonPrev).toHaveAttribute(attribute, 'false');
		await expect(carouselButtonNext).toHaveAttribute(attribute, 'false');
		await carouselButtonPrev.click({delay: 1000});

		await expect(carouselButtonPrev).toHaveAttribute(attribute, 'true');
		await expect(carouselButtonNext).toHaveAttribute(attribute, 'false');

		clicksCount = clicksCount ? clicksCount : allSectionTitles.length - 1;

		for (let i = 0; i < clicksCount; i++) {
			await carouselButtonNext.click({delay: 1000});
		}

		await expect(carouselButtonPrev).toHaveAttribute(attribute, 'false');
		await expect(carouselButtonNext).toHaveAttribute(attribute, 'true');
	}

	public async checkImagesVisibility(images: Locator, numberOfCards: number) {
		await expect(images).toHaveCount(numberOfCards);

		for (const awardCard of await images.all()) {
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

	public async checkTechnologyStackTabsAndSectionTitles(
		navigationTabs: Locator[],
		containerBlocks: Locator,
		testDataSectionTitles: string[][]
	) {
		for (let tab = 0; tab < navigationTabs.length; tab++) {
			const currentTab = navigationTabs[tab];
			const currentBlock = containerBlocks.nth(tab);
			const tabSectionTitles = testDataSectionTitles[tab];

			await expect(currentBlock).toHaveClass(/--active/);
			await currentTab.click();
			await expect(currentTab).toHaveClass(/--active/);
			expect(currentBlock.getByTestId(Container.SectionTitle)).toHaveText(tabSectionTitles);
		}
	}

	public async checkRedirectToPages(locatorUrlMap: Map<Locator, string>, initialPageUrl?: string) {
		for (const [locator, expectedUrl] of locatorUrlMap) {
			await locator.click();

			if (initialPageUrl) {
				await baseDriverSteps.checkUrl(expectedUrl);
				await baseDriverSteps.goToUrl(initialPageUrl);
			} else {
				const newPage = await driver.DriverContext.waitForEvent('page');
				expect(newPage.url()).toContain(expectedUrl);
				await newPage.close();
			}
		}
	}
}

const baseDriverSteps = new BaseDriverSteps();

export {baseDriverSteps};
