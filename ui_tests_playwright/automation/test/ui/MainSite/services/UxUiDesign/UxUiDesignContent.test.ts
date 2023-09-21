import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import UxUiDesign from '../../../../../identifiers/MainSite/pages/services/UxUiDesign';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';

const RequestAQuoteButtonText = 'Request a Quote';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
});

test('Check the info container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const info = driver.getByTestId(UxUiDesign.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nUX/UI Design');
	await expect(info.getByTestId(Container.Title)).toHaveText('UX/UI Design\nServices');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(RequestAQuoteButtonText);
});

test('Check the container titles and numbers from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const containers = [
		driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices),
		driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb),
		driver.getByTestId(UxUiDesign.OurUiUxServices),
		driver.getByTestId(UxUiDesign.SuccessStories),
		driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow),
		driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct),
		driver.getByTestId(UxUiDesign.OurApproach),
		driver.getByTestId(UxUiDesign.DesignThinkingProcess),
		driver.getByTestId(UxUiDesign.RelatedServices),
		driver.getByTestId(UxUiDesign.GetInTouch),
		driver.getByTestId(UxUiDesign.RelatedArticles),
		driver.getByTestId(UxUiDesign.Faq),
	];

	const expectedData = [
		['Get Custom UX and UI\nDesign Services', '01'],
		['We Build UX/UI\nfor Mobile & Web', '02'],
		['Our UI/UX Services', '03'],
		['Success Stories', '04'],
		['Typical UX/UI Design Workflow', '05'],
		['We Never Stop\nImproving Your Product', '06'],
		['Our Approach', '07'],
		['Design Thinking\nProcess', '08'],
		['Related Services', '09'],
		['Get in Touch', '10'],
		['Related Articles', '11'],
		['FAQ', '12'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check section numbers and titles in "Get Custom UX and UI Design Services" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const getCustomUxUiContainer = driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices);

	await expect(getCustomUxUiContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

	const allSectionTitles = getCustomUxUiContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'A design team integrated into your product development process',
		'User-friendly interface that meets user needs and behavior',
		'A simple design system for easy maintenance, development, and support',
		'Efficient cross-team communication for better and faster outcomes',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles in "We Build UX/UI for Mobile & Web" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const weBuildUxUiForMobileWebContainer = driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb);
	const allSectionTitles = weBuildUxUiForMobileWebContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = ['UX design', 'UI design', 'Web design', 'Mobile app design'];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);
});

test('Check section titles and CTA button in "Our UI/UX Services" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
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

	await expect(ourUiUxServicesContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
		RequestAQuoteButtonText
	);
});

test('Check section titles, image and CTA button in "Success Stories" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const successStoriesContainer = driver.getByTestId(UxUiDesign.SuccessStories);
	const allSectionTitles = successStoriesContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = [
		'Upgraded patient data management system',
		'Designed intuitive web application',
		'Increased efficiency and saved time',
		'Provided critical information for research',
		'Improved healthcare and patient care',
	];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);

	await expect(successStoriesContainer.getByTestId(MainSiteImages.MedicalDashboard)).toBeVisible();

	await expect(successStoriesContainer.getByTestId(MainSiteButtons.ReadFullCaseStudies)).toHaveText(
		'Read Full Case Studies'
	);
});

test('Check carousel section numbers and titles in "Typical UX/UI Design Workflow" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const typicalUxUiDesignWorkflowContainer = driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow);
	const carousel = typicalUxUiDesignWorkflowContainer.getByTestId(Container.ContainerCarousel);

	for (let i = 1; i <= 11; i++) {
		const sectionNumber = i.toString().padStart(2, '0');
		await expect(carousel.getByTestId(Container.SectionNumber).nth(i - 1)).toHaveText(sectionNumber);
	}

	await expect(carousel.getByTestId(Container.SectionTitle)).toHaveText([
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
	]);
});

test('Check member names and roles, and CTA button in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const allMemberNames = weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.DmytroDytiuk,
		ExpertNames.YuliaMelnychenko,
		ExpertNames.ElizabethMalygina,
		ExpertNames.HannaZhyhan,
		ExpertNames.YelyzavetaLvova,
	];

	await expect(allMemberNames).toHaveText(testDataNames);

	const allMemberRoles = weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'Head of Design, Product Designer',
		'UX/UI Designer',
		'UX/UI Designer',
		'UX/UI Designer',
		'UX/UI Designer',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	await expect(weNeverStopImprovingYourProductContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
		RequestAQuoteButtonText
	);
});

test('Check section titles in "Our Approach" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const ourApproachContainer = driver.getByTestId(UxUiDesign.OurApproach);
	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Inspiration', 'Ideation', 'Implementation'];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section numbers and titles in "Design Thinking Process" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const designThinkingProcessContainer = driver.getByTestId(UxUiDesign.DesignThinkingProcess);

	await expect(designThinkingProcessContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);

	const allSectionTitles = designThinkingProcessContainer.getByTestId(Container.SectionTitle);
	const testData = [' Emphasize', 'Define', 'Ideate', 'Prototype', 'Test'];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles in "Related Services" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
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

test('Check section titles in "FAQ" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
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
