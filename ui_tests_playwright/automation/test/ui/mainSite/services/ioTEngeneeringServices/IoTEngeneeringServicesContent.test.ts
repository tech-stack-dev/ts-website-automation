import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import IoTEngineeringServices from '../../../../../identifiers/mainSite/pages/services/IoTEngineeringServices';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';

const requestAQuoteButtonText = 'Request a quote';

test.beforeAll(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.InternetOfThings]);
});

test(
	qase(
		5126,
		'Check the Info container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const info = driver.getByTestId(IoTEngineeringServices.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services\nIoT');
		await expect(info.getByTestId(Container.Title)).toHaveText('IoT Engineering Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomIotQuote)).toHaveText('Get your custom IoT quote');
	}
);

test(
	qase(
		5132,
		'Check the container titles and numbers from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const containers = [
			driver.getByTestId(IoTEngineeringServices.WhatResultsCanYouExpect),
			driver.getByTestId(IoTEngineeringServices.IoTEngineeringSolutions),
			driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringServices),
			driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers),
			driver.getByTestId(IoTEngineeringServices.CaseStudy),
			driver.getByTestId(IoTEngineeringServices.IndustrySpecificIoTSolutions),
			driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess),
			driver.getByTestId(IoTEngineeringServices.OurApproachToIoTEngineering),
			driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts),
			driver.getByTestId(IoTEngineeringServices.RelatedServices),
			driver.getByTestId(IoTEngineeringServices.GetInTouch),
			driver.getByTestId(IoTEngineeringServices.RelatedArticles),
			driver.getByTestId(IoTEngineeringServices.Faq),
		];

		const expectedText: [string, string][] = [
			['What Results Can You Expect with Our IoT Expertise?', '01'],
			['IoT Engineering Solutions', '02'],
			['Our IoT Engineering Services', '03'],
			['IoT Technology Stack by Layers', '04'],
			['Case Study by Techstack', '05'],
			['Industry-specific IoT Solutions', '06'],
			['IoT Engineering Process', '07'],
			['Our Approach to IoT Engineering', '08'],
			['Our Internet of Things Engineering Experts', '09'],
			['Related Services', '10'],
			['Request a Free No-obligation Quote', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedText);
	}
);

test(
	qase(
		5594,
		'Check block titles in "What Results Can You Expect with Our IoT Expertise?" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const WhatResultsCanYouExpectContainer = driver.getByTestId(IoTEngineeringServices.WhatResultsCanYouExpect);
		const allBlockTitles = WhatResultsCanYouExpectContainer.getByTestId(Container.SectionNumber);
		const testData = ['01', '02', '03', '04'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5139,
		'Check section numbers and titles in "IoT Engineering Solutions" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ioTEngineeringSolutionsContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringSolutions);
		const actualTitles = ioTEngineeringSolutionsContainer.getByTestId(Container.SectionTitle);
		const expectedTitles = [
			'Lack of necessary skill sets',
			'Insufficient testing and updating',
			'Increased cost and time to market',
			'System security',
			'Connectivity',
			'Cross-platform capabilities',
			'Data collection and processing',
		];

		await expect(actualTitles).toHaveText(expectedTitles);
		await expect(ioTEngineeringSolutionsContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
		]);
	}
);

test(
	qase(
		5151,
		'Check section numbers and titles in "Our IoT Engineering Services" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ourIoTEngineeringServicesContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringServices);
		const containerBlocks = await ourIoTEngineeringServicesContainer.getByTestId(Container.ContainerSection).all();

		const sectionTitles = await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts();
		const sectionIndexes = await containerBlocks[0].getByTestId(Container.SectionNumber).allInnerTexts();
		const actualIndexesAndTitles: Map<string, string> = new Map();

		for (let i = 0; i < sectionTitles.length; i++) {
			actualIndexesAndTitles.set(sectionIndexes[i], sectionTitles[i]);
		}

		const expectedIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Enterprise automation and transformation'],
			['02', 'Smart home and office ecosystem'],
			['03', 'Quick start with a\u00A0hardware MVP'],
			['04', 'IoT development consulting'],
			['05', 'Integration of IoT devices into a\u00A0software ecosystem'],
		]);

		expect(actualIndexesAndTitles).toEqual(expectedIndexesAndTitles);
	}
);

test(
	qase(
		5158,
		'Check section titles and CTA button in "IoT Technology Stack by Layers" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ioTTechnologyStackByLayersContainer = driver.getByTestId(
			IoTEngineeringServices.IoTTechnologyStackByLayers
		);
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
			'6.Testing & processes',
		];

		expect(actualSectionTitles).toEqual(expectedSectionTitles);

		await expect(ioTTechnologyStackByLayersContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
			requestAQuoteButtonText
		);
	}
);

