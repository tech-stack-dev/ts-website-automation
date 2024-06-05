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
import {qase} from 'playwright-qase-reporter/dist/playwright';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test(
	qase(
		5258,
		'Check the Info container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const info = driver.getByTestId(MobileDevService.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nMobile App Development');
		await expect(info.getByTestId(Container.Title)).toHaveText('Custom Mobile App Development Services');
		await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		5363,
		'Check the container titles and numbers from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const containers = [
			driver.getByTestId(MobileDevService.WhatYouGet),
			driver.getByTestId(MobileDevService.WhatWeDo),
			driver.getByTestId(MobileDevService.TechnologyStack),
			driver.getByTestId(MobileDevService.CaseStudy),
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
			['Mobile Application Development Technology Stack', '03'],
			['Case Study by Techstack', '04'],
			['What Industries We Serve', '05'],
			['Our Approach to Mobile App Development Services', '06'],
			['Mobile App Development Process', '07'],
			['We Never Stop Improving Your Product', '08'],
			['The Cost of Mobile App Development', '09'],
			['Related Services', '10'],
			['Get in Touch', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5276,
		'Check section numbers and titles in "What You Get" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const whatYouGetContainer = driver.getByTestId(MobileDevService.WhatYouGet);
		const allSectionTitles = whatYouGetContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'An app that your customers will love interacting with',
			'Increased mobile app customer engagement level',
			'Consistent, predictable and cost-efficient development process',
		];

		await expect(allSectionTitles).toHaveText(testData);
		await expect(whatYouGetContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);
	}
);

test(
	qase(
		5282,
		'Check block and section titles in "What We Do" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
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

		await expect(containerBlocks.nth(1).getByTestId(Container.BlockTitle)).toHaveText(
			'Cross platform app development'
		);
		await expect(allSectionTitlesSecondBlock).toHaveText(testDataSecondBlock);

		const allSectionTitlesThirdBlock = containerBlocks.nth(2).getByTestId(Container.SectionTitle);
		const testDataThirdBlock = ['Android', 'iOS'];

		await expect(containerBlocks.nth(2).getByTestId(Container.BlockTitle)).toHaveText(
			'Native mobile app development'
		);
		await expect(allSectionTitlesThirdBlock).toHaveText(testDataThirdBlock);
	}
);

test(
	qase(
		5287,
		'Check section titles in "Mobile Application Development Technology Stack" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(MobileDevService.TechnologyStack);
		const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
		const testData = TechnologyStackData.MobileTab;

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5299,
		'Check section titles, image, and CTA button in "Case Study by Techstack" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(MobileDevService.CaseStudy);
		const allSectionTitles = caseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['User experience', 'Moving to IaaS', 'Third-party\nservices'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.MobileCaseStudy)).toBeVisible();

		await expect(caseStudyContainer.getByTestId(MainSiteButtons.MoreProductDetails)).toHaveText(
			'More product details'
		);
	}
);

test(
	qase(
		5294,
		'Check section titles in "What Industries We Serve" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
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
	}
);

test(
	qase(
		5304,
		'Check section titles and images in "Our Approach to Mobile App Development Services" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproach);
		const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
		const testData = ['Domain\nproficiency', 'Be a part\nof the team', 'Data-driven\ndecisions'];

		await expect(allSectionTitles).toHaveText(testData);

		const bigNumberImages = ourApproachContainer.getByTestId(MainSiteImages.BigNumber);

		await baseDriverSteps.checkImagesVisibility(bigNumberImages, 3);
	}
);

test(
	qase(
		5310,
		'Check carousel section numbers and titles in "Mobile App Development Process" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const mobileAppDevProcessContainer = driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess);
		const carousel = mobileAppDevProcessContainer.getByTestId(Container.ContainerCarousel);
		await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

		const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
		const testData = ['Investigation', 'New products', 'Existing products', 'Execution', 'Performance', 'Analysis'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5314,
		'Check section titles, member names and roles, and CTA button in "We Never Stop Improving Your Product" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
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
	}
);

test(
	qase(
		5321,
		'Check section titles, block title, and CTA button in "The Cost of Mobile App Development" container from the "Mobile App" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
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

		await expect(theCostOfMobAppDevContainer.getByTestId(MainSiteButtons.ScheduleACall)).toHaveText(
			'Schedule a call'
		);
	}
);

test(
	qase(
		5324,
		'Check section titles in "Related Services" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
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
	}
);

test(
	qase(
		5327,
		'Check section titles in "FAQ" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const faqContainer = driver.getByTestId(MobileDevService.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What technology stack\nworks best for a mobile\napplication?',
			'What does the UX building\nprocess look like?',
			'Can you build or integrate AR/VR solutions?',
			'Do your mobile app services include app maintenance and support after development?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
