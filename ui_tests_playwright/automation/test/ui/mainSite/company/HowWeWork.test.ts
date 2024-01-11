import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import HowWeWork from '../../../../identifiers/mainSite/pages/company/HowWeWork';
import GetInTouchForm from '../../../../identifiers/forms/GetInTouchForm';
import TechnologyStackData from '../../../../preconditionsData/technologyStack/TechnologyStackData';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import Buttons from '../../../../identifiers/Buttons';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.HowWeWork));
});

test(qase(4919, 'Check the Info container from the "How we work" page @Regression @HowWeWork'), async () => {
	const info = driver.getByTestId(HowWeWork.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home \nHow we work');
	await expect(info.getByTestId(Container.Title)).toHaveText('The Way We Work: Our\nApproach to Delivering\nResults');
	await expect(info.getByTestId(MainSiteButtons.LetsMakeItTogether)).toHaveText('Let’s make it together');
});

test(qase(4933, 'Check container titles and numbers from the "How we work" page @Regression @HowWeWork'), async () => {
	const containers = [
		driver.getByTestId(HowWeWork.CooperationModels),
		driver.getByTestId(HowWeWork.WorkProcess),
		driver.getByTestId(HowWeWork.TechnologyStack),
		driver.getByTestId(HowWeWork.TechstackStructure),
		driver.getByTestId(HowWeWork.ToolsWeUseToOrganize),
		driver.getByTestId(HowWeWork.GetInTouch),
	];

	const expectedData = [
		['Cooperation \nmodels', '01'],
		['Work process', '02'],
		['Technology stack', '03'],
		['Techstack structure', '04'],
		['Tools we use\nto organize\nthe workflow', '05'],
		['Get in Touch', '06'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test(
	qase(
		4926,
		'Check section titles and numbers in "Cooperation models" container from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const cooperationModelsContainer = driver.getByTestId(HowWeWork.CooperationModels);
		const allSectionTitles = cooperationModelsContainer.getByTestId(Container.SectionTitle);

		await expect(cooperationModelsContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);

		const testData = ['Team augmentation', 'Dedicated team', 'Product development', 'White label'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4996,
		'Check section titles and numbers, and carousel in "Work process" container from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const workProcessContainer = driver.getByTestId(HowWeWork.WorkProcess);
		const allSectionTitles = workProcessContainer.getByTestId(Container.SectionTitle);

		await expect(workProcessContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const testData = ['Discovery', 'Pre-Engagement', 'Engagement', 'Delivery', 'Support & Maintenance'];

		await expect(allSectionTitles).toHaveText(testData);

		await baseDriverSteps.checkCarouselArrowsClick(workProcessContainer);
	}
);

test(
	qase(
		4945,
		'Check section titles and navigation bar in "Technology stack" container from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(HowWeWork.TechnologyStack);

		const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
		const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
		const testDataSectionTitles = await TechnologyStackData.getAllTechnologyStackTabsData();

		await baseDriverSteps.checkTabsAndSectionTitles(navigationTabs, containerBlocks, testDataSectionTitles);
	}
);

test(
	qase(
		4937,
		'Check section titles in "Techstack structure" container from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const techstackStructure = driver.getByTestId(HowWeWork.TechstackStructure);
		const allSectionTitles = techstackStructure.getByTestId(Container.SectionTitle);

		const testData = [
			'Engineering \nfunction',
			'Product \nfunction',
			'Design \nfunction',
			'HR \nfunction',
			'AM \nfunction',
			'Business \ndevelopment \nfunction',
			'Legal \nfunction',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5512,
		'Check images visibility in "Tools we use to organize the workflow" container from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const toolsWeUseContainer = driver.getByTestId(HowWeWork.ToolsWeUseToOrganize);
		await toolsWeUseContainer.scrollIntoViewIfNeeded(); // To scroll to images that have loading="lazy" attribute

		const toolLogos = [
			toolsWeUseContainer.getByTestId(MainSiteImages.MicrosoftLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.SalesforceLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.AwsLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.GoogleLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.AtlassianLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.AppleLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.OktaLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.OracleLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.SnowflakeLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.SplunkLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.CustomerLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.VmwareLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.RetoolLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.StripeLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.AmplitudeLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.SegmentLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.SentryLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.GainsightLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.TableauLogo),
			toolsWeUseContainer.getByTestId(MainSiteImages.FullStoryLogo),
		];

		for (const logo of toolLogos) {
			await expect(logo).toBeVisible();
		}
	}
);

test(
	qase(4952, 'Check the elements in "Get in Touch" container from the "How we work" page @Regression @HowWeWork'),
	async () => {
		const getInTouchContainer = driver.getByTestId(HowWeWork.GetInTouch);

		await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
		await expect(getInTouchContainer.getByTestId(GetInTouchForm.FirstName)).toBeVisible();
		await expect(getInTouchContainer.getByTestId(GetInTouchForm.LastName)).toBeVisible();
		await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
		await expect(getInTouchContainer.getByTestId(GetInTouchForm.Message)).toBeVisible();
		await expect(getInTouchContainer.getByTestId(Buttons.Send)).toBeVisible();
	}
);

test(
	qase(
		4960,
		'Check navigation to "Get in Touch" container after clicking CTA button from the "How we work" page @Regression @HowWeWork'
	),
	async () => {
		const ctaButton = driver.getByTestId(HowWeWork.Info).getByTestId(MainSiteButtons.LetsMakeItTogether);

		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(ctaButton, HowWeWork.GetInTouch);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
