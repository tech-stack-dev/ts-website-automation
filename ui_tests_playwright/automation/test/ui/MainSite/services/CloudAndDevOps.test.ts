import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import Buttons from '../../../../identifiers/Buttons';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import CloudAndDevOps from '../../../../identifiers/MainSite/pages/services/CloudAndDevOps';
import {ClutchReviewLinks} from '../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {Environment} from '../../../../providers/EnvProvider';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CloudAndDev));
});

test("Check the header from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692 @TSWEB-824", async () => {
	const info = driver.getByTestId(CloudAndDevOps.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCloud & DevOps');
	await expect(info.getByTestId(Container.Title)).toHaveText('DevOps Services &\nCloud Solutions');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
});

test("Check the container title and number from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	await expect(
		driver.getByTestId(CloudAndDevOps.LeverageCloudDevelopmentServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Leverage cloud \ndevelopment \nservices');
	await expect(
		driver.getByTestId(CloudAndDevOps.LeverageCloudDevelopmentServices).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(driver.getByTestId(CloudAndDevOps.TechnologyStack).getByTestId(Container.ContainerTitle)).toHaveText(
		'Technology \nstack'
	);
	await expect(driver.getByTestId(CloudAndDevOps.TechnologyStack).getByTestId(Container.ContainerNumber)).toHaveText(
		'02'
	);

	await expect(driver.getByTestId(CloudAndDevOps.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies'
	);
	await expect(driver.getByTestId(CloudAndDevOps.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText(
		'03'
	);

	await expect(
		driver.getByTestId(CloudAndDevOps.CloudComputingDevelopmentBenefits).getByTestId(Container.ContainerTitle)
	).toHaveText('Cloud computing \ndevelopment \nbenefits');
	await expect(
		driver.getByTestId(CloudAndDevOps.CloudComputingDevelopmentBenefits).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver.getByTestId(CloudAndDevOps.OurApproachToCloudAppDevelopment).getByTestId(Container.ContainerTitle)
	).toHaveText('Our approach \nto cloud app \ndevelopment');
	await expect(
		driver.getByTestId(CloudAndDevOps.OurApproachToCloudAppDevelopment).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(
		driver.getByTestId(CloudAndDevOps.OurCloudDevOpsExperts).getByTestId(Container.ContainerTitle)
	).toHaveText('Our Leading Cloud Experts');
	await expect(
		driver.getByTestId(CloudAndDevOps.OurCloudDevOpsExperts).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(driver.getByTestId(CloudAndDevOps.RelatedServices).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related \nServices'
	);
	await expect(driver.getByTestId(CloudAndDevOps.RelatedServices).getByTestId(Container.ContainerNumber)).toHaveText(
		'07'
	);

	await expect(driver.getByTestId(CloudAndDevOps.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(CloudAndDevOps.Faq).getByTestId(Container.ContainerNumber)).toHaveText('08');

	await expect(driver.getByTestId(CloudAndDevOps.RelatedArticles).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related Articles'
	);
	await expect(driver.getByTestId(CloudAndDevOps.RelatedArticles).getByTestId(Container.ContainerNumber)).toHaveText(
		'09'
	);
});

test("Check section number and section title in 'Leverage cloud development services' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const leverageCloudDevelopmentServicesContainer = driver.getByTestId(
		CloudAndDevOps.LeverageCloudDevelopmentServices
	);
	const allSectionTitles = await leverageCloudDevelopmentServicesContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = [
		'Cloud Applications Development',
		'Cloud Integration',
		'Cloud Migration',
		'Cloud Architecture Setup',
		'Continuous Deployment & Delivery',
		'Cloud Consulting',
		'Integration of DevOps Practices',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(
		await leverageCloudDevelopmentServicesContainer.getByTestId(Container.SectionNumber).allInnerTexts()
	).toEqual(['01', '02', '03', '04', '05', '06', '07']);
});

test("Check section title in 'Technology stack' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const technologyStackContainer = driver.getByTestId(CloudAndDevOps.TechnologyStack);
	const allSectionTitles = await technologyStackContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Cloud', 'DevOps', 'CI/CD', 'Monitoring'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section number and section title in 'Cloud computing development benefits' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const cloudComputingDevelopmentBenefitsContainer = driver.getByTestId(
		CloudAndDevOps.CloudComputingDevelopmentBenefits
	);
	const allSectionTitles = await cloudComputingDevelopmentBenefitsContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = [
		'Lower costs',
		'Enhanced scalability options',
		'Improved flexibility',
		'Data loss prevention',
		'Increased security',
		'Improved insight in terms of data analysis',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(
		await cloudComputingDevelopmentBenefitsContainer.getByTestId(Container.SectionNumber).allInnerTexts()
	).toEqual(['01', '02', '03', '04', '05', '06']);
});

test("Check award cards in 'Our approach to cloud app development' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(
		CloudAndDevOps.OurApproachToCloudAppDevelopment
	);

	const awardCards = ourApproachToCloudAppDevelopmentContainer.getByTestId(Container.AwardCard);
	const awardCardsData = [
		{index: 0, alt: 'Award-1', src: 'img/awards-logos-yellow/upwork.webp'},
		{index: 1, alt: 'Award-2', src: 'img/awards-logos-yellow/clutch.webp'},
	];
	for (const awardCardImage of awardCardsData) {
		const actualCard = awardCards.nth(awardCardImage.index).locator('img');
		await expect(actualCard).toHaveAttribute('alt', awardCardImage.alt);
		await expect(actualCard).toHaveAttribute('src', awardCardImage.src);
	}
});

test("Check redirect to clutch in 'Our approach to cloud app development' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(
		CloudAndDevOps.OurApproachToCloudAppDevelopment
	);
	const clutchButton = ourApproachToCloudAppDevelopmentContainer.getByTestId(Buttons.Clutch);

	await clutchButton.hover();
	await clutchButton.click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.MarkBeare);
	await newPage.close();
});

test("Check member names and roles in 'Our Leading Cloud Experts' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const ourCloudDevOpsExpertsContainer = driver.getByTestId(CloudAndDevOps.OurCloudDevOpsExperts);
	const allMemberRoles = await ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberRole).allInnerTexts();
	const testDataRoles = [
		'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'VP of Engineering,\nLeads the Tech Experts program and team',
		'DevOps Engineer,\nElaborates on smooth development and operation',
	];

	expect(allMemberRoles.sort()).toEqual(testDataRoles.sort());

	const allMemberNames = await ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberName).allInnerTexts();
	const testDataNames = ['Ivan Ieremenko', 'Oleksii Svystun', 'Ivan Yeremenko', 'Dmytro Gamanenko'];

	expect(allMemberNames.sort()).toEqual(testDataNames.sort());
});

