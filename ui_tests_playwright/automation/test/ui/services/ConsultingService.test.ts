import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import UrlPath from '../../../providers/UrlPath';
import Container from '../../../identifiers/Container';
import ConsultingService from '../../../identifiers/ConsultingService';
import {serviceUrl} from '../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../enum/ServicesEnum';
import Button from '../../../identifiers/Button';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test("Check the header from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const info = driver.getByTestId(ConsultingService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nConsulting Service');
	await expect(info.getByTestId(Container.Title)).toHaveText('Get an expert review of your software systems');
});

test("Check 'Request a Quote' buttons on the 'Consulting service' page @Regression @ConsultingService @TSWEB-697", async () => {
	const containers = [ConsultingService.Info, ConsultingService.ConsultingProcess, ConsultingService.RelatedServices];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(Button.RequestAQuote)).toBeVisible();
	}
});

test("Check the container title and number from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	await expect(
		driver
			.getByTestId(ConsultingService.InformationTechnologyConsultingServices)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Information technology consulting services');
	await expect(
		driver
			.getByTestId(ConsultingService.InformationTechnologyConsultingServices)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(
		driver.getByTestId(ConsultingService.ConsultingBenefits).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting benefits');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingBenefits).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(
		driver.getByTestId(ConsultingService.OurITConsultingServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Our IT consulting services');
	await expect(
		driver.getByTestId(ConsultingService.OurITConsultingServices).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(
		driver.getByTestId(ConsultingService.DevelopmentProcessAudit).getByTestId(Container.ContainerTitle)
	).toHaveText('Development process audit');

	await expect(driver.getByTestId(ConsultingService.SoftwareAudit).getByTestId(Container.ContainerTitle)).toHaveText(
		'Software audit'
	);

	await expect(
		driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting process');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver.getByTestId(ConsultingService.ConsultingExperts).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting experts');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingExperts).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(driver.getByTestId(ConsultingService.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies'
	);
	await expect(driver.getByTestId(ConsultingService.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText(
		'06'
	);

	await expect(driver.getByTestId(ConsultingService.OurApproach).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our approach'
	);
	await expect(driver.getByTestId(ConsultingService.OurApproach).getByTestId(Container.ContainerNumber)).toHaveText(
		'07'
	);

	await expect(driver.getByTestId(ConsultingService.WeMakeAnImpact).getByTestId(Container.ContainerTitle)).toHaveText(
		'We make an impact'
	);
	await expect(
		driver.getByTestId(ConsultingService.WeMakeAnImpact).getByTestId(Container.ContainerNumber)
	).toHaveText('08');

	await expect(
		driver.getByTestId(ConsultingService.RelatedServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Related \nservices');
	await expect(
		driver.getByTestId(ConsultingService.RelatedServices).getByTestId(Container.ContainerNumber)
	).toHaveText('09');

	await expect(driver.getByTestId(ConsultingService.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(ConsultingService.Faq).getByTestId(Container.ContainerNumber)).toHaveText('10');

	await expect(
		driver.getByTestId(ConsultingService.RelatedArticles).getByTestId(Container.ContainerTitle)
	).toHaveText('Related articles');
	await expect(
		driver.getByTestId(ConsultingService.RelatedArticles).getByTestId(Container.ContainerNumber)
	).toHaveText('11');
});

test("Check section numbers and section titles in 'Information technology consulting services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const informationTechnologyConsultingServicesContainer = driver.getByTestId(
		ConsultingService.InformationTechnologyConsultingServices
	);
	const allSectionTitles = await informationTechnologyConsultingServicesContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = ['Infrastructure', 'Process audit', 'CI/CD roadmap', 'Testing strategy', 'UX analysis'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(
		await informationTechnologyConsultingServicesContainer.getByTestId(Container.SectionNumber).allInnerTexts()
	).toEqual(['01', '02', '03', '04', '05']);
});

test("Check section titles in 'Consulting benefits' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingBenefitsContainer = driver.getByTestId(ConsultingService.ConsultingBenefits);
	const allSectionTitles = await consultingBenefitsContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Eliminate waste of effort and focus on value;',
		'Minimize technical debt;',
		'Improve code quality and release a quality product;',
		'Improve motivation and engineering culture;',
		'Optimize infrastructure costs;',
		'Remove production issues and keep the environment stable.',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'Development process audit' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const developmentProcessAuditContainer = driver.getByTestId(ConsultingService.DevelopmentProcessAudit);
	const allSectionTitles = await developmentProcessAuditContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Project management\nprocess',
		'Development\nprocess',
		'Release process /\nIntegration layer',
		'QA\nprocess',
		'Business analytics\nprocess',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'Software audit' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const softwareAuditContainer = driver.getByTestId(ConsultingService.SoftwareAudit);
	const allSectionTitles = await softwareAuditContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Architecture',
		'AWS',
		'Code quality',
		'Security',
		'UX / UI',
		'Testing artifacts',
		'Database and data model',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check carousel sections and arrows in 'Consulting process' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingProcessContainer = driver.getByTestId(ConsultingService.ConsultingProcess);
	const carousel = consultingProcessContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
	const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Discovery', 'Analysis', 'Brainstorming', 'Presentation', 'Implementation', 'Touch base'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonNext.click();

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonPrev.click({delay: 1000});

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	
	for (let i = 0; i < allSectionTitles.length - 1; i++) {
		await carouselButtonNext.click({delay: 1000});
	}

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'true');
});

test("Check member names and roles in 'Consulting experts' container from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
	const allMemberRoles = await consultingExpertsContainer.getByTestId(Container.MemberRole).allInnerTexts();
	const testDataRoles = [
		'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'R&D Engineer, Software Engineering Lead,\nYevhenii will advise the best custom solution',
		'Sr. Director of Quality Engineering,\nOversees technology-related initiatives',
		'VP of Engineering,\nFull-stack development and microservices expert',
		'Chief Creative Officer,\nAligns UX with users’ needs / business goals',
		'Head of Account Management,\nDrives cross-functional process transformation',
	];

	expect(allMemberRoles.sort()).toEqual(testDataRoles.sort());

	const allMemberNames = await consultingExpertsContainer.getByTestId(Container.MemberName).allInnerTexts();
	const testDataNames = [
		'Ivan Ieremenko',
		'Oleksii Svystun',
		'Yevhenii Karachevtsev',
		'Vitalii Dolotov',
		'Ivan Yeremenko',
		'Dmytro Dytiuk',
		'Dmytro Shtapauk',
	];

	expect(allMemberNames.sort()).toEqual(testDataNames.sort());
});

test("Check redirects by buttons in 'Consulting experts' container from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
	const buttonUrlMap = new Map([
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(0),
			'https://www.linkedin.com/in/ivan-ieremenko/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'ivan_ieremenko/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(1),
			'https://ua.linkedin.com/in/aleksey-svistun',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'oleksii-svystun/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(2),
			'https://www.linkedin.com/in/yevhenii-karachevtsev-372749236/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'yevhenii-karachevtsev/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(3),
			'https://www.linkedin.com/in/vitalii-dolotov/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'vitaliidolotov/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(4),
			'https://www.linkedin.com/in/ivan-yeremenko-a464125a/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(4),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'ivan-yeremenko/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(5),
			'https://www.linkedin.com/in/dima-dityuk/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(5),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'dmytro-dytiuk/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Linkedin).nth(6),
			'https://www.linkedin.com/in/shtapauk/',
		],
		[
			consultingExpertsContainer.getByTestId(ConsultingService.Blog).nth(6),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + 'dmytro_shtapauk/',
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects in Open source contributions block  in 'Our approach' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);
	const allSectionTitles = await ourApproachContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Open source contributions', 'Global certifications', 'Profound experience'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	ourApproachContainer.getByTestId(Container.Arrow).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain('https://www.nuget.org/profiles/VitaliiDolotov');
});

test("Check section titles and award cards in 'We make an impact' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const weMakeAnImpactContainer = driver.getByTestId(ConsultingService.WeMakeAnImpact);
	const allSectionTitles = await weMakeAnImpactContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Retain clients', 'Improve\nperformance', 'Aim for quality'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	const awardCards = weMakeAnImpactContainer.getByTestId(Container.AwardCard);
	const awardCardsData = [
		{index: 0, alt: 'Award-1', src: 'img/consulting-logos/1.png'},
		{index: 1, alt: 'Award-2', src: 'img/consulting-logos/2.png'},
		{index: 2, alt: 'Award-3', src: 'img/consulting-logos/3.png'},
		{index: 3, alt: 'Award-4', src: 'img/consulting-logos/4.png'},
		{index: 4, alt: 'Award-5', src: 'img/consulting-logos/5.png'},
		{index: 5, alt: 'Award-6', src: 'img/consulting-logos/6.png'},
	];
	for (const awardCardImage of awardCardsData) {
		const actualCard = awardCards.nth(awardCardImage.index).locator('img');
		await expect(actualCard).toHaveAttribute('alt', awardCardImage.alt);
		await expect(actualCard).toHaveAttribute('src', awardCardImage.src);
	}
});

test("Check section titles in 'Related Services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'UX/UI Design',
		'QA as a Service',
		'Mobile \ndevelopment',
		'Custom software \ndevelopment',
		'AI & ML',
		'Big Data & Analytics',
		'IoT',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check redirects by arrows in 'Related Services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.ConsultingServ));
	}
});

test("Check section titles in 'FAQ' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const faqContainer = driver.getByTestId(ConsultingService.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Why are consulting services\nnecessary for business?',
		'Who are the consultants\nand what will they do?',
		'Why can Techstack provide\nconsulting services to\ntechnology businesses?',
		'What types of companies\nbenefit from consulting\nthe most?',
		'What types of audits\ndo we offer?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
