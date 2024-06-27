import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import FrontEndDevelopment from '../../../../../identifiers/mainSite/pages/services/FrontEndDevelopment';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment));
});

test('Check the Info container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const info = driver.getByTestId(FrontEndDevelopment.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nFront-End Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('Front-End Development\nServices');
	await expect(info.getByTestId(MainSiteButtons.GetYourCustomFeDevelopmentQuote)).toHaveText(
		'Get your custom FE development quote'
	);
});

test('Check the container titles and numbers from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const containers = [
		driver.getByTestId(FrontEndDevelopment.TeamExpertise),
		driver.getByTestId(FrontEndDevelopment.FrontedWebDevelopment),
		driver.getByTestId(FrontEndDevelopment.TechnologyStack),
		driver.getByTestId(FrontEndDevelopment.CaseStudy),
		driver.getByTestId(FrontEndDevelopment.WhyTechstack),
		driver.getByTestId(FrontEndDevelopment.OurExperts),
		driver.getByTestId(FrontEndDevelopment.CooperationModels),
		driver.getByTestId(FrontEndDevelopment.HowWeCanHelp),
		driver.getByTestId(FrontEndDevelopment.FrontEndDevelopmentProcess),
		driver.getByTestId(FrontEndDevelopment.RelatedServices),
		driver.getByTestId(FrontEndDevelopment.GetInTouch),
		driver.getByTestId(FrontEndDevelopment.RelatedArticles),
		driver.getByTestId(FrontEndDevelopment.Faq),
	];

	const expectedData = [
		['Team Expertise', '01'],
		['Frontend Web Development Services', '02'],
		['Technology stack', '03'],
		['Front-End Development Services Case Studies', '04'],
		['Why Techstack', '05'],
		['Our Front End Development Experts', '06'],
		['Cooperation Models', '07'],
		['How We Can Help', '08'],
		['Front-End Development Process', '09'],
		['Related Services', '10'],
		['Get in Touch', '11'],
		['Front-End Development Articles', '12'],
		['FAQ', '13'],
	];
	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check block titles in "Team Expertise" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const teamExpertise = driver.getByTestId(FrontEndDevelopment.TeamExpertise);
	const allBlockTitles = teamExpertise.getByTestId(Container.BlockTitle);
	const testData = ['45\nReactJS pioneers', '40\nFull-Stack JS experts', '7\n+ years in leading\nframeworks'];

	await expect(allBlockTitles).toHaveText(testData);
});

test('Check section numbers, titles and CTA button text in "Frontend Web Development Services" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const frontedWebDevelopment = driver.getByTestId(FrontEndDevelopment.FrontedWebDevelopment);

	await expect(frontedWebDevelopment.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
	]);

	const allSectionTitles = frontedWebDevelopment.getByTestId(Container.SectionTitle);
	const testData = [
		'Custom Web App Development',
		'Progressive Web App Development',
		'Single Page App Development',
		'Mobile App Development',
		'Design System Development and Implementation',
		'Performance Optimization',
		'CMS Integration',
	];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(frontedWebDevelopment.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText('Get your quote now');
});

test('Check section titles in "Technology stack" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const technologyStackContainer = driver.getByTestId(FrontEndDevelopment.TechnologyStack);
	const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Language',
		'Frameworks',
		'State Management',
		'Build Tools',
		'Design',
		'Rich Content',
		'Web Optimization & Analytics',
		'Content Management',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles, image and CTA in "Front-End Development Services Case Studies" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const frontEndCaseStudiesContainer = driver.getByTestId(FrontEndDevelopment.CaseStudy);
	const actualSectionTitles = frontEndCaseStudiesContainer.getByTestId(Container.SectionTitle);
	const expectSectionTitles = [
		'Comprehensive Design System',
		'Transition to Storybook',
		'Automated UI Testing',
		"Creation of the 'QA Automation Middleware' library",
		'Seamless Internationalization',
		'Reusable Elements and Patterns',
		'FE-BE Boilerplate',
	];

	await expect(actualSectionTitles).toHaveText(expectSectionTitles);

	await expect(frontEndCaseStudiesContainer.getByTestId(MainSiteImages.FrontendCaseStudy)).toBeVisible();
	await expect(frontEndCaseStudiesContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
		'Check out how we build it'
	);
});

test('Check section titles in "Why Techstack" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const whyTechstackContainer = driver.getByTestId(FrontEndDevelopment.WhyTechstack);
	const actualSectionTitles = whyTechstackContainer.getByTestId(Container.SectionTitle);
	const expectSectionTitles = [
		'Our approach to front-end development services',
		"Access our entire company's expertise",
		"Techstack's Guilds",
		'Trainee Programs & Mentorship',
		'Data-driven innovation',
		'9 years of experience',
		'5.0-Star Clutch Rating',
		'Handling up to 100 k elements',
	];
	await expect(actualSectionTitles).toHaveText(expectSectionTitles);
});

