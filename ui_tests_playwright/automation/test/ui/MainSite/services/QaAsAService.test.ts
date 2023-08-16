import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import QaAsAService from '../../../../identifiers/MainSite/pages/services/QaAsAService';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import Links from '../../../../preconditionsData/Links/Links';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.QaAsAServ));
});

test("Check the header from the 'QA as a Service' block @Regression @QaAsAService @TSWEB-603", async () => {
	const info = driver.getByTestId(QaAsAService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nQA as a Service');
	await expect(info.getByTestId(Container.Title)).toHaveText('QA as a Service — Vetted Experts Available on Demand');
});

test("Check 'Request a Quote' buttons on the 'QA as a Service' page @Regression @ConsultingService @TSWEB-603", async () => {
	const containers = [QaAsAService.Info, QaAsAService.OurApproachAndAchievements];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
	}
});

test("Check the container title and number from the 'QA as a Service' block @Regression @QaAsAService @TSWEB-603", async () => {
	await expect(driver.getByTestId(QaAsAService.WhatIsQaAsAService).getByTestId(Container.ContainerTitle)).toHaveText(
		'What is QA \nas a Service?'
	);
	await expect(driver.getByTestId(QaAsAService.WhatIsQaAsAService).getByTestId(Container.ContainerNumber)).toHaveText(
		'01'
	);

	await expect(driver.getByTestId(QaAsAService.WhoIsThisServiceFor).getByTestId(Container.ContainerTitle)).toHaveText(
		'Who is this \nservice for'
	);
	await expect(
		driver.getByTestId(QaAsAService.WhoIsThisServiceFor).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(driver.getByTestId(QaAsAService.Services).getByTestId(Container.ContainerTitle)).toHaveText(
		'Services'
	);
	await expect(driver.getByTestId(QaAsAService.Services).getByTestId(Container.ContainerNumber)).toHaveText('03');

	await expect(driver.getByTestId(QaAsAService.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies: \nQA as a Service'
	);
	await expect(driver.getByTestId(QaAsAService.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText('04');

	await expect(
		driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre).getByTestId(Container.ContainerTitle)
	).toHaveText('Services that \nmeet you where \nyou are ');
	await expect(
		driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(
		driver.getByTestId(QaAsAService.OurApproachAndAchievements).getByTestId(Container.ContainerTitle)
	).toHaveText('Our Approach \nand Achievements');
	await expect(
		driver.getByTestId(QaAsAService.OurApproachAndAchievements).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(driver.getByTestId(QaAsAService.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(QaAsAService.Faq).getByTestId(Container.ContainerNumber)).toHaveText('07');

	await expect(driver.getByTestId(QaAsAService.RelatedArticles).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related Articles'
	);
	await expect(driver.getByTestId(QaAsAService.RelatedArticles).getByTestId(Container.ContainerNumber)).toHaveText(
		'08'
	);
});

test("Check the sections of the containers from the 'QA as a Service' block @Regression @QaAsAService @TSWEB-603", async () => {
	const whoIsThisServiceFor = driver.getByTestId(QaAsAService.WhoIsThisServiceFor);
	expect(await whoIsThisServiceFor.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	const servicesThatMeetYouWhereYouAre = driver.getByTestId(QaAsAService.ServicesThatMeetYouWhereYouAre);
	expect(await servicesThatMeetYouWhereYouAre.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
	]);
	expect(await servicesThatMeetYouWhereYouAre.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'Web',
		'Mobile',
		'Desktop',
		'API & Web Services',
	]);

	const ourApproachAndAchievements = driver.getByTestId(QaAsAService.OurApproachAndAchievements);
	expect(await ourApproachAndAchievements.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'Open Source \nContributions',
		'Global \nCertifications',
		'Profound \nExperience',
	]);

	const faq = driver.getByTestId(QaAsAService.Faq);
	expect(await faq.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'What is the difference\nbetween a traditional QA\nservice and QA as a service?',
		'Is QA as a service better\nthan a QA service?',
		'We have an in-house QA\nteam. Why do we need your\nregression testing services?',
		'Should we hire a\ntesting team or set up\nQA processes first?',
		'What is crowdtesting?\nHow is it different from\nQA as a service?',
		'Why is integrating QA\nprocesses into the CI/CD\nprocess important?',
	]);
});

test("Check the 'Services' blocks from the 'QA as a Service' block @Regression @QaAsAService @TSWEB-603", async () => {
	const services = driver.getByTestId(QaAsAService.Services);
	const containerBlocks = await services.getByTestId(Container.ContainerBlock).all();

	await expect(containerBlocks[0].getByTestId(Container.BlockTitle)).toHaveText('Regression testing on demand');
	expect(await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'When it is applicable',
		'Required input',
		'QA service output',
		'Service flow',
	]);

	await expect(containerBlocks[1].getByTestId(Container.BlockTitle)).toHaveText('Exploratory and usability testing');
	expect(await containerBlocks[1].getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'When it is applicable',
		'Required input',
		'QA service output',
		'Service flow',
	]);

	await expect(containerBlocks[2].getByTestId(Container.BlockTitle)).toHaveText(
		'Testing processes setup from scratch'
	);
	expect(await containerBlocks[2].getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'When it is applicable',
		'Required input',
		'QA service output',
		'Service flow',
	]);

	await expect(containerBlocks[3].getByTestId(Container.BlockTitle)).toHaveText(
		'Auditing existing company QA processes'
	);
	expect(await containerBlocks[3].getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'When it is applicable',
		'Required input',
		'QA service output',
	]);

	await expect(containerBlocks[4].getByTestId(Container.BlockTitle)).toHaveText(
		'Testing automation and integrating CI/CD'
	);
	expect(await containerBlocks[4].getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
		'When it is applicable',
		'Required input',
		'QA service output',
		'Service flow',
	]);
});

test("Check redirect by arrow in 'Our Approach and Achievements' block  from the 'QA as a Service' block @Regression @QaAsAService @TSWEB-603", async () => {
	const ourApproachContainer = driver.getByTestId(QaAsAService.OurApproachAndAchievements);

	await ourApproachContainer.getByTestId(Container.Arrow).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain(Links.Nuget);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
