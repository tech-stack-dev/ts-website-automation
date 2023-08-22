import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import HowWeWork from '../../../../identifiers/MainSite/pages/company/HowWeWork';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import Buttons from '../../../../identifiers/Buttons';
import GetInTouchForm from '../../../../identifiers/forms/GetInTouchForm';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.HowWeWork));
});

test("Check the header from the 'How we work' block  @Regression @HowWeWork", async () => {
    const info = driver.getByTestId(HowWeWork.Info);
    await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home \nHow we work');
	await expect(info.getByTestId(Container.Title)).toHaveText('The Way We Work: Our\nApproach to Delivering\nResults');
    await expect(info.getByTestId(Buttons.LetsMakeItTogether)).toHaveText('Let’s make it together');
});

test("Check the 'Cooperation models' section title and number from the 'How we work' block @Regression @HowWeWork", async () => {
    const cooperationModelsContainer = driver.getByTestId(HowWeWork.CooperationModelsContainer);
    const allSectionTitles = await cooperationModelsContainer.getByTestId(Container.SectionTitle).allInnerTexts();

    await expect(cooperationModelsContainer.getByTestId(Container.ContainerTitle)).toHaveText('Cooperation \nmodels');
    await expect(cooperationModelsContainer.getByTestId(Container.ContainerNumber)).toHaveText('01');

    expect(await cooperationModelsContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
	]);

    const testData = [
		'Team augmentation',
		'Dedicated team',
		'Product development',
		'White label',
	];

    expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check the 'Work process' section title and number from the 'How we work' block @Regression @HowWeWork", async () => {
    const workProcessContainer = driver.getByTestId(HowWeWork.WorkProcessContainer);
    const allSectionTitles = await workProcessContainer.getByTestId(Container.SectionTitle).allInnerTexts();

    await expect(workProcessContainer.getByTestId(Container.ContainerTitle)).toHaveText('Work process');
    await expect(workProcessContainer.getByTestId(Container.ContainerNumber)).toHaveText('02');

    expect(await workProcessContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
        '03',
		'04',
        '05',
	]);
    
    const testData = [
		'Discovery',
		'Pre-Engagement',
        'Engagement',
        'Delivery',
        'Support & Maintenance',
	];

    expect(allSectionTitles.sort()).toEqual(testData.sort());

    await baseDriverSteps.checkCarouselArrowsClick(workProcessContainer);
});

test("Check the 'Technology stack' section from the 'How we work' block @Regression @HowWeWork", async () => {
    const technologyStackContainer = driver.getByTestId(HowWeWork.TechnologyStackContainer);

    await expect(technologyStackContainer.getByTestId(Container.ContainerTitle)).toHaveText('Technology stack');
    await expect(technologyStackContainer.getByTestId(Container.ContainerNumber)).toHaveText('03');

    const backEndTestData = [
		'.NET Stack',
		'JVM Stack',
        'Node.js stack',
        'Other',
	];
    const frontEndTestData = [
		'Languages',
		'Frameworks',
        'State\nmanagement',
        'Build tools',
        'Markup',
        'Rich content',
	];
    const mobileTestData = [
		'React Native',
		'Cordova',
        'Flutter',
        'Android',
        'iOS',
	];
    const iotTestData = [
		'Devices',
		'Gateways',
	];
    const devOpsTestData = [
		'Cloud',
		'DevOps',
        'CI/CD',
        'Monitoring',
	];
    const aiMlDataScienceTestData = [
		'Computer vision',
		'Deep learning and machine learning',
        'Data visualization',
        'Data storage & manipulation',
        'Development environment',
	];

    const allSectionTitles = await technologyStackContainer.getByTestId(Container.SectionTitle).allInnerTexts();
    const expectedBackEndData = allSectionTitles.slice(0, 4);
    const expectedFrontEndData = allSectionTitles.slice(4, 10);
    const expectedMobileData = allSectionTitles.slice(10, 15);
    const expectedIotData = allSectionTitles.slice(15, 17);
    const expectedDevopsData = allSectionTitles.slice(17, 21);
    const expectedAiMlDataScienceData = allSectionTitles.slice(21, 26);
    
    expect(expectedBackEndData.sort()).toEqual(backEndTestData.sort());
    expect(expectedFrontEndData.sort()).toEqual(frontEndTestData.sort());
    expect(expectedMobileData.sort()).toEqual(mobileTestData.sort());
    expect(expectedIotData.sort()).toEqual(iotTestData.sort());
    expect(expectedDevopsData.sort()).toEqual(devOpsTestData.sort());
    expect(expectedAiMlDataScienceData.sort()).toEqual(aiMlDataScienceTestData.sort());

    await expect(technologyStackContainer.getByTestId(Buttons.Technology_BackEnd)).toBeVisible();
    await expect(technologyStackContainer.getByTestId(Buttons.Technology_FrontEnd)).toBeVisible();
    await expect(technologyStackContainer.getByTestId(Buttons.Technology_Mobile)).toBeVisible();
    await expect(technologyStackContainer.getByTestId(Buttons.Technology_Iot)).toBeVisible();
    await expect(technologyStackContainer.getByTestId(Buttons.Technology_DevopsCloud)).toBeVisible();
    await expect(technologyStackContainer.getByTestId(Buttons.Technology_AiMlDataScience)).toBeVisible();
});

test("Check the 'Techstack structure' section from the 'How we work' block @Regression @HowWeWork", async () => {
    const techstackStructure = driver.getByTestId(HowWeWork.TechstackStructureContainer);
    const allSectionTitles = await techstackStructure.getByTestId(Container.SectionTitle).allInnerTexts();

    await expect(techstackStructure.getByTestId(Container.ContainerTitle)).toHaveText('Techstack structure');
    await expect(techstackStructure.getByTestId(Container.ContainerNumber)).toHaveText('04');

    const testData = [
		'Engineering \nfunction',
		'Product \nfunction',
		'Design \nfunction',
		'HR \nfunction',
        'AM \nfunction',
        'Business \ndevelopment \nfunction',
        'Legal \nfunction',
	];

    expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check the 'Tools we use' section from the 'How we work' block @Regression @HowWeWork", async () => {
    const toolsWeUseContainer = driver.getByTestId(HowWeWork.ToolsWeUseContainer);

    await expect(toolsWeUseContainer.getByTestId(Container.ContainerNumber)).toHaveText('05');
});

test("Check the 'Get in Touch' section from the 'How we work' block @Regression @HowWeWork", async () => {
    const getInTouchContainer = driver.getByTestId(HowWeWork.GetInTouchContainer);

    await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
    await expect(getInTouchContainer.getByTestId(GetInTouchForm.FirstName)).toBeVisible();
    await expect(getInTouchContainer.getByTestId(GetInTouchForm.LastName)).toBeVisible();
    await expect(getInTouchContainer.getByTestId(GetInTouchForm.Email)).toBeVisible();
    await expect(getInTouchContainer.getByTestId(GetInTouchForm.Message)).toBeVisible();
    await expect(getInTouchContainer.getByTestId(CareerButtons.SendButton)).toBeVisible();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});