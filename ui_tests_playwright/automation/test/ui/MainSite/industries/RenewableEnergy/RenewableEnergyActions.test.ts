import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import Buttons from '../../../../../identifiers/Buttons';
import RenewableEnergy from '../../../../../identifiers/MainSite/pages/industries/RenewableEnergy';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test("Check redirect by 'Home' breadcrumbs button in header from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const info = driver.getByTestId(RenewableEnergy.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
});

test("Check redirect by source link in 'Techstack in Numbers' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const techstackInNumbersContainer = driver.getByTestId(RenewableEnergy.TechstackInNumbers);

	await techstackInNumbersContainer.getByTestId(MainSiteButtons.DelloitteSurvey).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	await newPage.waitForLoadState('networkidle');

	expect(newPage.url()).toEqual(
		'https://www2.deloitte.com/content/dam/insights/us/articles/6387_100-Percent-Renewables/DI_100-Percent-Renewables.pdf'
	);
});

test("Check redirect by 'Check out how we built it' button in 'The Solar Energy Data Portal by Techstack' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const theSolarEnergyContainer = driver.getByTestId(RenewableEnergy.TheSolarEnergyDataPortalByTechstack);

	await theSolarEnergyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuiltIt).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(UrlPath.CaseStudies + CaseStudyPath.SolarEnergyDataPortal, Environment.Production)
	);
});

test("Check redirects by arrows in 'Our Key Areas of Expertise in Renewable Energy' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const ourKeyAreasOfExpertiseContainer = driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise);
	// const containerSection = ourKeyAreasOfExpertiseContainer.getByTestId(Container.ContainerSection);
	// const arrowUrlMap = new Map([
	// 	[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
	// 	[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
	// 	[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudAndDev)],
	// 	[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	// 	[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	// 	[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
	// 	[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
	// ]);

	const arrowUrlMap = new Map([
		[ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(0), UrlProvider.urlBuilder(UrlPath.BigData)],
		[ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(1), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[
			ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(2),
			UrlProvider.urlBuilder(UrlPath.CloudAndDev),
		],
		[
			ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(3),
			UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		],
		[
			ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(4),
			UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		],
		[
			ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(5),
			UrlProvider.urlBuilder(UrlPath.MobileDev),
		],
		[
			ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow).nth(6),
			UrlProvider.urlBuilder(UrlPath.CustomDev),
		],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
	}
});

test("Check redirect by 'Clutch Review' button in 'Why Choose Us?' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const whyChooseUsContainer = driver.getByTestId(RenewableEnergy.WhyChooseUs);

	await whyChooseUsContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.DarrenCody);
});

test("Check carousel sections, arrows and CTA button in 'How We Operate at Techstack' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const howWeOperateContainer = driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack);
	const carousel = howWeOperateContainer.getByTestId(Container.ContainerCarousel);

	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Make\ncontact', 'Speak with\na tech expert', 'Making\na proposal', 'Contract\nsigning'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'Step 1',
		'Step 2',
		'Step 3',
		'Step 4',
	]);

	await baseDriverSteps.checkCarouselArrowsClick(howWeOperateContainer);

	await expect(howWeOperateContainer.getByTestId(MainSiteButtons.TalkToAnExpert)).toBeVisible();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
