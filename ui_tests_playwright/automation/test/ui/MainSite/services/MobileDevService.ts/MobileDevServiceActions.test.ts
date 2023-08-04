import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Button from '../../../../../identifiers/Button';
import MobileDevService from '../../../../../identifiers/MobileDevService';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/ExpertsLinkedInLinks';
import {ClutchReviewLinks} from '../../../../../preconditionsData/ClutchReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test("Check redirects by buttons in 'Our Approach to Mobile App Development Services' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproachToMobileAppDevServices);
	const clutchButtons = await ourApproachContainer.getByTestId(Button.Clutch).all();

	const buttonMap = new Map([
		[clutchButtons[0], ClutchReviewLinks.AnonymousPeerToPeer],
		[clutchButtons[1], ClutchReviewLinks.AnonymousMedicalDevice],
	]);

	for (const [button, url] of buttonMap) {
		await button.hover();
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check carousel sections and arrows in 'Mobile App Development Process' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const mobileAppDevProcessContainer = driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess);
	const carousel = mobileAppDevProcessContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
	const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Investigation', 'New products', 'Existing products', 'Execution', 'Performance', 'Analysis'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual(['01', '02', '03', '04']);

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonNext.click({delay: 1000});

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonPrev.click({delay: 1000});

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');

	const clickCount = allSectionTitles.length;
	for (let i = 0; i < clickCount; i++) {
		await carouselButtonNext.click({delay: 1000});
	}

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'true');
});

test("Check section titles and redirects by buttons in 'We Never Stop Improving Your Product' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(
		MobileDevService.WeNeverStopImprovingYourProduct
	);
	const allSectionTitles = await weNeverStopImprovingYourProductContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = ['Tech Experts Team', 'Development Team', 'Management Team'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	const buttonUrlMap = new Map([
		[
			weNeverStopImprovingYourProductContainer.getByTestId(Button.Linkedin).nth(0),
			ExpertsLinkedInLinks.YevheniiKarachevtsev,
		],
		[
			weNeverStopImprovingYourProductContainer.getByTestId(Button.Linkedin).nth(1),
			ExpertsLinkedInLinks.IvanYeremenko,
		],
		[
			weNeverStopImprovingYourProductContainer.getByTestId(Button.Linkedin).nth(2),
			ExpertsLinkedInLinks.MariaDarmanian,
		],
		[
			weNeverStopImprovingYourProductContainer.getByTestId(Button.Linkedin).nth(3),
			ExpertsLinkedInLinks.DmytroShtapauk,
		],
		[
			weNeverStopImprovingYourProductContainer.getByTestId(Button.Linkedin).nth(4),
			ExpertsLinkedInLinks.VitaliiDolotov,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check redirects by arrows in 'Related Services' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const relatedServicesContainer = driver.getByTestId(MobileDevService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.MobileDev));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
