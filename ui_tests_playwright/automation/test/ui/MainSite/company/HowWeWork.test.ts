import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import HowWeWork from '../../../../identifiers/MainSite/pages/company/HowWeWork';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import GetInTouchForm from '../../../../identifiers/forms/GetInTouchForm';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';
import TechnologyStackData from '../../../../preconditionsData/TechnologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.HowWeWork));
});

test("Check the header from the 'How we work' block @Regression @HowWeWork", async () => {
	const info = driver.getByTestId(HowWeWork.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home \nHow we work');
	await expect(info.getByTestId(Container.Title)).toHaveText('The Way We Work: Our\nApproach to Delivering\nResults');
	await expect(info.getByTestId(MainSiteButtons.LetsMakeItTogether)).toHaveText('Let’s make it together');
});

test("Check container titles and numbers from the 'How we work' block @Regression @HowWeWork", async () => {
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

test("Check the 'Cooperation models' section title and number from the 'How we work' block @Regression @HowWeWork", async () => {
	const cooperationModelsContainer = driver.getByTestId(HowWeWork.CooperationModels);
	const allSectionTitles = cooperationModelsContainer.getByTestId(Container.SectionTitle);

	await expect(cooperationModelsContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

	const testData = ['Team augmentation', 'Dedicated team', 'Product development', 'White label'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check the 'Work process' section title and number and carousel from the 'How we work' block @Regression @HowWeWork", async () => {
	const workProcessContainer = driver.getByTestId(HowWeWork.WorkProcess);
	const allSectionTitles = workProcessContainer.getByTestId(Container.SectionTitle);

	await expect(workProcessContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04', '05']);

	const testData = ['Discovery', 'Pre-Engagement', 'Engagement', 'Delivery', 'Support & Maintenance'];

	await expect(allSectionTitles).toHaveText(testData);

	await baseDriverSteps.checkCarouselArrowsClick(workProcessContainer);
});

test("Check the 'Technology stack' section from the 'How we work' block @Regression @HowWeWork", async () => {
	const technologyStackContainer = driver.getByTestId(HowWeWork.TechnologyStack);

	const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
	const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = TechnologyStackData.SectionTitles;

	await baseDriverSteps.checkTechnologyStackTabsAndSectionTitles(
		navigationTabs,
		containerBlocks,
		testDataSectionTitles
	);
});

test("Check the 'Techstack structure' section from the 'How we work' block @Regression @HowWeWork", async () => {
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
});

test("Check the 'Tools we use' section from the 'How we work' block @Regression @HowWeWork", async () => {
	const toolsWeUseContainer = driver.getByTestId(HowWeWork.ToolsWeUseToOrganize);

	await expect(toolsWeUseContainer.getByTestId(Container.ContainerNumber)).toHaveText('05');
});

test("Check the 'Get in Touch' section from the 'How we work' block @Regression @HowWeWork", async () => {
	const getInTouchContainer = driver.getByTestId(HowWeWork.GetInTouch);

	await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
	await expect(getInTouchContainer.getByTestId(GetInTouchForm.FirstName)).toBeVisible();
	await expect(getInTouchContainer.getByTestId(GetInTouchForm.LastName)).toBeVisible();
	await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
	await expect(getInTouchContainer.getByTestId(GetInTouchForm.Message)).toBeVisible();
	await expect(getInTouchContainer.getByTestId(CareerButtons.SendButton)).toBeVisible();
});

test('Check navigation to "Get in Touch" container after clicking CTA button from the "Consulting service" page @Regression @ConsultingService @TSWEB-697', async () => {
	const ctaButton = driver.getByTestId(HowWeWork.Info).getByTestId(MainSiteButtons.LetsMakeItTogether);

	await baseDriverSteps.checkScrollToContainerByCtaButtonClick(ctaButton, HowWeWork.GetInTouch);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
