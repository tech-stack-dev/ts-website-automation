import {driver} from '../driver/Driver';
import {BrowsersEnum} from '../driver/BrowsersEnum';
import {Locator, expect} from '@playwright/test';
import Container from '../../identifiers/Container';
import Buttons from '../../identifiers/Buttons';
import {playwrightUtils} from '../../utils/PlaywrightUtils';
import {urlsWithoutCookiesMessage} from '../../preconditionsData/UrlPreconditions';
import UrlUtils from '../../utils/UrlUtils';
import UrlPath from '../../providers/UrlPath';
import {stringUtils} from '../../utils/StringUtils';
import ContactsBlock from '../../identifiers/mainSite/ContactsBlock';

class BaseDriverSteps {
	public async createsNewBrowser(browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER) {
		await driver.createBrowser(browserName);
	}

	public async createsNewBrowserAndGoToUrl(
		url: string,
		acceptCookies = true,
		browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER
	) {
		const excludedUrls = urlsWithoutCookiesMessage;
		await driver.createBrowser(browserName);
		await this.goToUrl(url);

		if (acceptCookies && !excludedUrls.some((excludedUrls) => url.includes(excludedUrls))) {
			await driver.Page.getByTestId(Buttons.AcceptCookies).click();
		}
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
		await UrlUtils.isValidTechstackPageUrl(url);
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
		await carouselButtonNext.hover({timeout: 5000});
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

	public async checkTabsAndSectionTitles(
		navigationTabs: Locator[],
		containerBlocks: Locator,
		testDataSectionTitles: string[][]
	) {
		for (let tab = 0; tab < navigationTabs.length; tab++) {
			const currentTab = navigationTabs[tab];
			const currentBlock = containerBlocks.nth(tab);
			const tabSectionTitles = testDataSectionTitles[tab];

			await currentTab.click();
			await expect(currentTab).toHaveClass(/--active/);
			await expect(currentBlock).toHaveClass(/--active/);
			await expect(currentBlock.getByTestId(Container.SectionTitle)).toHaveText(tabSectionTitles);
		}
	}

	public async checkRedirectToPage(locator: Locator, expectedUrl: string, initialPageUrl?: string) {
		if (initialPageUrl) {
			await locator.click();
			await playwrightUtils.expectWithRetries(
				async () => {
					await driver.Page.waitForLoadState();
				},
				3,
				5000
			);
			await baseDriverSteps.checkUrl(expectedUrl);
			await baseDriverSteps.goToUrl(initialPageUrl);
			await driver.Page.waitForLoadState();
		} else {
			const [newPage] = await Promise.all([driver.DriverContext.waitForEvent('page'), locator.click()]);
			await playwrightUtils.expectWithRetries(
				async () => {
					expect(this.checkLinksEquality(expectedUrl, newPage.url())).toBeTruthy();
				},
				5,
				5000
			);
			await newPage.close();
		}
	}

	public async checkRedirectToClutch(locator: Locator, expectedUrl: string) {
		const [newPage] = await Promise.all([driver.DriverContext.waitForEvent('page'), locator.click()]);

		/*
		 * Regex to handle next url formats:
		 *
		 * https://clutch.co/profile/techstack#highlights
		 * https://clutch.co/profile/techstack?page=1#review-187130
		 * https://clutch.co/profile/techstack#review-20238
		 * https://clutch.co/go-to-review/3cebe227-e706-4f69-9c77-417b307eb419/187130
		 */
		const regex =
			/^https:\/\/clutch\.co\/(?:profile\/techstack(?:\?page=\d+)?#(?:review-\d+|\w+)|go-to-review\/[a-f0-9-]+\/\d+)$/;

		await playwrightUtils.expectWithRetries(
			async () => {
				expect(newPage.url()).toMatch(regex);
				expect(newPage.url()).toContain(expectedUrl);
			},
			3,
			5000
		);
		await newPage.close();
	}

	public async checkYoutubeIframe(expectedUrl: string) {
		const videoIframe = driver.Page.locator('iframe[src*="www.youtube.com"]');
		await expect(videoIframe).toBeVisible();
		expect(await videoIframe.getAttribute('src')).toBe(expectedUrl);
		await driver.Page.reload();
	}

	public checkLinksEquality(expectedUrl: string, actualUrl: string) {
		const ignorePatterns = ['in'];
		const expectedUrlArray = expectedUrl.split('/');
		const expectedUrlClean = expectedUrlArray.filter((urlPart) => !ignorePatterns.includes(urlPart));
		const isLinkPresent = expectedUrlClean.every((urlPart) => actualUrl.includes(urlPart));
		return isLinkPresent;
	}

	public async checkContactsEmail(contactBlock: Locator, expectedText: string) {
		expect(
			stringUtils.removeNewLineCharachters(await contactBlock.getByTestId(ContactsBlock.Email).innerText())
		).toEqual(expectedText);
		expect(await contactBlock.getByTestId(ContactsBlock.EmailLink).getAttribute('href')).toBe(UrlPath.Email);
	}

	public async checkContactsPhone(contactBlock: Locator, expectedText: string) {
		expect(
			stringUtils.removeNewLineCharachters(await contactBlock.getByTestId(ContactsBlock.Phone).innerText())
		).toEqual(expectedText);
		expect(
			stringUtils.removeHyphenCharachters(
				await contactBlock.getByTestId(ContactsBlock.PhoneUSALink).getAttribute('href')
			)
		).toBe(UrlPath.PhoneUSA);
		expect(
			stringUtils.removeHyphenCharachters(
				await contactBlock.getByTestId(ContactsBlock.PhoneEULink).getAttribute('href')
			)
		).toBe(UrlPath.PhoneEU);
	}

	public async checkClipBoardContect(expectedText: string) {
		const clipboardContent = await driver.Page.evaluate('navigator.clipboard.readText()');
		expect(clipboardContent).toBe(expectedText);
	}

	public async checkFaqSectionsExpandingAndCollapsing(container: Locator, numberOfSections: number) {
		const sections = container.getByTestId(Container.ContainerSection);
		await expect(sections).toHaveCount(numberOfSections);

		for (const section of await sections.all()) {
			const shortAnswer = section.getByTestId(Container.SectionShortAnswer);
			const fullAnswer = section.getByTestId(Container.SectionFullAnswer);
			const sectionArrow = section.getByTestId(Container.Arrow);

			await expect(section).toHaveClass(/collapsed/);
			await expect(shortAnswer).toBeVisible();
			await expect(fullAnswer).toBeHidden();

			await sectionArrow.click(); // Open section
			await expect(section).not.toHaveClass(/collapsed/);
			await expect(shortAnswer).toBeVisible();
			await expect(fullAnswer).toBeVisible();

			await sectionArrow.click(); // Collapse section
			await expect(section).toHaveClass(/collapsed/);
			await expect(shortAnswer).toBeVisible();
			await expect(fullAnswer).toBeHidden();
		}
	}

	public async checkScrollToContainerByCtaButtonClick(
		ctaButton: Locator,
		expectedContainer: string,
		viewportPart = 0.4
	) {
		await ctaButton.click();
		await expect(driver.getByTestId(expectedContainer)).toBeInViewport({ratio: viewportPart});

		await driver.Page.evaluate(() => {
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		});
	}
}

const baseDriverSteps = new BaseDriverSteps();

export {baseDriverSteps};
