import {Locator, expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import IoTEngineeringServices from '../../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import ContactUs from '../../../../../identifiers/MainSite/pages/contactUs/ContactUs';

test.beforeAll(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.InternetOfThings]);
});

test('Check the breadcrumbs and header. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const info = driver.getByTestId(IoTEngineeringServices.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nIoT');
	await expect(info.getByTestId(Container.Title)).toHaveText('IoT Engineering\nServices');
});

test('Check "Request a Quote" buttons presence. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const containers = [
		IoTEngineeringServices.Info,
		IoTEngineeringServices.IoTTechnologyStackByLayers,
		IoTEngineeringServices.IoTEngineeringProcess,
	];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
	}
});

test('Check the container titles and indexes @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringSolutions).getByTestId(Container.ContainerTitle)
	).toHaveText('IoT Engineering Solutions');
	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringSolutions).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Our IoT Engineering Services');
	await expect(driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringServices).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers).getByTestId(Container.ContainerTitle)
	).toHaveText('IoT Technology Stack\nby Layers');
	await expect(driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringCaseStudies).getByTestId(Container.ContainerTitle)
	).toHaveText('IoT Engineering Case Studies');
	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringCaseStudies).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(driver.getByTestId(IoTEngineeringServices.IndustrySpecificIoTSolutions).getByTestId(Container.ContainerTitle)
	).toHaveText('Industry-specific\nIoT Solutions');
	await expect(driver.getByTestId(IoTEngineeringServices.IndustrySpecificIoTSolutions).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess).getByTestId(Container.ContainerTitle)
	).toHaveText('IoT Engineering Process');
	await expect(driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(driver.getByTestId(IoTEngineeringServices.OurApproachToIoTEngineering).getByTestId(Container.ContainerTitle)
	).toHaveText('Our Approach to IoT Engineering');
	await expect(driver.getByTestId(IoTEngineeringServices.OurApproachToIoTEngineering).getByTestId(Container.ContainerNumber)
	).toHaveText('07');

	await expect(driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts).getByTestId(Container.ContainerTitle)
	).toHaveText('Our Internet of Things\nEngineering Experts');
	await expect(driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts).getByTestId(Container.ContainerNumber)
	).toHaveText('08');

	await expect(driver.getByTestId(IoTEngineeringServices.RelatedServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Related Services');
	await expect(driver.getByTestId(IoTEngineeringServices.RelatedServices).getByTestId(Container.ContainerNumber)
	).toHaveText('09');

	await expect(driver.getByTestId(ContactUs.GetInTouch).getByTestId(Container.ContainerTitle)
	).toHaveText('Get in Touch');
	await expect(driver.getByTestId(ContactUs.GetInTouch).getByTestId(Container.ContainerNumber)
	).toHaveText('10');

	await expect(driver.getByTestId(IoTEngineeringServices.RelatedArticles).getByTestId(Container.ContainerTitle)
	).toHaveText('Related Articles');
	await expect(driver.getByTestId(IoTEngineeringServices.RelatedArticles).getByTestId(Container.ContainerNumber)
	).toHaveText('11');

	await expect(driver.getByTestId(IoTEngineeringServices.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(IoTEngineeringServices.Faq).getByTestId(Container.ContainerNumber)).toHaveText('12');
});

test('Check section numbers and section titles in "IoT Engineering Solutions" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ioTEngineeringSolutionsContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringSolutions);
	const allSectionTitles = await ioTEngineeringSolutionsContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Lack of necessary skill sets',
		'Insufficient testing and updating',
		'Increased cost and time to market',
		'System security',
		'Connectivity',
		'Cross-platform capabilities',
		'Data collection and processing'
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await ioTEngineeringSolutionsContainer.getByTestId(Container.SectionNumber).allInnerTexts()
	).toEqual(['01', '02', '03', '04', '05', '06', '07']);
});

test('Check section titles in "Our IoT Engineering Services" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ourIoTEngineeringServicesContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringServices);
	const containerBlocks = await ourIoTEngineeringServicesContainer.getByTestId(Container.ContainerSection).all();
	const actualSectionTitles = await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts();
	const expectedSectionTitles = [
		'Enterprise automation and transformation',
		'Smart home and office ecosystem',
		'Quick start with a\u00A0hardware MVP',
		'IoT development consulting',
		'Integration of IoT devices into a\u00A0software ecosystem'
	];

	expect(actualSectionTitles).toEqual(expectedSectionTitles);
});

