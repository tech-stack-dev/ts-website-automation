import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import CloudDevelopment from '../../../../identifiers/MainSite/pages/services/CloudDevelopment';
import Buttons from '../../../../identifiers/Buttons';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import {Environment} from '../../../../providers/EnvProvider';
import {ClutchReviewLinks} from '../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import {ExpertNames} from '../../../../preconditionsData/ExpertNames';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test("Check the header from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692 @TSWEB-824", async () => {
	const info = driver.getByTestId(CloudDevelopment.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCloud Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('Cloud Application\nDevelopment Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
});

test("Check the container title and number from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	// Uncomment after adding data-id
	const containers = [
		driver.getByTestId(CloudDevelopment.LeverageCloudNativeDevServ),
		// driver.getByTestId(CloudDevelopment.IndustrySpecificSolution),
		// driver.getByTestId(CloudDevelopment.IndustriesWeServe),
		driver.getByTestId(CloudDevelopment.TechnologyStack),
		driver.getByTestId(CloudDevelopment.CloudComputingDevelopmentBenefits),
		driver.getByTestId(CloudDevelopment.OurApproachToCloudAppDevelopment),
		driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts),
		driver.getByTestId(CloudDevelopment.RelatedServices),
		driver.getByTestId(CloudDevelopment.Faq),
		driver.getByTestId(CloudDevelopment.RelatedArticles),
		driver.getByTestId(CloudDevelopment.GetInTouch),
	];
	// Uncomment after adding data-id
	const expectedData = [
		['Leverage Cloud Native\nDevelopment Services', '01'],
		// ['Industry-Specific Solution', '02'],
		// ['Industries We Serve', '03'],
		['Technology Stack', '04'],
		['Cloud Computing Development Benefits', '05'],
		['Our Approach\nto Cloud App Development', '06'],
		['Our Leading Cloud Experts', '07'],
		['Related Services', '08'],
		['FAQ', '09'],
		['Related Articles', '10'],
		['Get in Touch', '11'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check section number and section title in 'Leverage Cloud Native Development Services' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const leverageCloudNativeDevServContainer = driver.getByTestId(CloudDevelopment.LeverageCloudNativeDevServ);
	await expect(leverageCloudNativeDevServContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);

	const allSectionTitles = leverageCloudNativeDevServContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Cloud application development',
		'Cloud integration',
		'Cloud migration',
		'Cloud architecture setup',
		'Cloud consulting',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section title in 'Technology stack' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const technologyStackContainer = driver.getByTestId(CloudDevelopment.TechnologyStack);
	const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
	const testData = ['Cloud', 'CI/CD', 'Monitoring'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section number and section title in 'Cloud Computing Development Benefits' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const cloudComputingDevelopmentBenefitsContainer = driver.getByTestId(
		CloudDevelopment.CloudComputingDevelopmentBenefits
	);

	await expect(cloudComputingDevelopmentBenefitsContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	const allSectionTitles = cloudComputingDevelopmentBenefitsContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Lower costs',
		'Enhanced scalability options',
		'Improved flexibility',
		'Data loss prevention',
		'Increased security',
		'Improved data analysis',
	];

	expect(allSectionTitles).toHaveText(testData);
});

test("Check award cards in 'Our Approach to Cloud App Development' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(
		CloudDevelopment.OurApproachToCloudAppDevelopment
	);

	const awardCards = await ourApproachToCloudAppDevelopmentContainer.getByTestId(Container.AwardCard).all();

	for (const awardCard of awardCards) {
		await expect(awardCard).toBeVisible();
	}
});

test("Check redirect to clutch in 'Our Approach to Cloud App Development' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(
		CloudDevelopment.OurApproachToCloudAppDevelopment
	);
	const clutchButton = ourApproachToCloudAppDevelopmentContainer.getByTestId(Buttons.Clutch);

	await clutchButton.click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.MarkBeare);
	await newPage.close();
});

test("Check member names and roles in 'Our Leading Cloud Experts' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourCloudDevOpsExpertsContainer = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const allMemberRoles = ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'VP of Engineering,\nLeads the Tech Experts program and team',
		'Senior Full Stack Software Engineer,\nLeads vital development initiatives',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.IvanIeremenko,
		ExpertNames.OleksiiSvystun,
		ExpertNames.IvanYeremenko,
		ExpertNames.VladyslavUshakov,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test.skip("Check redirects by buttons in 'Our Leading Cloud Experts' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourLeadingCloudExperts = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const buttonUrlMap = new Map([
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.IvanYeremenko],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.VladyslavUshakov],
		[
			ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanIeremenko,
		],
		[
			ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[
			ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
		[
			ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.VladyslavUshakov,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects by arrows in 'Related Services' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const relatedServicesContainer = driver.getByTestId(CloudDevelopment.RelatedServices);

	const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'DevOps',
		'Custom software development',
		'UX/UI Design',
		'AI & ML',
		'Development consulting',
		'QA as a Service',
		'Big Data & Analytics',
		'Internet of Things',
	];

	await expect(allSectionTitles).toHaveText(testData);

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
		await arrow.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
	}
});

test("Check section titles in 'FAQ' container from the 'Cloud Development' block @Regression CloudDevelopment @TSWEB-692", async () => {
	const faqContainer = driver.getByTestId(CloudDevelopment.Faq);

	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'How do I develop a cloud\nstrategy?',
		'How can I get started with cloud application development services?',
		'Can you migrate our existing on-premises applications to the cloud?',
		'Can you integrate cloud applications with other systems or third-party services?',
		'What do I need to do to\nprepare for the cloud?',
		'How can I ensure the cloud is secure?',
		'What are the advantages of cloud-native application development?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
