import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import MobileDevService from '../../../../../identifiers/MainSite/pages/services/MobileDevService';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test("Check the header from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const info = driver.getByTestId(MobileDevService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nMobile App Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('Custom Mobile App\nDevelopment Services');
});

test("Check 'Request a Quote' buttons on the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const containers = [
		MobileDevService.Info,
		MobileDevService.MobileApplicationDevTechStack,
		MobileDevService.WeNeverStopImprovingYourProduct,
	];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
	}
});

test("Check the container titles and numbers from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const containers = [
		driver.getByTestId(MobileDevService.WhatYouGet),
		driver.getByTestId(MobileDevService.WhatWeDo),
		driver.getByTestId(MobileDevService.MobileApplicationDevTechStack),
		driver.getByTestId(MobileDevService.IndustrySpecificSolution),
		driver.getByTestId(MobileDevService.WhatIndustriesWeServe),
		driver.getByTestId(MobileDevService.OurApproachToMobileAppDevServices),
		driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess),
		driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct),
		driver.getByTestId(MobileDevService.TheCostOfMobileAppDevelopment),
		driver.getByTestId(MobileDevService.RelatedServices),
		driver.getByTestId(MobileDevService.Faq),
		driver.getByTestId(MobileDevService.RelatedArticles),
		driver.getByTestId(MobileDevService.GetInTouch),
	];

	const expectedData = [
		['What You Get', '01'],
		['What We Do', '02'],
		['Mobile Application\nDevelopment\nTechnology Stack', '03'],
		['Industry-Specific Solution', '04'],
		['What Industries\nWe Serve', '05'],
		['Our Approach\nto Mobile App\nDevelopment\nServices', '06'],
		['Mobile App Development Process', '07'],
		['We Never Stop Improving Your Product', '08'],
		['The Cost of Mobile\nApp Development', '09'],
		['Related Services', '10'],
		['FAQ', '11'],
		['Related Articles', '12'],
		['Get in Touch', '13'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check section numbers and section titles in 'What You Get' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const whatYouGetContainer = driver.getByTestId(MobileDevService.WhatYouGet);
	const allSectionTitles = whatYouGetContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'An app that your customers will love interacting with',
		'Increased mobile app customer engagement level',
		'Consistent, predictable and cost-efficient development process',
	];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(whatYouGetContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);
});

test("Check block and section titles in 'What We Do' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const whatWeDo = driver.getByTestId(MobileDevService.WhatWeDo);
	const containerBlocks = whatWeDo.getByTestId(Container.ContainerBlock);
	const allSectionTitlesFirstBlock = containerBlocks.nth(0).getByTestId(Container.SectionTitle);
	const testDataFirstBlock = [
		'Custom business apps',
		'Mobile platform with\npre-made modules',
		'Industry-specific mobile apps',
	];

	await expect(allSectionTitlesFirstBlock).toHaveText(testDataFirstBlock);

	const allSectionTitlesSecondBlock = containerBlocks.nth(1).getByTestId(Container.SectionTitle);
	const testDataSecondBlock = ['React Native', 'Cordova', 'Flutter'];

	await expect(containerBlocks.nth(1).getByTestId(Container.BlockTitle)).toHaveText('Cross platform app development');
	await expect(allSectionTitlesSecondBlock).toHaveText(testDataSecondBlock);

	const allSectionTitlesThirdBlock = containerBlocks.nth(2).getByTestId(Container.SectionTitle);
	const testDataThirdBlock = ['Android', 'iOS'];

	await expect(containerBlocks.nth(2).getByTestId(Container.BlockTitle)).toHaveText('Native mobile app development');
	await expect(allSectionTitlesThirdBlock).toHaveText(testDataThirdBlock);
});

test("Check section titles in 'Mobile Application Development Technology Stack' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const technologyStackContainer = driver.getByTestId(MobileDevService.MobileApplicationDevTechStack);
	const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
	const testData = ['React Native', 'Cordova', 'Flutter', 'Android', 'iOS'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles and images in 'Our Approach to Mobile App Development Services' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproachToMobileAppDevServices);
	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Domain\nproficiency', 'Be a part\nof the team', 'Data-driven\ndecisions'];

	await expect(allSectionTitles).toHaveText(testData);

	// should be fixed and uncommented as a part of @TSWEB-897

	/* const imageCards = ourApproachContainer.getByTestId(Container.BlockSection);
	const imageCardsData = [
		{index: 0, alt: 'nine-years', src: 'img/our-approach-nine-years.svg'},
		{index: 1, alt: 'sixty-seven-percent', src: 'img/our-approach-sixty-seven.svg'},
		{index: 2, alt: 'eighty-percent', src: 'img/our-approach-eighty.svg'},
	];
	for (const image of imageCardsData) {
		const actualCard = imageCards.nth(image.index).locator('img');
		await expect(actualCard).toHaveAttribute('alt', image.alt);
		await expect(actualCard).toHaveAttribute('src', image.src);
	} */
});

test("Check member names and roles in 'We Never Stop Improving Your Product' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(
		MobileDevService.WeNeverStopImprovingYourProduct
	);
	const allMemberRoles = await weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'R&D Engineer, Software Engineering Lead,\nComes up with solutions for business tasks.',
		'VP of Engineering,\nLeads the Tech Experts Program and team.',
		'Head of Human Resources,\nFinds the best talent to fit the product’s culture.',
		'Head of Account Management,\nEnsures smooth communication and results.',
		'Sr. Director of Quality Engineering,\nLeads QA and implements a data-driven culture.',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = await weNeverStopImprovingYourProductContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.YevheniiKarachevtsev,
		ExpertNames.IvanYeremenko,
		ExpertNames.MariaDarmanian,
		ExpertNames.DmytroShtapauk,
		ExpertNames.VitaliiDolotov,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test("Check section titles in 'Related Services' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const relatedServicesContainer = driver.getByTestId(MobileDevService.RelatedServices);
	const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Design',
		'QA as a Service',
		'Consulting',
		'Custom software\ndevelopment',
		'AI & ML',
		'Big Data & Analytics',
		'Internet of Things',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'FAQ' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const faqContainer = driver.getByTestId(MobileDevService.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'What technology stack\nworks best for a mobile\napplication?',
		'What does the UX building\nprocess look like?',
		'Can you build or integrate AR/VR solutions?',
		'Do your mobile app services include app maintenance and support after development?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
