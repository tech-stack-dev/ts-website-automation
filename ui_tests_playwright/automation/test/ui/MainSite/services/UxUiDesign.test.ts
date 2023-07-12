import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import UxUiDesign from '../../../../identifiers/UxUiDesign';
import Button from '../../../../identifiers/Button';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
});

test("Check the header from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const info = driver.getByTestId(UxUiDesign.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nUX/UI Design');
	await expect(info.getByTestId(Container.Title)).toHaveText('We provide neoteric\nUX/UI design\nservices');
});

test("Check 'Request a Quote' buttons on the 'QA as a Service' page @Regression @ConsultingService @TSWEB-603", async () => {
	const containers = [UxUiDesign.Info, UxUiDesign.WeNeverStopImprovingYourProduct];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(Button.RequestAQuote)).toBeVisible();
	}
});

test("Check the container title and number from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	await expect(
		driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Get custom \nUX and UI design services');
	await expect(
		driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(
		driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb).getByTestId(Container.ContainerTitle)
	).toHaveText('We build \nUX/UI for \nMobile & Web');
	await expect(
		driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(driver.getByTestId(UxUiDesign.InDesignWeTrust).getByTestId(Container.ContainerTitle)).toHaveText(
		'In design \nwe trust'
	);
	await expect(driver.getByTestId(UxUiDesign.InDesignWeTrust).getByTestId(Container.ContainerNumber)).toHaveText(
		'03'
	);

	await expect(driver.getByTestId(UxUiDesign.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies: \nUX/UI design services'
	);
	await expect(driver.getByTestId(UxUiDesign.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText('04');

	await expect(
		driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow).getByTestId(Container.ContainerTitle)
	).toHaveText('Typical UX/UI \ndesign workflow');
	await expect(
		driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(
		driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct).getByTestId(Container.ContainerTitle)
	).toHaveText('We never stop \nimproving your product');
	await expect(
		driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(driver.getByTestId(UxUiDesign.RelatedServices).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related \nservices'
	);
	await expect(driver.getByTestId(UxUiDesign.RelatedServices).getByTestId(Container.ContainerNumber)).toHaveText(
		'07'
	);

	await expect(driver.getByTestId(UxUiDesign.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(UxUiDesign.Faq).getByTestId(Container.ContainerNumber)).toHaveText('08');
});

test("Check section number and section title in 'Get Custom UX And UI Design Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const getCustomUxAndUiDesignServicesContainer = driver.getByTestId(UxUiDesign.GetCustomUxAndUiDesignServices);
	const allSectionTitles = await getCustomUxAndUiDesignServicesContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = [
		'A design team that will be a part of your product.',
		'A solution that will fit the market and help you to receive your business goals.',
		"An interface that will consider users' behavior and will help them to satisfy their needs.",
		'An easily maintainable design system that will simplify the development and support of your product.',
		'Seamless cross-team communication that drives better and faster results.',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await getCustomUxAndUiDesignServicesContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);
});

test("Check block and section titles in 'We Build UX/UX For Mobile & Web' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weBuildUxUiForMobileWebContainer = driver.getByTestId(UxUiDesign.WeBuildUxUiForMobileWeb);
	const allSectionTitles = await weBuildUxUiForMobileWebContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataSectionTitles = ['UX Design', 'UI Design', 'Web Design', 'Mobile App Design'];

	expect(allSectionTitles.sort()).toEqual(testDataSectionTitles.sort());

	const containerBlock = weBuildUxUiForMobileWebContainer.getByTestId(Container.ContainerBlock);
	const allBlockSections = await containerBlock.getByTestId(Container.BlockSection).allInnerTexts();
	const testDataBlockSections = [
		'UX Audit;',
		'Competitor analysis;',
		'User research;',
		'Product structure and strategy;',
		'Wireframing;',
		'Prototyping;',
		'Usability testing;',
		'Interface visualization;',
		'Seamless design documentation;',
		'Design implementation control.',
	];

	expect(allBlockSections.sort()).toEqual(testDataBlockSections.sort());
	await expect(containerBlock.getByTestId(Container.BlockTitle)).toHaveText('Our \nservices');
});

test("Check blocks and sections titles in 'In Design We Trust' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const inDesignWeTrustContainer = driver.getByTestId(UxUiDesign.InDesignWeTrust);
	const containerBlocks = await inDesignWeTrustContainer.getByTestId(Container.ContainerBlock).all();
	const allSectionTitlesFirstBlock = await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataFisrtBlock = ['Inspiration', 'Ideation', 'Implementation'];

	await expect(containerBlocks[0].getByTestId(Container.BlockTitle)).toHaveText('Mindset');
	expect(allSectionTitlesFirstBlock.sort()).toEqual(testDataFisrtBlock.sort());

	const allSectionTitlesSecondBlock = await containerBlocks[1].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataSecondBlock = ['Emphasize', 'Define', 'Ideate', 'Prototype', 'Test'];

	await expect(containerBlocks[1].getByTestId(Container.BlockTitle)).toHaveText('Design Thinking \nProcess');
	expect(allSectionTitlesSecondBlock.sort()).toEqual(testDataSecondBlock.sort());
	expect(await containerBlocks[1].getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);
});

test("Check carousel sections and arrows in 'Typical UX/UI Design Workflow' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const typicalUxUiDesignWorkflowContainer = driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow);
	const carousel = typicalUxUiDesignWorkflowContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonPrev = carousel.getByTestId(Container.CarouselButtonPrev);
	const carouselButtonNext = carousel.getByTestId(Container.CarouselButtonNext);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
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

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
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

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonNext.click();

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');
	await carouselButtonPrev.click({delay: 1000});

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'true');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'false');

	const clickCount = allSectionTitles.length - 1;
	for (let i = 0; i < clickCount; i++) {
		await carouselButtonNext.click({delay: 1000});
	}

	await expect(carouselButtonPrev).toHaveAttribute('data-disabled', 'false');
	await expect(carouselButtonNext).toHaveAttribute('data-disabled', 'true');
});

