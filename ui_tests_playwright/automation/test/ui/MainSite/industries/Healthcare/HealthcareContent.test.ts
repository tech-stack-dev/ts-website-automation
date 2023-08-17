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

test("Check the header from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const info = driver.getByTestId(Healthcare.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nHealthcare');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Software Development\nSolutions For\nthe Healthcare Industry'
	);
	await expect(info.getByTestId(MainSiteButtons.GetInTouch)).toBeVisible();
});

test("Check the container title and number from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	await expect(
		driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent).getByTestId(Container.ContainerTitle)
	).toHaveText('What Makes Our Team Different');
	await expect(
		driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(driver.getByTestId(Healthcare.OurExpertise).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our Expertise'
	);
	await expect(driver.getByTestId(Healthcare.OurExpertise).getByTestId(Container.ContainerNumber)).toHaveText('02');

	await expect(
		driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack).getByTestId(Container.ContainerTitle)
	).toHaveText('Beats Screening Module by Techstack');
	await expect(
		driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(
		driver.getByTestId(Healthcare.PatientCenteredStrategy).getByTestId(Container.ContainerTitle)
	).toHaveText('Patient-Centered\nStrategy');
	await expect(
		driver.getByTestId(Healthcare.PatientCenteredStrategy).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver.getByTestId(Healthcare.MostRecentIndustryFacts).getByTestId(Container.ContainerTitle)
	).toHaveText('Most Recent\nIndustry Facts');
	await expect(
		driver.getByTestId(Healthcare.MostRecentIndustryFacts).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(driver.getByTestId(Healthcare.HowWeOperate).getByTestId(Container.ContainerTitle)).toHaveText(
		'How We Operate'
	);
	await expect(driver.getByTestId(Healthcare.HowWeOperate).getByTestId(Container.ContainerNumber)).toHaveText('06');

	await expect(driver.getByTestId(Healthcare.OurWorkflow).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our Workflow'
	);
	await expect(driver.getByTestId(Healthcare.OurWorkflow).getByTestId(Container.ContainerNumber)).toHaveText('07');

	await expect(driver.getByTestId(Healthcare.CorePractices).getByTestId(Container.ContainerTitle)).toHaveText(
		'Core Practices'
	);
	await expect(driver.getByTestId(Healthcare.CorePractices).getByTestId(Container.ContainerNumber)).toHaveText('08');

	await expect(
		driver.getByTestId(Healthcare.ServingPartnersWorldwide).getByTestId(Container.ContainerTitle)
	).toHaveText('Serving Partners Worldwide');
	await expect(
		driver.getByTestId(Healthcare.ServingPartnersWorldwide).getByTestId(Container.ContainerNumber)
	).toHaveText('09');

	await expect(driver.getByTestId(Healthcare.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(Healthcare.Faq).getByTestId(Container.ContainerNumber)).toHaveText('10');

	await expect(driver.getByTestId(Healthcare.RelatedArticles).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related Articles'
	);
	await expect(driver.getByTestId(Healthcare.RelatedArticles).getByTestId(Container.ContainerNumber)).toHaveText(
		'11'
	);
});

test("Check block titles in 'What Makes Our Team Different' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const whatMakesOurTeamDifferentContainer = driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent);
	const allBlockTitles = await whatMakesOurTeamDifferentContainer.getByTestId(Container.BlockTitle).allInnerTexts();
	const testData = ['9\nyears', '16\ntech experts', '11\nprojects', '67\n%'];

	expect(allBlockTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and CTA button in 'Our Expertise' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const ourExpertiseContainer = driver.getByTestId(Healthcare.OurExpertise);
	const allSectionTitles = await ourExpertiseContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Hospital Management\nSystem',
		'Health Monitoring\nDevices And Wearables',
		'Health\nMonitoring Software',
		'UI Kit',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	await expect(ourExpertiseContainer.getByTestId(MainSiteButtons.ScheduleAMeetingNow)).toBeVisible();
});

test("Check section titles, image and CTA button in 'Beats Screening Module by Techstack' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const beatsScreeningModuleContainer = driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack);
	const allSectionTitles = await beatsScreeningModuleContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Improved\nefficiency', 'Enhanced data\nanalysis', 'Scalability'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	await expect(beatsScreeningModuleContainer.getByTestId(MainSiteImages.BeatsScreening)).toBeVisible();
	await expect(beatsScreeningModuleContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy)).toBeVisible();
});

test("Check section numbers and section titles in 'Patient-Centered Strategy' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const patientCenteredStrategyContainer = driver.getByTestId(Healthcare.PatientCenteredStrategy);
	expect(await patientCenteredStrategyContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
	]);

	const allSectionTitles = await patientCenteredStrategyContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Conducting user\nresearch',
		'Design with empathy',
		'Involving patients\nin the development\nprocess',
		'Responsible use\nof patient data',
	];
	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check block titles in 'Most Recent Industry Facts' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const mostRecentIndustryFactsContainer = driver.getByTestId(Healthcare.MostRecentIndustryFacts);
	const allBlockTitles = await mostRecentIndustryFactsContainer.getByTestId(Container.BlockTitle).allInnerTexts();
	const testData = ['1.57\nbillion users', '82\n%', '$\n641\nPPM'];

	expect(allBlockTitles.sort()).toEqual(testData.sort());
});

test("Check section numbers and section titles in 'Our Workflow' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const ourWorkflowContainer = driver.getByTestId(Healthcare.OurWorkflow);
	expect(await ourWorkflowContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);

	const allSectionTitles = await ourWorkflowContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Investigation', 'Execution', 'Performance\nand Testing', 'Analysis', 'Support and\nMaintenance'];
	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'Core Practices' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);

	const allSectionTitles = await corePracticesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Custom Software\nDevelopment',
		'Cloud & DevOps',
		'Big Data\n& Analytics',
		'Internet of Things',
		'AI & ML',
		'Mobile App\nDevelopment',
		'UI/UX Design',
	];
	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check image in 'Serving Partners Worldwide' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const servingPartnersWorldwideContainer = driver.getByTestId(Healthcare.ServingPartnersWorldwide);

	expect(await servingPartnersWorldwideContainer.getByTestId(MainSiteImages.CompleteMap)).toBeVisible();
});

test("Check section titles in 'FAQ' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const faqContainer = driver.getByTestId(Healthcare.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'What safeguards are in place to protect the privacy and security of patient data in healthcare software?',
		'How can scalability and the capacity to manage growing user loads be ensured in healthcare software?',
		'How quickly can we begin development with Techstack on our healthcare software product?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
