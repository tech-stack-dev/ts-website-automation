import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Container from '../../../../../identifiers/Container';
import Healthcare from '../../../../../identifiers/MainSite/pages/industries/Healthcare';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Healthcare));
});

test('Check the header from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const info = driver.getByTestId(Healthcare.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nHealthcare');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Software Development\nSolutions For\nthe Healthcare Industry'
	);
	await expect(info.getByTestId(MainSiteButtons.GetInTouch)).toHaveText('Get in Touch');
});

test('Check the container title and number from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const containers = [
		driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent),
		driver.getByTestId(Healthcare.OurExpertise),
		driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack),
		driver.getByTestId(Healthcare.PatientCenteredStrategy),
		driver.getByTestId(Healthcare.MostRecentIndustryFacts),
		driver.getByTestId(Healthcare.HowWeOperate),
		driver.getByTestId(Healthcare.OurWorkflow),
		driver.getByTestId(Healthcare.CorePractices),
		driver.getByTestId(Healthcare.ServingPartnersWorldwide),
		driver.getByTestId(Healthcare.GetInTouch),
		driver.getByTestId(Healthcare.RelatedArticles),
		driver.getByTestId(Healthcare.Faq),
	];

	const expectedData = [
		['What Makes Our Team Different', '01'],
		['Our Expertise', '02'],
		['Beats Screening Module by Techstack', '03'],
		['Patient-Centered\nStrategy', '04'],
		['Most Recent\nIndustry Facts', '05'],
		['How We Operate', '06'],
		['Our Workflow', '07'],
		['Core Practices', '08'],
		['Serving Partners Worldwide', '09'],
		['Get in Touch', '10'],
		['Related Articles', '11'],
		['FAQ', '12'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check block titles in "What Makes Our Team Different" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const whatMakesOurTeamDifferentContainer = driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent);
	const allBlockTitles = whatMakesOurTeamDifferentContainer.getByTestId(Container.BlockTitle);
	const testData = ['9\nyears', '16\ntech experts', '11\nprojects', '67\n%'];

	await expect(allBlockTitles).toHaveText(testData);
});

test('Check section titles and CTA button in "Our Expertise" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const ourExpertiseContainer = driver.getByTestId(Healthcare.OurExpertise);
	const allSectionTitles = ourExpertiseContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Hospital Management\nSystem',
		'Health Monitoring\nDevices And Wearables',
		'Health\nMonitoring Software',
		'UI Kit',
	];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(ourExpertiseContainer.getByTestId(MainSiteButtons.ScheduleAMeetingNow)).toHaveText(
		'Schedule a meeting now!'
	);
});

test('Check section titles, image and CTA button in "Beats Screening Module by Techstack" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const beatsScreeningModuleContainer = driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack);
	const allSectionTitles = beatsScreeningModuleContainer.getByTestId(Container.SectionTitle);
	const testData = ['Improved\nefficiency', 'Enhanced data\nanalysis', 'Scalability'];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(beatsScreeningModuleContainer.getByTestId(MainSiteImages.BeatsScreening)).toBeVisible();

	await expect(beatsScreeningModuleContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy)).toHaveText(
		'Read the full Case Study'
	);
});

test('Check section numbers and titles in "Patient-Centered Strategy" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const patientCenteredStrategyContainer = driver.getByTestId(Healthcare.PatientCenteredStrategy);
	await expect(patientCenteredStrategyContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
	]);

	const allSectionTitles = patientCenteredStrategyContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Conducting user\nresearch',
		'Design with empathy',
		'Involving patients\nin the development\nprocess',
		'Responsible use\nof patient data',
	];
	await expect(allSectionTitles).toHaveText(testData);
});

test('Check block titles in "Most Recent Industry Facts" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const mostRecentIndustryFactsContainer = driver.getByTestId(Healthcare.MostRecentIndustryFacts);
	const allBlockTitles = mostRecentIndustryFactsContainer.getByTestId(Container.BlockTitle);
	const testData = ['1.57\nbillion users', '82\n%', '$\n641\nPPM'];

	await expect(allBlockTitles).toHaveText(testData);
});

test('Check carousel sections and CTA button in "How We Operate" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);
	const carousel = howWeOperateContainer.getByTestId(Container.ContainerCarousel);

	await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText(['Step 1', 'Step 2', 'Step 3', 'Step 4']);

	const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
	const testData = [
		'Make\ncontact',
		'Speak with\na tech expert',
		'Offering a service solution proposal',
		'Contract\nsigning',
	];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(howWeOperateContainer.getByTestId(MainSiteButtons.ScheduleAMeeting)).toHaveText('Schedule a meeting');
});

test('Check section numbers and section titles in "Our Workflow" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const ourWorkflowContainer = driver.getByTestId(Healthcare.OurWorkflow);
	await expect(ourWorkflowContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04', '05']);

	const allSectionTitles = ourWorkflowContainer.getByTestId(Container.SectionTitle);
	const testData = ['Investigation', 'Execution', 'Performance\nand Testing', 'Analysis', 'Support and\nMaintenance'];
	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles in "Core Practices" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);

	const allSectionTitles = corePracticesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Custom Software\nDevelopment',
		'Cloud & DevOps',
		'Big Data\n& Analytics',
		'Internet of Things',
		'AI & ML',
		'Mobile App\nDevelopment',
		'UI/UX Design',
	];
	await expect(allSectionTitles).toHaveText(testData);
});

test('Check image in "Serving Partners Worldwide" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const servingPartnersWorldwideContainer = driver.getByTestId(Healthcare.ServingPartnersWorldwide);

	await expect(servingPartnersWorldwideContainer.getByTestId(MainSiteImages.CompleteMap)).toBeVisible();
});

test('Check section titles in "FAQ" container from the "Healthcare" page @Regression @AiMlService @TSWEB-694', async () => {
	const faqContainer = driver.getByTestId(Healthcare.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'What safeguards are in place to protect the privacy and security of patient data in healthcare software?',
		'How can scalability and the capacity to manage growing user loads be ensured in healthcare software?',
		'How quickly can we begin development with Techstack on our healthcare software product?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