test("Check member names and roles in 'We Never Stop Improving Your Product' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const allMemberRoles = await weNeverStopImprovingYourProductContainer
		.getByTestId(Container.MemberRole)
		.allInnerTexts();
	const testDataRoles = ['Head of Design, Product Designer', 'UX/UI Designer', 'UX/UI Designer', 'UX/UI Designer'];

	expect(allMemberRoles.sort()).toEqual(testDataRoles.sort());

	const allMemberNames = await weNeverStopImprovingYourProductContainer
		.getByTestId(Container.MemberName)
		.allInnerTexts();
	const testDataNames = ['Dmytro Dytiuk', 'Yulia Melnychenko', 'Elizabeth Malygina', 'Hanna Zhyhan'];

	expect(allMemberNames.sort()).toEqual(testDataNames.sort());
});

test("Check links in 'We Never Stop Improving Your Product' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const linkMap = new Map([
		[UxUiDesign.Instagram, 'https://www.instagram.com'],
		[UxUiDesign.Tiktok, 'https://www.tiktok.com/@techstack.design'],
		[UxUiDesign.Behance, 'https://www.behance.net/dimadityuk'],
		[Container.MemberCard, 'https://www.behance.net/dimadityuk'],
		[Container.MemberName, 'https://www.behance.net/dimadityuk'],
	]);

	for (const entries of linkMap.entries()) {
		await weNeverStopImprovingYourProductContainer.getByTestId(entries[0]).first().click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(entries[1]);
		await newPage.close();
	}
});

test("Check section titles in 'Related Services' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Mobile\ndevelopment',
		'Consulting',
		'Custom software\ndevelopment',
		'AI & ML',
		'Big Data &\nAnalytics',
		'IoT',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
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

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
	}
});

test("Check section titles in 'FAQ' container from the 'UX/UI Design' block @Regression @UxUiDesign @TSWEB-670", async () => {
	const faqContainer = driver.getByTestId(UxUiDesign.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'What is the first step when\nwe start working with a\nproduct?',
		'Why do we need to\nresearch the market,\nusers, and competitors?',
		'Why are UX services\nimportant?',
		'How can UI services\nhelp your product?',
		'What does your design-\ndevelopment collaboration\nlook like?',
		'How quickly can you make\nUX/UI design for a product\nand/or onboard a design team?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
