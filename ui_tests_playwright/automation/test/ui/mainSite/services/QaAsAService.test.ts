import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import QaAsAService from '../../../../identifiers/mainSite/pages/services/QaAsAService';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import Links from '../../../../preconditionsData/links/Links';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.QaAsAServ));
});

test(
	qase(
		5345,
		'Check the Info container from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const info = driver.getByTestId(QaAsAService.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services QA as a Service');
		await expect(info.getByTestId(Container.Title)).toHaveText(
			'QA as a Service — Vetted Experts Available on Demand'
		);
		await expect(info.getByTestId(MainSiteButtons.GetYourPersonalizedQAQuote)).toHaveText('Get your personalized QA quote');
	}
);

test(
	qase(
		5352,
		'Check the container titles and numbers from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const containers = [
			driver.getByTestId(QaAsAService.WhatIsQaAsAService),
			driver.getByTestId(QaAsAService.WhoIsThisServiceFor),
			driver.getByTestId(QaAsAService.Services),
			driver.getByTestId(QaAsAService.CaseStudies),
			driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre),
			driver.getByTestId(QaAsAService.OurApproachAndAchievements),
			driver.getByTestId(QaAsAService.GetInTouch),
			driver.getByTestId(QaAsAService.RelatedArticles),
			driver.getByTestId(QaAsAService.Faq),
		];

		const expectedData = [
			['What is QA as a Service?', '01'],
			['Who is this service for', '02'],
			['Services', '03'],
			['Case studies: QA as a Service', '04'],
			['Services that meet you where you are', '05'],
			['Our Approach and Achievements', '06'],
			['Get in Touch', '07'],
			['Related Articles', '08'],
			['FAQ', '09'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5350,
		'Check section numbers and titles in containers from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const whoIsThisServiceFor = driver.getByTestId(QaAsAService.WhoIsThisServiceFor);
		await expect(whoIsThisServiceFor.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
		]);

		const testData = [
			' Get quick feedback regarding quality, usability and reliability of product before the first launch to market.',
			' Power-up testing teams at specific development phases: regression, exploratory, usability testing.',
			' Get cost-effective QA optimization and on demand QA activities without keeping a full-time team.',
			' Decrease time for pre-release testing activities by covering them with automated tests integrated into a CI/CD process.',
			' Set up QA process quickly and properly inline with your current development processes.',
			'  Get feedback about your QA team and process efficiency, as well as improvement recommendations.',
		];

		await expect(whoIsThisServiceFor.getByTestId(Container.SectionDescription)).toHaveText(testData);

		const servicesThatMeetYouWhereYouAre = driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre);
		await expect(servicesThatMeetYouWhereYouAre.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);
		await expect(servicesThatMeetYouWhereYouAre.getByTestId(Container.SectionTitle)).toHaveText([
			'Web',
			'Mobile',
			'Desktop',
			'API & Web Services',
		]);

		const ourApproachAndAchievements = driver.getByTestId(QaAsAService.OurApproachAndAchievements);
		await expect(ourApproachAndAchievements.getByTestId(Container.SectionTitle)).toHaveText([
			'Open Source Contributions',
			'Global Certifications',
			'Profound Experience',
		]);

		const faq = driver.getByTestId(QaAsAService.Faq);
		await expect(faq.getByTestId(Container.SectionTitle)).toHaveText([
			'What is the difference between a traditional QA service and QA as a service?',
			'Is QA as a service better than a QA service?',
			'We have an in-house QA team. Why do we need your regression testing services?',
			'Should we hire a testing team or set up QA processes first?',
			'What is crowdtesting? How is it different from QA as a service?',
			'Why is integrating QA processes into the CI/CD process important?',
		]);
	}
);

test('Check CTA button text from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603', async () => {
	await expect(
		driver.getByTestId(QaAsAService.WhoIsThisServiceFor).getByTestId(MainSiteButtons.GetYourCustomQuote)
	).toHaveText('Get your custom quote');

	await expect(
		driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre).getByTestId(MainSiteButtons.RequestAQuote)
	).toHaveText('Request a quote');
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603', async () => {
	const ctaButtons = [
		driver.getByTestId(QaAsAService.Info).getByTestId(MainSiteButtons.GetYourPersonalizedQAQuote),
		driver.getByTestId(QaAsAService.WhoIsThisServiceFor).getByTestId(MainSiteButtons.GetYourCustomQuote),
		driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre).getByTestId(MainSiteButtons.RequestAQuote),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, QaAsAService.GetInTouch);
	}
});

test(
	qase(
		5356,
		'Check block and section titles in "Services" container from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const services = driver.getByTestId(QaAsAService.Services);
		const containerBlocks = await services.getByTestId(Container.ContainerBlock).all();
		const testData = ['When it is applicable', 'Required input', 'QA service output', 'Service flow'];

		await expect(containerBlocks[0].getByTestId(Container.BlockTitle)).toHaveText('Regression testing on demand');
		await expect(containerBlocks[0].getByTestId(Container.SectionTitle)).toHaveText(testData);

		await expect(containerBlocks[1].getByTestId(Container.BlockTitle)).toHaveText(
			'Exploratory and usability testing'
		);
		await expect(containerBlocks[1].getByTestId(Container.SectionTitle)).toHaveText(testData);

		await expect(containerBlocks[2].getByTestId(Container.BlockTitle)).toHaveText(
			'Testing processes setup from scratch'
		);
		await expect(containerBlocks[2].getByTestId(Container.SectionTitle)).toHaveText(testData);

		await expect(containerBlocks[3].getByTestId(Container.BlockTitle)).toHaveText(
			'Auditing existing company QA processes'
		);
		await expect(containerBlocks[3].getByTestId(Container.SectionTitle)).toHaveText([
			'When it is applicable',
			'Required input',
			'QA service output',
		]);

		await expect(containerBlocks[4].getByTestId(Container.BlockTitle)).toHaveText(
			'Testing automation and integrating CI/CD'
		);
		await expect(containerBlocks[4].getByTestId(Container.SectionTitle)).toHaveText(testData);
	}
);

test(
	qase(
		5362,
		'Check redirect by arrow in "Our Approach and Achievements" container from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(QaAsAService.OurApproachAndAchievements);

		await baseDriverSteps.checkRedirectToPage(ourApproachContainer.getByTestId(Container.Arrow), Links.Nuget);
	}
);

test(
	qase(
		4783,
		'Check sections expanding and collapsing in "FAQ" container from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const faqContainer = driver.getByTestId(QaAsAService.Faq);
		const expectedNumberOfSections = 6;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5360,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "QA as a Service" page @desktop @mobile @Regression @QaAsAService @TSWEB-603'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(QaAsAService.Info).getByTestId(MainSiteButtons.RequestAQuote),
			driver.getByTestId(QaAsAService.WhoIsThisServiceFor).getByTestId(MainSiteButtons.GetYourCustomQuote),
			driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre).getByTestId(MainSiteButtons.RequestAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, QaAsAService.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
