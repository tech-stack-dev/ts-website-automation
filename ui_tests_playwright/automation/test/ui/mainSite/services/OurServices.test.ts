import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import OurServices from '../../../../identifiers/mainSite/pages/services/OurServices';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import Buttons from '../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../preconditionsData/links/ClutchReviewLinks';
import TechnologyStackData from '../../../../preconditionsData/technologyStack/TechnologyStackData';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
});

test(
	qase(
		5330,
		'Check Info container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const info = driver.getByTestId(OurServices.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services');
		await expect(info.getByTestId(Container.Title)).toHaveText('Full-Cycle Software Engineering Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomProjectQuote)).toHaveText(
			'Get your custom project quote'
		);
	}
);

test(
	qase(
		5333,
		'Check the container titles and numbers from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const containers = [
			driver.getByTestId(OurServices.Services),
			driver.getByTestId(OurServices.TechnologyStack),
			driver.getByTestId(OurServices.OurApproach),
			driver.getByTestId(OurServices.Reviews),
			driver.getByTestId(OurServices.Faq),
			driver.getByTestId(OurServices.GetInTouch),
		];

		const expectedData = [
			['Services', '01'],
			['Technology stack', '02'],
			['Our approach', '03'],
			['Reviews', '04'],
			['FAQ', '05'],
			['Get in Touch', '06'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5335,
		'Check section titles and numbers in "Services" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const servicesContainer = driver.getByTestId(OurServices.Services);
		const containerSection = servicesContainer.getByTestId(Container.ContainerSection);
		const numOfSections = 12;

		for (let i = 1; i < numOfSections; i++) {
			const sectionNumber = i.toString().padStart(2, '0');
			await expect(containerSection.getByTestId(Container.SectionNumber).nth(i - 1)).toHaveText(sectionNumber);
		}

		const allSectionTitles = servicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom Software Development',
			'Cloud Development',
			'Big Data & Analytics',
			'Internet of Things',
			'Back-End Development Services',
			'Front-End Development Services',
			'DevOps Services & Solutions',
			'Artificial Intelligence & Machine Learning',
			'Mobile Development',
			'UI/UX Design',
			'QA as a Service',
			'Consulting Service',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4830,
		'Check redirects by sections in "Services" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const servicesContainer = driver.getByTestId(OurServices.Services);
		const servicresSections = servicesContainer.getByTestId(Container.ContainerSection);
		const arrowUrlMap = new Map([
			[servicresSections.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[servicresSections.nth(1), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[servicresSections.nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
			[servicresSections.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[servicresSections.nth(4), UrlProvider.urlBuilder(UrlPath.BackEndDevelopment)],
			[servicresSections.nth(5), UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment)],
			[servicresSections.nth(6), UrlProvider.urlBuilder(UrlPath.DevOpsServ)],
			[servicresSections.nth(7), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[servicresSections.nth(8), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[servicresSections.nth(9), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[servicresSections.nth(10), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[servicresSections.nth(11), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.OurServices));
		}
	}
);

test(
	qase(
		5337,
		'Check section titles and navigation bar in "Technology stack" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(OurServices.TechnologyStack);

		const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
		const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
		const testDataSectionTitles = await TechnologyStackData.getAllTechnologyStackTabsData();

		await baseDriverSteps.checkTabsAndSectionTitles(navigationTabs, containerBlocks, testDataSectionTitles);
	}
);

test(
	qase(
		5340,
		'Check section titles and CTA button in "Our approach" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(OurServices.OurApproach);

		const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
		const testData = ['Domain proficiency', 'We are the team', 'Data-driven decisions'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(ourApproachContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5343,
		'Check redirects by "Clutch Review" buttons in "Reviews" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const reviewsContainer = driver.getByTestId(OurServices.Reviews);
		const clutchReviewButtons = reviewsContainer.getByTestId(Buttons.Clutch);

		const clutchButtonUrlMap = new Map([
			[clutchReviewButtons.nth(0), ClutchReviewLinks.MarkBeare],
			[clutchReviewButtons.nth(1), ClutchReviewLinks.AnonymousPeerToPeer],
			[clutchReviewButtons.nth(2), ClutchReviewLinks.AnonymousMedicalDevice],
		]);

		for (const [button, url] of clutchButtonUrlMap) {
			await baseDriverSteps.checkRedirectToClutch(button, url);
		}
	}
);

test(
	qase(
		5339,
		'Check section titles in "FAQ" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const faqContainer = driver.getByTestId(OurServices.Faq);

		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What work models do we support?',
			'Is product scope estimation free?',
			'Where are we located?',
			'How long does it take to build a software product with Techstack?',
			'Are all of our engineers in Ukraine, or do we hire worldwide?',
			'Can we provide individual engineers for staff augmentation?',
			'How long does it take to hire a product starter engineer?',
			'Have we worked with startups before?',
			'Do we work with fixed-cost projects?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5354,
		'Check sections expanding and collapsing in "FAQ" container from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const faqContainer = driver.getByTestId(OurServices.Faq);
		const expectedNumberOfSections = 9;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5347,
		'Check navigation to "Get in Touch" container after clicking CTA button from the "Our Services" page @desktop @mobile @Regression @OurServices @TSWEB-681'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(OurServices.Info).getByTestId(MainSiteButtons.GetYourCustomProjectQuote),
			driver.getByTestId(OurServices.OurApproach).getByTestId(MainSiteButtons.GetYourQuoteNow),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, OurServices.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
