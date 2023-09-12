import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import UxUiDesign from '../../../../identifiers/MainSite/pages/services/UxUiDesign';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import {ExpertNames} from '../../../../preconditionsData/ExpertNames';
import Links from '../../../../preconditionsData/Links/Links';
import Buttons from '../../../../identifiers/Buttons';
import ExpertsBehanceLinks from '../../../../preconditionsData/Links/ExpertsBehanceLinks';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {Environment} from '../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import MainSiteLinks from '../../../../identifiers/MainSite/MainSiteLinks';

// Divide tests for Content and Actions in scope of TSWEB-1028
test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
});

test("Check the header from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const info = driver.getByTestId(UxUiDesign.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nUX/UI Design');
	await expect(info.getByTestId(Container.Title)).toHaveText('UX/UI Design\nServices');
});

test("Check 'Request a Quote' buttons from the 'UX/UI Design' page @Regression @UxUiDesign @TSWEB-670", async () => {
	const containers = [UxUiDesign.Info];

	for (const container of containers) {
		await expect(driver.getByTestId(container).getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
	}
});

test("Check the container title and number from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const containers = [
		driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices),
		driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb),
		driver.getByTestId(UxUiDesign.OurUiUxServices),
		// driver.getByTestId(UxUiDesign.SuccessStories), // Uncomment in scope of TSWEB-1028
		driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow),
		driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct),
		// driver.getByTestId(UxUiDesign.OurApproach), // Uncomment in scope of TSWEB-1028
		// driver.getByTestId(UxUiDesign.DesignThinkingProcess), // Uncomment in scope of TSWEB-1028
		driver.getByTestId(UxUiDesign.RelatedServices),
		driver.getByTestId(UxUiDesign.GetInTouch),
		driver.getByTestId(UxUiDesign.RelatedArticles),
		driver.getByTestId(UxUiDesign.Faq),
	];

	const expectedData = [
		['Get Custom UX and UI\nDesign Services', '01'],
		['We Build UX/UI\nfor Mobile & Web', '02'],
		['Our UI/UX Services', '03'],
		// ['Success Stories', '04'], // Uncomment in scope of TSWEB-1028
		['Typical UX/UI Design Workflow', '05'],
		['We Never Stop\nImproving Your Product', '06'],
		// ['Our Approach', '07'], // Uncomment in scope of TSWEB-1028
		// ['Design Thinking\nProcess', '08'], // Uncomment in scope of TSWEB-1028
		['Related Services', '09'],
		['Get in Touch', '10'],
		['Related Articles', '11'],
		['FAQ', '12'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check section numbers and section titles in 'Get Custom UX and UI Design Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const getCustomUxAndUiDesignServicesContainer = driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices);

	await expect(getCustomUxAndUiDesignServicesContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
	]);

	const allSectionTitles = getCustomUxAndUiDesignServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'A design team integrated into your product development process',
		'User-friendly interface that meets user needs and behavior',
		'A simple design system for easy maintenance, development, and support',
		'Efficient cross-team communication for better and faster outcomes',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'We Build UX/UI for Mobile & Web' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weBuildUxUiForMobileWebContainer = driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb);
	const allSectionTitles = weBuildUxUiForMobileWebContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = ['UX design', 'UI design', 'Web design', 'Mobile app design'];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);
});

test("Check section titles in 'Our UI/UX Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const ourUiUxServicesContainer = driver.getByTestId(UxUiDesign.OurUiUxServices);
	const allSectionTitles = ourUiUxServicesContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = [
		'UX audit',
		'Competitor analysis',
		'User research',
		'Product structure\nand strategy',
		'Wireframing',
		'Prototyping',
		'Usability testing',
		'Interface visualization',
		'Seamless design documentation',
		'Design implementation control',
	];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);
});

test("Check carousel sections and arrows in 'Typical UX/UI Design Workflow' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const typicalUxUiDesignWorkflowContainer = driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow);
	const carousel = typicalUxUiDesignWorkflowContainer.getByTestId(Container.ContainerCarousel);
	const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
	const testData = [
		'Business requirements allocation',
		'Market and business domain analysis',
		'User research',
		'Brainstorming',
		'User flow creation',
		'Wireframing',
		'Prototyping',
		'Refining ideas',
		'Visual design',
		'Design documentation creation',
		'Seamless improvement',
	];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
	]);

	await baseDriverSteps.checkCarouselArrowsClick(typicalUxUiDesignWorkflowContainer);
});

test("Check member names and roles in 'We Never Stop Improving Your Product' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const allMemberRoles = weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'Head of Design, Product Designer',
		'UX/UI Designer',
		'UX/UI Designer',
		'UX/UI Designer',
		'UX/UI Designer',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.DmytroDytiuk,
		ExpertNames.YuliaMelnychenko,
		ExpertNames.ElizabethMalygina,
		ExpertNames.HannaZhyhan,
		ExpertNames.YelyzavetaLvova,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test("Check social network links in 'We Never Stop Improving Your Product' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const buttonLinkMap = new Map([
		[weNeverStopImprovingYourProductContainer.getByTestId(MainSiteLinks.Instagram), Links.Instagram],
		[weNeverStopImprovingYourProductContainer.getByTestId(MainSiteLinks.Tiktok), Links.TikTokDesign],
	]);

	for (const [button, url] of buttonLinkMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check experts links in 'We Never Stop Improving Your Product' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weNeverStopContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const buttonLinkMap = new Map([
		[weNeverStopContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.DmytroDytiuk],
		[weNeverStopContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.YuliaMelnychenko],
		[weNeverStopContainer.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.ElizabethMalygina],
		[weNeverStopContainer.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.HannaZhyhan],
		[weNeverStopContainer.getByTestId(Buttons.LinkedIn).nth(4), ExpertsLinkedInLinks.YelyzavetaLvova],
		[
			weNeverStopContainer.getByTestId(Buttons.Blog),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroDytiuk,
		],
		[weNeverStopContainer.getByTestId(Buttons.Behance), ExpertsBehanceLinks.DmytroDytuk],
	]);

	for (const [button, url] of buttonLinkMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

// Unskip after adding data-id in scope of TSWEB-1028
test.skip("Check section titles in 'Our Approach' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const ourApproachContainer = driver.getByTestId(UxUiDesign.OurApproach);
	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Inspiration', 'Ideation', 'Implementation'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'Related Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
	const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Mobile Development',
		'Consulting',
		'Custom Software \nDevelopment',
		'AI & ML',
		'Big Data & Analytics',
		'Internet of Things',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check redirects by arrows in 'Related Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	const uxUiPageUrl = UrlProvider.urlBuilder(UrlPath.UiUxDesign);
	await baseDriverSteps.checkRedirectToPagesInSameTab(arrowUrlMap, uxUiPageUrl);
});

test("Check section titles in 'FAQ' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const faqContainer = driver.getByTestId(UxUiDesign.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'What is the first step when\nwe start working with a\nproduct?',
		'Why do we need to research the market, users, and competitors?',
		'Why are UX services\nimportant?',
		'How can UI services help your product?',
		'How can a UI/UX design services company help with UX/UI development services?',
		'What does your design-\ndevelopment collaboration\nlook like?',
		'How quickly can you make UX/UI design for a product and/or onboard a design team?',
		'What approach does the design team utilize?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