test("Check redirects by buttons in 'Our Leading Cloud Experts' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const ourCloudDevOpsExpertsContainer = driver.getByTestId(CloudAndDevOps.OurCloudDevOpsExperts);
	const buttonUrlMap = new Map([
		[ourCloudDevOpsExpertsContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[ourCloudDevOpsExpertsContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourCloudDevOpsExpertsContainer.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.IvanYeremenko],
		[ourCloudDevOpsExpertsContainer.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.DmytroGamanenko],
		[
			ourCloudDevOpsExpertsContainer.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanIeremenko,
		],
		[
			ourCloudDevOpsExpertsContainer.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[
			ourCloudDevOpsExpertsContainer.getByTestId(Buttons.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects by arrows in 'Related Services' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const relatedServicesContainer = driver.getByTestId(CloudAndDevOps.RelatedServices);

	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Custom software development',
		'UX/UI Design',
		'AI & ML',
		'Development consulting',
		'QA as a Service',
		'Big Data & Analytics',
		'Internet of Things',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.CloudAndDev));
	}
});

test("Check section titles in 'FAQ' container from the 'Cloud & DevOps' block @Regression @CloudAndDevOps @TSWEB-692", async () => {
	const faqContainer = driver.getByTestId(CloudAndDevOps.Faq);

	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'How do I develop a cloud\nstrategy?',
		'What do I need to do to\nprepare for the cloud?',
		'How can I ensure the cloud is secure?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