test(
	qase(
		5180,
		'Check section numbers and titles, block title, image, and CTA button in "Case Study by Techstack" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(IoTEngineeringServices.CaseStudy);
		const containerBlock = caseStudyContainer.getByTestId(Container.ContainerBlock);

		await expect(containerBlock.getByTestId(Container.BlockTitle)).toHaveText(
			'IoT Sensor Kit for Real-Time Environmental and Product Temperature Monitoring'
		);

		const sectionIndexes = await containerBlock.getByTestId(Container.SectionNumber).allInnerTexts();
		const sectionTitles = await containerBlock.getByTestId(Container.SectionTitle).allInnerTexts();

		const actualIndexesAndTitles: Map<string, string> = new Map();
		for (let i = 0; i < sectionTitles.length; i++) {
			actualIndexesAndTitles.set(sectionIndexes[i], sectionTitles[i]);
		}

		const expectedIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Deploys temperature and humidity sensors for comprehensive environmental tracking'],
			['02', 'Incorporates an infrared camera for surface temperature heat mapping'],
			['03', 'Enables real-time monitoring and historical data analysis'],
		]);

		expect(actualIndexesAndTitles).toEqual(expectedIndexesAndTitles);

		await expect(driver.getByTestId(MainSiteImages.SensorsScheme)).toBeVisible();
		await expect(driver.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText('Check out how we build it');
	}
);

test(
	qase(
		5167,
		'Check section titles in "Industry-specific IoT Solutions" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const industrySpecificIoTSolutionsContainer = driver.getByTestId(
			IoTEngineeringServices.IndustrySpecificIoTSolutions
		);
		const actualSectionTitles = industrySpecificIoTSolutionsContainer.getByTestId(Container.SectionTitle);
		const expectedSectionTitles = [
			'AgriTech',
			'Digital Transformation',
			'Transportation and Logistics',
			'Manufacturing',
			'Energy',
			'Healthcare',
		];

		await expect(actualSectionTitles).toHaveText(expectedSectionTitles);
	}
);

test(
	qase(
		5174,
		'Check carousel section numbers and titles, section and block titles, and CTA in "IoT Engineering Process" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ioTEngineeringProcessContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
		const carouselSections = await ioTEngineeringProcessContainer.getByTestId(Container.CarouselSection).all();
		const actualCarouselIndexesAndTitles: Map<string, string> = new Map();

		for (const carouselSection of carouselSections) {
			const index = await carouselSection.getByTestId(Container.SectionNumber).textContent();
			const title = await carouselSection.getByTestId(Container.SectionTitle).first().textContent();
			actualCarouselIndexesAndTitles.set(index!, title!);
		}

		const expectedCarouselIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Investigation'],
			['02', 'Execution'],
			['03', 'Performance'],
			['04', 'Analysis'],
		]);

		expect(actualCarouselIndexesAndTitles).toEqual(expectedCarouselIndexesAndTitles);
		expect(await ioTEngineeringProcessContainer.getByTestId(Container.BlockTitle).textContent()).toEqual(
			'New IoT Device Engineering'
		);

		const containerBlock = ioTEngineeringProcessContainer.getByTestId(Container.ContainerBlock);
		const actualNewIoTEngineeringDeviceTitles = await containerBlock
			.getByTestId(Container.SectionTitle)
			.allTextContents();
		const expectedNewIoTEngineeringDeviceTitles = [
			'Defining core system components;',
			'Hardware development;',
			'Edge application development;',
			'Creating Cloud Infrastructure;',
			'UI presentation development;',
			'Releasing the product in the\u00A0development environment;',
			'Testing;',
			'Releasing the product in the\u00A0production environment.',
		];

		expect(actualNewIoTEngineeringDeviceTitles).toEqual(expectedNewIoTEngineeringDeviceTitles);

		await expect(driver.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText('Get your quote now');
	}
);

test(
	qase(
		5185,
		'Check section titles and award cards in "Our Approach to IoT Engineering" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ourApproachToIoTEngineeringContainer = driver.getByTestId(
			IoTEngineeringServices.OurApproachToIoTEngineering
		);
		const actualSectionTitles = ourApproachToIoTEngineeringContainer.getByTestId(Container.SectionTitle);
		const expectedSectionTitles = ['Tech community', 'Ownership drives excellence'];

		await expect(actualSectionTitles).toHaveText(expectedSectionTitles);

		const awardCards = ourApproachToIoTEngineeringContainer.getByTestId(Container.AwardCard);

		await baseDriverSteps.checkImagesVisibility(awardCards, 3);
	}
);

test(
	qase(
		5194,
		'Check member names and roles in "Our Internet of Things Engineering Experts" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ourIoTEngineeringExpertsContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts);
		const allMemberRoles = ourIoTEngineeringExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'R&D Engineer, Software Engineering Lead,\nPossesses deep expertise in the development of \nenvironmental monitoring devices.',
			'Back-End Developer,\nCreates hardware-based software solutions\nfor environmental monitoring devices.',
			'Software Engineer,\nSpecializes in IoT & Cloud solutions, integrating AI/ML\nsolutions across various domains.',
			'Full-Stack Engineer,\nFocuses on IoT software products, environmental\nmonitoring devices, 3D printing & industrial solutions.',
		];

		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = ourIoTEngineeringExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [
			ExpertNames.OleksiiSvystun,
			ExpertNames.YevheniiKarachevtsev,
			ExpertNames.IvanKononenko,
			ExpertNames.EugeneLypskyi,
			ExpertNames.AndrewKurilenko,
		];

		await expect(allMemberNames).toHaveText(testDataNames);
	}
);

test(
	qase(
		5200,
		'Check section titles in "Related Services" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom software development',
			'UX/UI Design',
			'AI & ML',
			'Development consulting',
			'QA as a Service',
			'Big Data & Analytics',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5207,
		'Check section titles in "FAQ" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Why choose Techstack for IoT engineering?',
			'How does Techstack enhance the professional development of IoT engineers?',
			'What is an enterprise IoT engineering service?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterAll(async () => {
	await driver.closeDrivers();
});