test('Check member names and roles in "Our Front End Development Experts" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const ourFrontEndExpertsContainer = driver.getByTestId(FrontEndDevelopment.OurExperts);
	const actualMemberRoles = ourFrontEndExpertsContainer.getByTestId(Container.MemberRole);
	const expectedDataRoles = [
		'Associate Software Architect,\nLeads vital development initiatives',
		'Front-end Engineer, Optimizes web usability,\ncross-browser compatibility, and performance',
		'Front-end Developer,\nCreates seamless web interactions',
	];
	await expect(actualMemberRoles).toHaveText(expectedDataRoles);

	const actualMemberNames = ourFrontEndExpertsContainer.getByTestId(Container.MemberName);
	const expectedDataNames = [ExpertNames.VladyslavUshakov, ExpertNames.DmytroBohdanov, ExpertNames.PavloGrydzhuk];
	await expect(actualMemberNames).toHaveText(expectedDataNames);
});

test('Check section numbers and titles, and CTA in "Cooperation Models" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const cooperationModelsContainer = driver.getByTestId(FrontEndDevelopment.CooperationModels);

	await expect(cooperationModelsContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);

	const actualSectionTitles = cooperationModelsContainer.getByTestId(Container.SectionTitle);
	const expectedData = ['Team augmentation', 'Dedicated development team', 'R&D partnership'];

	await expect(actualSectionTitles).toHaveText(expectedData);

	await expect(cooperationModelsContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
});

test('Check section numbers and titles in "How We Can Help" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const howWeCanHelpContainer = driver.getByTestId(FrontEndDevelopment.HowWeCanHelp);
	await expect(howWeCanHelpContainer.getByTestId(Container.SectionNumber)).toHaveText([
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
	]);

	const actualSectionTitles = howWeCanHelpContainer.getByTestId(Container.SectionTitle);
	const expectedData = [
		'Scalability',
		'End-to-End security',
		'CMS Integration',
		'Performance',
		'A/B testing',
		'Creating standards in team',
		'Granular reload',
		'Extensive analytics',
		'Integration for verification of customers',
		'Improvements for customer engagement',
	];

	await expect(actualSectionTitles).toHaveText(expectedData);
});

test('Check carousel section numbers, titles and CTA in "Front-End Development Process" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const frontEndDevelopmentProcessContainer = driver.getByTestId(FrontEndDevelopment.FrontEndDevelopmentProcess);
	const carousel = frontEndDevelopmentProcessContainer.getByTestId(Container.ContainerCarousel);
	const carouselSections = await carousel.getByTestId(Container.CarouselSection).all();

	for (let i = 1; i <= carouselSections.length; i++) {
		const sectionNumber = i.toString().padStart(2, '0');
		await expect(carousel.getByTestId(Container.SectionNumber).nth(i - 1)).toHaveText(sectionNumber);
	}

	await expect(carousel.getByTestId(Container.SectionTitle)).toHaveText([
		'Discovery Phase',
		'Pre-Engagement Phase',
		'Engagement Phase',
		'Delivery Phase',
		'Release, maintenance & support',
	]);

	await expect(frontEndDevelopmentProcessContainer.getByTestId(MainSiteButtons.ReceiveAFreeQuote)).toHaveText(
		'Receive a free quote'
	);
});

test('Check section titles in "Related Services" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const relatedServicesContainer = driver.getByTestId(FrontEndDevelopment.RelatedServices);

	const actualSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const expectedData = [
		'UI/UX Design',
		'Back-End Development',
		'QA as a Service',
		'Consulting Services',
		'Custom Software Development',
		'Big Data & Analytics',
		'Internet of Things',
	];

	await expect(actualSectionTitles).toHaveText(expectedData);
});

test('Check section titles in "FAQ" container from the "Front End Development" page @desktop @mobile @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const faqContainer = driver.getByTestId(FrontEndDevelopment.Faq);

	const actualSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const expectData = [
		'What is the advantage of Progressive Web App Development?',
		'How can Single Page App Development enhance user experience?',
		'Do you offer Mobile App Development for different platforms?',
		'How does Design System Development and Implementation benefit my digital assets?',
		'What Sets Your Front End Development Services Apart?',
		'How Do You Optimize Website Performance?',
		'What are the main technologies used for Front End Development at Techstack?',
		'What sets Techstack apart from other frontend development service providers?',
	];

	await expect(actualSectionTitles).toHaveText(expectData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