test('Check section titles in "IoT Technology Stack by Layers" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ioTTechnologyStackByLayersContainer = driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers);
	const containerBlocks = await ioTTechnologyStackByLayersContainer.getByTestId(Container.ContainerBlock).all();
	const actualSectionTitles: string[] = [];

	for (const containerBlock of containerBlocks) {
  		const titleText = await containerBlock.getByTestId(Container.SectionTitle).first().textContent();
  		actualSectionTitles.push(titleText!);
	}

	const expectedSectionTitles = [
		'1.Device layer',
		'2.Gateway layer',
		'3.Cloud layer',
		'4.Data management layer',
		'5.Presentation layer',
		'6.Testing & processes'
	];

	expect(actualSectionTitles).toEqual(expectedSectionTitles);
});

test('Check section titles and sencor image in "IoT Engineering Case Studies" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ioTEngineeringCaseStudiesContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringCaseStudies);
	const actualSectionTitles = await ioTEngineeringCaseStudiesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const expectedSectionTitles = [
		'Real-time monitoring of production processes',
		'Valuable insights on process adjustments',
		'Cost savings from addressing over/undercooling',
		'Forecasting capabilities',
		'Process improvements'
	];

	expect(actualSectionTitles).toEqual(expectedSectionTitles);
	expect(driver.getByTestId(IoTEngineeringServices.SensorsScheme).isVisible());
});

test('Check section titles in "Industry-specific IoT Solutions" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const industrySpecificIoTSolutionsContainer = driver.getByTestId(IoTEngineeringServices.IndustrySpecificIoTSolutions);
	const actualSectionTitles = await industrySpecificIoTSolutionsContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const expectedSectionTitles = [
		'AgriTech',
		'Digital Transformation',
		'Transportation\nand Logistics',
		'Manufacturing',
		'Energy',
		'Healthcare'
	];

	expect(actualSectionTitles.sort()).toEqual(expectedSectionTitles.sort());
});

test('Check section and block titles in "IoT Engineering Process" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ioTEngineeringProcessContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	const carouselSections = await ioTEngineeringProcessContainer.getByTestId(Container.CarouselSection).all();
	const actualSectionTitles: string[] = [];

	for (const carouselSection of carouselSections) {
  		const titleText = await carouselSection.getByTestId(Container.SectionTitle).first().textContent();
  		actualSectionTitles.push(titleText!);
	}

	const expectedSectionTitles = [
		'Investigation',
		'Execution',
		'Performance',
		'Analysis'
	];

	expect(actualSectionTitles).toEqual(expectedSectionTitles);
	expect(await ioTEngineeringProcessContainer.getByTestId(Container.BlockTitle).textContent()).toEqual('New IoT Device\nEngineering');
});

test('Check section titles and award images in "Our Approach to IoT Engineering" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ourApproachToIoTEngineeringContainer = driver.getByTestId(IoTEngineeringServices.OurApproachToIoTEngineering);
	const actualSectionTitles = await ourApproachToIoTEngineeringContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const expectedSectionTitles = [
		'Tech community',
		'Ownership drives\nexcellence'
	];

	expect(actualSectionTitles.sort()).toEqual(expectedSectionTitles.sort());

	const awardCards = await ourApproachToIoTEngineeringContainer.getByTestId(Container.AwardCard).all();

	for (const awardCard of awardCards) {
		await expect(awardCard).toBeVisible();
	}
});

test('Check member names and roles in "Our Internet of Things Engineering Experts" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ourIoTEngineeringExpertsContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts);
	const allMemberRoles = await ourIoTEngineeringExpertsContainer.getByTestId(Container.MemberRole).allInnerTexts();
	const testDataRoles = [
		'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'R&D Engineer, Software Engineering Lead,\nComes up with solutions for business tasks'
	];

	expect(allMemberRoles).toEqual(testDataRoles);

	const allMemberNames = ourIoTEngineeringExpertsContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.IvanIeremenko,
		ExpertNames.OleksiiSvystun,
		ExpertNames.YevheniiKarachevtsev
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test('Check section titles in "Related Services" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Custom software\ndevelopment',
		'UX/UI Design',
		'AI & ML',
		'Development\nconsulting',
		'QA as a Service',
		'Big Data & Analytics'
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test('Check section titles in "FAQ" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Why choose Techstack for IoT engineering?',
		'How does Techstack enhance the professional development of IoT engineers?',
		'What is an enterprise IoT engineering service?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterAll(async () => {
	await driver.closeDrivers();
});
