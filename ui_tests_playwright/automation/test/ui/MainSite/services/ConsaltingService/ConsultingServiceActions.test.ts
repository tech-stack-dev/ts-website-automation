import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import ConsultingService from '../../../../../identifiers/ConsultingService';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test("Check carousel sections and arrows in 'Consulting process' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingProcessContainer = driver.getByTestId(ConsultingService.ConsultingProcess);
	const carousel = consultingProcessContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
	const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Discovery', 'Analysis', 'Brainstorming', 'Presentation', 'Implementation', 'Touch base'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

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

test("Check redirects by buttons in 'Consulting experts' container from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
	const buttonUrlMap = new Map([
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(0),
			'https://www.linkedin.com/in/ivan-ieremenko/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanIeremenko,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(1),
			'https://ua.linkedin.com/in/aleksey-svistun',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(2),
			'https://www.linkedin.com/in/yevhenii-karachevtsev-372749236/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.YevheniiKarachevtsev,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(3),
			'https://www.linkedin.com/in/vitalii-dolotov/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.VitaliiDolotov,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(4),
			'https://www.linkedin.com/in/ivan-yeremenko-a464125a/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(4),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(5),
			'https://www.linkedin.com/in/dima-dityuk/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(5),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroDytiuk,
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(6),
			'https://www.linkedin.com/in/shtapauk/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(6),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroShtapauk,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects in Open source contributions block  in 'Our approach' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);
	const allSectionTitles = await ourApproachContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Open source contributions', 'Global certifications', 'Profound experience'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	ourApproachContainer.getByTestId(Container.Arrow).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain('https://www.nuget.org/profiles/VitaliiDolotov');
});

test("Check redirects by arrows in 'Related Services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.ConsultingServ));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
