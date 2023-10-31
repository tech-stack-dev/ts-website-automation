import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MobileDevService from '../../../../../identifiers/mainSite/pages/services/MobileDevService';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test('Check the Info container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const info = driver.getByTestId(MobileDevService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nMobile App Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('Custom Mobile App\nDevelopment Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
});

test('Check the container titles and numbers from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const containers = [
		driver.getByTestId(MobileDevService.WhatYouGet),
		driver.getByTestId(MobileDevService.WhatWeDo),
		driver.getByTestId(MobileDevService.TechnologyStack),
		driver.getByTestId(MobileDevService.IndustrySpecificSolution),
		driver.getByTestId(MobileDevService.WhatIndustriesWeServe),
		driver.getByTestId(MobileDevService.OurApproach),
		driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess),
		driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct),
		driver.getByTestId(MobileDevService.TheCostOfMobileAppDevelopment),
		driver.getByTestId(MobileDevService.RelatedServices),
		driver.getByTestId(MobileDevService.GetInTouch),
		driver.getByTestId(MobileDevService.RelatedArticles),
		driver.getByTestId(MobileDevService.Faq),
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
		['Get in Touch', '11'],
		['Related Articles', '12'],
		['FAQ', '13'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check section numbers and titles in "What You Get" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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

test('Check block and section titles in "What We Do" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const whatWeDoContainer = driver.getByTestId(MobileDevService.WhatWeDo);
	const containerBlocks = whatWeDoContainer.getByTestId(Container.ContainerBlock);
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

test('Check section titles and CTA button in "Mobile Application Development Technology Stack" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const technologyStackContainer = driver.getByTestId(MobileDevService.TechnologyStack);
	const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
	const testData = ['React Native', 'Cordova', 'Flutter', 'Android', 'iOS'];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(technologyStackContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
});

test('Check section titles, image, and CTA button in "Industry-Specific Solution" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const industrySolutionContainer = driver.getByTestId(MobileDevService.IndustrySpecificSolution);
	const allSectionTitles = industrySolutionContainer.getByTestId(Container.SectionTitle);
	const testData = ['User experience', 'Moving to IaaS', 'Third-party\nservices'];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(industrySolutionContainer.getByTestId(MainSiteImages.MobileCaseStudy)).toBeVisible();

	await expect(industrySolutionContainer.getByTestId(MainSiteButtons.MoreProductDetails)).toHaveText(
		'More product details'
	);
});

test('Check section titles in "What Industries We Serve" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const WhatIndustriesWeServeContainer = driver.getByTestId(MobileDevService.WhatIndustriesWeServe);
	const allSectionTitles = WhatIndustriesWeServeContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Healthcare',
		'Transportation\nand logistics',
		'Energy',
		'Leisure and\nentertainment',
		'Agriculture',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles and images in "Our Approach to Mobile App Development Services" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproach);
	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Domain\nproficiency', 'Be a part\nof the team', 'Data-driven\ndecisions'];

	await expect(allSectionTitles).toHaveText(testData);

	const bigNumberImages = ourApproachContainer.getByTestId(MainSiteImages.BigNumber);

	await baseDriverSteps.checkImagesVisibility(bigNumberImages, 3);
});

test('Check carousel section numbers and titles in "Mobile App Development Process" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const mobileAppDevProcessContainer = driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess);
	const carousel = mobileAppDevProcessContainer.getByTestId(Container.ContainerCarousel);
	await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

	const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
	const testData = ['Investigation', 'New products', 'Existing products', 'Execution', 'Performance', 'Analysis'];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles, member names and roles, and CTA button in "We Never Stop Improving Your Product" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const weNeverStopImprovingContainer = driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct);
	const allSectionTitles = weNeverStopImprovingContainer.getByTestId(Container.SectionTitle);
	const testData = ['Tech Experts Team', 'Development Team', 'Management Team'];

	await expect(allSectionTitles).toHaveText(testData);

	const allMemberRoles = weNeverStopImprovingContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'R&D Engineer, Software Engineering Lead,\nComes up with solutions for business tasks.',
		'VP of Engineering,\nLeads the Tech Experts Program and team.',
		'Head of Human Resources,\nFinds the best talent to fit the product’s culture.',
		'Head of Account Management,\nEnsures smooth communication and results.',
		'Sr. Director of Quality Engineering,\nLeads QA and implements a data-driven culture.',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = weNeverStopImprovingContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.YevheniiKarachevtsev,
		ExpertNames.IvanYeremenko,
		ExpertNames.MariaDarmanian,
		ExpertNames.DmytroShtapauk,
		ExpertNames.VitaliiDolotov,
	];

	await expect(allMemberNames).toHaveText(testDataNames);

	await expect(weNeverStopImprovingContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
		'Request a quote'
	);
});

test('Check section titles, block title, and CTA button in "The Cost of Mobile App Development" container from the "Mobile App" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const theCostOfMobAppDevContainer = driver.getByTestId(MobileDevService.TheCostOfMobileAppDevelopment);
	const allSectionTitles = theCostOfMobAppDevContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Mobile app development with\npre-made design concepts',
		'Mobile app as a part\nof a complex software solution',
		'Full-cycle mobile app\ndevelopment',
	];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(theCostOfMobAppDevContainer.getByTestId(Container.BlockTitle)).toHaveText(
		'Get a free estimate for your mobile\napp development'
	);

	await expect(theCostOfMobAppDevContainer.getByTestId(MainSiteButtons.ScheduleACall)).toHaveText('Schedule a call');
});

test('Check section titles in "Related Services" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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

test('Check section titles in "FAQ" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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
