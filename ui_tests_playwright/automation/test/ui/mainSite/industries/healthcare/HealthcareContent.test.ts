import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Container from '../../../../../identifiers/Container';
import Healthcare from '../../../../../identifiers/mainSite/pages/industries/Healthcare';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, test, expect} from '../../../../../fixtures/DesktopMobileSetup';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Healthcare));
});

test(
	qase(5149, 'Check Info container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'),
	async () => {
		const info = driver.getByTestId(Healthcare.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nHealthcare');
		await expect(info.getByTestId(Container.Title)).toHaveText(
			'Software Development Solutions for the Healthcare Industry'
		);
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomProjectQuote)).toHaveText(
			' Get your custom project quote'
		);
	}
);

test(
	qase(
		5156,
		'Check the container title and number from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const containers = [
			driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent),
			driver.getByTestId(Healthcare.OurExpertise),
			driver.getByTestId(Healthcare.CaseStudy),
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
			['Case Study by Techstack', '03'],
			['Patient-Centered Strategy', '04'],
			['Most Recent Industry Facts', '05'],
			['How We Operate', '06'],
			['Our Workflow', '07'],
			['Core Practices', '08'],
			['Serving Partners Worldwide', '09'],
			['Request a Free No-obligation Quote', '10'],
			['Related Articles', '11'],
			['FAQ', '12'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5164,
		'Check block titles in "What Makes Our Team Different" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const whatMakesOurTeamDifferentContainer = driver.getByTestId(Healthcare.WhatMakesOurTeamDifferent);
		const allBlockTitles = whatMakesOurTeamDifferentContainer.getByTestId(Container.BlockTitle);
		const testData = ['10\nyears', '16\ntech experts', '11\nprojects', '5.0'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5172,
		'Check section titles and CTA button in "Our Expertise" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const ourExpertiseContainer = driver.getByTestId(Healthcare.OurExpertise);
		const allSectionTitles = ourExpertiseContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Hospital Management System',
			'Health Monitoring Devices And Wearables',
			'Health Monitoring Software',
			'UI Kit',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(ourExpertiseContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5177,
		'Check section titles, image and CTA button in "Case Study by Techstack" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(Healthcare.CaseStudy);
		const allSectionTitles = caseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['Improved efficiency', 'Enhanced data analysis', 'Scalability'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.BeatsScreening)).toBeVisible();

		await expect(caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5187,
		'Check section numbers and titles in "Patient-Centered Strategy" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const patientCenteredStrategyContainer = driver.getByTestId(Healthcare.PatientCenteredStrategy);
		await expect(patientCenteredStrategyContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);

		const allSectionTitles = patientCenteredStrategyContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Conducting user research',
			'Design with empathy',
			'Involving patients in the development process',
			'Responsible use of patient data',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5193,
		'Check block titles in "Most Recent Industry Facts" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const mostRecentIndustryFactsContainer = driver.getByTestId(Healthcare.MostRecentIndustryFacts);
		const allBlockTitles = mostRecentIndustryFactsContainer.getByTestId(Container.BlockTitle);
		const testData = ['1.57\nbillion users', '82\n%', '$\n641\nPPM'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5201,
		'Check carousel sections and CTA button in "How We Operate" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);
		const carousel = howWeOperateContainer.getByTestId(Container.ContainerCarousel);

		await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText([
			'Step 1',
			'Step 2',
			'Step 3',
			'Step 4',
		]);

		const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
		const testData = [
			'Make contact',
			'Speak with a tech expert',
			'Offering a service solution proposal',
			'Contract signing',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(howWeOperateContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		5215,
		'Check section numbers and section titles in "Our Workflow" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const ourWorkflowContainer = driver.getByTestId(Healthcare.OurWorkflow);
		await expect(ourWorkflowContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = ourWorkflowContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Investigation',
			'Execution',
			'Performance and Testing',
			'Analysis',
			'Support and Maintenance',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5221,
		'Check section titles in "Core Practices" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);

		const allSectionTitles = corePracticesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom Software Development',
			'Cloud & DevOps',
			'Big Data & Analytics',
			'Internet of Things',
			'AI & ML',
			'Mobile App Development',
			'UI/UX Design',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5229,
		'Check image in "Serving Partners Worldwide" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const mobileMaps = [MainSiteImages.NorthAmericaMap, MainSiteImages.EuropeMap];

		mobileMaps.forEach(async (mobileMap) => {
			const mapIdentifiers = await containerSteps.getDynamicLocator({
				desktopLocator: MainSiteImages.CompleteMap,
				mobileLocator: mobileMap,
			});

			await expect(mapIdentifiers).toBeVisible();
		});
	}
);

test(
	qase(
		5236,
		'Check section titles in "FAQ" container from the "Healthcare" page @desktop @mobile @Regression @AiMlService @TSWEB-694'
	),
	async () => {
		const faqContainer = driver.getByTestId(Healthcare.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What safeguards are in place to protect the privacy and security of patient data in healthcare software?',
			'How can scalability and the capacity to manage growing user loads be ensured in healthcare software?',
			'How quickly can we begin development with Techstack on our healthcare software product?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
