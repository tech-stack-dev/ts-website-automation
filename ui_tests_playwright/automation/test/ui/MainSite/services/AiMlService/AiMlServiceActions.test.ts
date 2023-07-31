import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiMlService from '../../../../../identifiers/AiMlService';
import Button from '../../../../../identifiers/Button';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import { ExpertsLinkedInLinks } from '../../../../../preconditionsData/ExpertsLinkedInLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
});

test("Check redirect by links in 'AI’s Beneficial Impact on Industries' container from the 'AI&ML Sevice' block @Regression @AiMlService @TSWEB-694", async () => {
	const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(AiMlService.AiBeneficialImpactOnIndustries);
	const linkMap = new Map([
		[
			Button.Forbes,
			'https://www.forbes.com/sites/robtoews/2022/03/27/a-wave-of-billion-dollar-language-ai-startups-is-coming/?sh=422fd0152b14',
		],
		[Button.Salesforce, 'https://www.salesforce.com/news/stories/customer-engagement-research/'],
		[
			Button.Deloitte,
			'https://www2.deloitte.com/cn/en/pages/consumer-industrial-products/articles/ai-manufacturing-application-survey.html',
		],
		[
			Button.McKinsey,
			'https://www.mckinsey.com/featured-insights/artificial-intelligence/notes-from-the-ai-frontier-modeling-the-impact-of-ai-on-the-world-economy',
		],
	]);

	for (const entries of linkMap.entries()) {
		await aiBeneficialImpactOnIndustriesContainer.getByTestId(entries[0]).first().click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(entries[1]);
		await newPage.close();
	}
});

test("Check carousel sections and arrows in 'The Way We work' container from the 'AI&ML Sevice' block @Regression @AiMlService @TSWEB-694", async () => {
	const theWayWeWorkContainer = driver.getByTestId(AiMlService.TheWayWeWork);
	const carousel = theWayWeWorkContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
	const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Discovery\nand Research',
		'Build\nPOC',
		'Tuning and\nadjustments',
		'Build\nProduct',
		'Release\nand Support',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual(['01', '02', '03', '04', '05']);

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonNext.click();

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonPrev.click({delay: 1000});

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');

	for (let i = 0; i < allSectionTitles.length - 1; i++) {
		await carouselButtonNext.click({delay: 1000});
	}

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'true');
});

test("Check redirect by Clutch button in 'Our approach' container from the 'AI&ML Sevice' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourApproachContainer = driver.getByTestId(AiMlService.OurApproach);

	await ourApproachContainer.getByTestId(Button.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain('https://clutch.co/profile/techstack#review-1961618');
});

test("Check buttons in 'Our Experts' container from the 'AI&ML Sevice' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourExpertsContainer = driver.getByTestId(AiMlService.OurExperts);
	const buttonUrlMap = new Map([
		[
			ourExpertsContainer.getByTestId(Button.Linkedin).nth(0),
			ExpertsLinkedInLinks.YevheniiKarachevtsev,
		],
		[
			ourExpertsContainer.getByTestId(Button.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.YevheniiKarachevtsev,
		],
		[
			ourExpertsContainer.getByTestId(Button.Linkedin).nth(1),
			ExpertsLinkedInLinks.OleksandrBezrukov,
		],
		[
			ourExpertsContainer.getByTestId(Button.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksandrBezrukov,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check redirects by arrows in 'Related services' container from the 'AI&ML Sevice' block @Regression @AiMlService @TSWEB-694", async () => {
	const relatedServicesContainer = driver.getByTestId(AiMlService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
