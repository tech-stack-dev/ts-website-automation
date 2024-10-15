import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import DigitalTransformation from '../../../../../identifiers/mainSite/pages/services/DigitalTransformation';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, expect, test} from '../../../../../fixtures/DesktopMobileSetup';
import { arrayUtils } from '../../../../../utils/ArrayUtils';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DigitalTransform));
});

test(
	qase(
		5000,
		'Check the Info container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const info = driver.getByTestId(DigitalTransformation.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services\nDigital Transformation');
		await expect(info.getByTestId(Container.Title)).toHaveText('Digital Transformation Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourPersonalizedDxQuote)).toHaveText(
			'Get your personalized DX quote'
		);
	}
);

test(
	qase(
		5016,
		'Check the container titles and numbers from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const containers = [
			driver.getByTestId(DigitalTransformation.OurAchievementsInITTransformation),
			driver.getByTestId(DigitalTransformation.DigitalBusinessTransformation),
			driver.getByTestId(DigitalTransformation.IndustriesWeServe),
			driver.getByTestId(DigitalTransformation.CaseStudy),
			driver.getByTestId(DigitalTransformation.TechnologiesWeUse),
			driver.getByTestId(DigitalTransformation.DigitalTransformationStrategy),
			driver.getByTestId(DigitalTransformation.HowTechstackInfluence),
			driver.getByTestId(DigitalTransformation.DigitalTransformationProductMap),
			driver.getByTestId(DigitalTransformation.TechnologyTransformationWorkflow),
			driver.getByTestId(DigitalTransformation.GetInTouch),
			driver.getByTestId(DigitalTransformation.RelatedArticles),
			driver.getByTestId(DigitalTransformation.Faq),
		];

		const expectedData = [
			['Our Achievements in IT Transformation Services', '01'],
			['Digital Business Transformation Services', '02'],
			['Industries We Serve', '03'],
			['Case Study by Techstack', '04'],
			['Technologies We Use for Digital Transformation', '05'],
			['Digital Transformation Strategy', '06'],
			['How Techstack Can Influence Your Digital Transformation', '07'],
			['Digital Transformation Product Map', '08'],
			['Technology Transformation Workflow', '09'],
			['Request a Free No-obligation Quote', '10'],
			['Related Articles', '11'],
			['FAQ', '12'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5006,
		'Check section titles in "Our Achievements in IT Transformation Services" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const ourAchievementsContainer = driver.getByTestId(DigitalTransformation.OurAchievementsInITTransformation);
		const allSectionTitles = ourAchievementsContainer.getByTestId(Container.SectionTitle);
		const testDataSectionTitles = [
			'Our partner grew from 10 to 60 with our expertise',
			'Mobile app & IoT device in 1 month',
			'From MVP to unicorn in 7 years',
		];

		await expect(allSectionTitles).toHaveText(testDataSectionTitles);
	}
);

test(
	qase(
		5010,
		'Check section numbers, titles and CTA button text in "Digital Business Transformation Services" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const digitalBusinessTransformationContainer = driver.getByTestId(
			DigitalTransformation.DigitalBusinessTransformation
		);

		await expect(digitalBusinessTransformationContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);

		const allSectionTitles = digitalBusinessTransformationContainer.getByTestId(Container.SectionTitle);
		const testData = [
			' Customer experience',
			' Operational processes',
			' Business models',
			' Process and workforce automation',
		];

		await expect(allSectionTitles).toHaveText(testData);
		await expect(digitalBusinessTransformationContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5023,
		'Check section numbers and titles in "Industries We Serve" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(DigitalTransformation.IndustriesWeServe);

		await expect(industriesWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
		]);

		const allSectionTitles = industriesWeServeContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Healthcare',
			'Transportation and logistics',
			'Renewable energy',
			'Manufacturing',
			'Retail and e-commerce',
			'Sales and marketing',
			'Human resources',
			'AgroTech',
			'Hospitality',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5033,
		'Check section titles, image and CTA button`s title in "Case Study by Techstack" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(DigitalTransformation.CaseStudy);
		const containerBlock = caseStudyContainer.getByTestId(Container.ContainerBlock);

		await expect(containerBlock.getByTestId(Container.BlockTitle)).toHaveText(
			'AgriTech Solution Improving Harvest Management'
		);

		const sectionIndexes = await containerBlock.getByTestId(Container.SectionNumber).allInnerTexts();
		const sectionTitles = await containerBlock.getByTestId(Container.SectionTitle).allInnerTexts();
		const actualIndexesAndTitles = arrayUtils.mergeTwoArraysToMap(sectionIndexes, sectionTitles);

		const expectedIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Introduces a proof-of-concept (POC) IoT device for real-time farmer location tracking'],
			['02', 'Synchronizes field data with a user-friendly mobile application'],
			['03', 'Deploys a robust cloud platform for end-to-end harvest management'],
		]);

		expect(actualIndexesAndTitles).toEqual(expectedIndexesAndTitles);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.SuccessStories)).toBeVisible();
		await expect(caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5029,
		'Check section titles in "Technologies We Use for Digital Transformation" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const technologiesContainer = driver.getByTestId(DigitalTransformation.TechnologiesWeUse);
		const allSectionTitles = technologiesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Front-End and Back-End Development',
			'Mobile App Development',
			'Cloud Solutions',
			'DevOps',
			'Big Data & Analytics',
			'IoT (Internet of Things)',
			'AI & ML',
			'QA Manual & Automation',
			'UX / UI Design',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5039,
		'Check section titles, award cards and CTA button in "Digital Transformation Strategy" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const digitalTransformationContainer = driver.getByTestId(DigitalTransformation.DigitalTransformationStrategy);
		const allSectionTitles = digitalTransformationContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'High standards and tech culture',
			'Customer-centric approach',
			"Access our entire company's expertise",
			'Continuous evaluation and improvement',
			'Expertise you can trust',
		];

		await expect(allSectionTitles).toHaveText(testData);

		const awardCards = digitalTransformationContainer.getByTestId(Container.AwardCard);
		await baseDriverSteps.checkImagesVisibility(awardCards, 8);

		await expect(digitalTransformationContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
			'Request a quote'
		);
	}
);

test(
	qase(
		5046,
		'Check section titles in "How Techstack Can Influence Your Digital Transformation" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const ourUiUxServicesContainer = driver.getByTestId(DigitalTransformation.HowTechstackInfluence);
		const allSectionTitles = ourUiUxServicesContainer.getByTestId(Container.SectionTitle);
		const testDataSectionTitles = [
			'Transparent coordination',
			'Labor productivity',
			'Improved product quality control',
			'Response to demand fluctuations',
			'Business performance metrics',
		];

		await expect(allSectionTitles).toHaveText(testDataSectionTitles);
	}
);

test(
	qase(
		5059,
		'Check section titles and image in "Digital Transformation Product Map" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const digitalTransformationContainer = driver.getByTestId(
			DigitalTransformation.DigitalTransformationProductMap
		);
		const allSectionTitles = digitalTransformationContainer.getByTestId(Container.SectionTitle);
		const testDataSectionTitles = [
			'Netherlands',
			'USA, Georgia',
			'USA, Illinois',
			'Switzerland, Zurich',
			'Canada, Ottawa',
			'Australia',
		];

		await expect(allSectionTitles).toHaveText(testDataSectionTitles);

		const mobileMaps = [MainSiteImages.UsaMap, MainSiteImages.EuropeMap, MainSiteImages.AustraliaMap];
		mobileMaps.forEach(async (mobileMap) => {
			const mapIdentifiers = await containerSteps.getDynamicLocator({
				desktopLocator: MainSiteImages.CompleteMap,
				mobileLocator: mobileMap,
			});

			await expect(mapIdentifiers).toBeVisible();
		});
	}
);

test(
	qase(
		5054,
		'Check carousel section numbers and titles in "Technology Transformation Workflow" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const technologyWorkflowContainer = driver.getByTestId(DigitalTransformation.TechnologyTransformationWorkflow);
		const carousel = technologyWorkflowContainer.getByTestId(Container.ContainerCarousel);
		const carouselSections = await carousel.getByTestId(Container.CarouselSection).all();

		for (let i = 1; i <= carouselSections.length; i++) {
			const sectionNumber = i.toString().padStart(2, '0');
			await expect(carousel.getByTestId(Container.SectionNumber).nth(i - 1)).toHaveText(sectionNumber);
		}

		await expect(carousel.getByTestId(Container.SectionTitle)).toHaveText([
			'Discovery stage',
			'Strategic brainstorming stage',
			'Delivery stage',
			'Support & maintenance stage',
		]);
	}
);

test(
	qase(
		5067,
		'Check section titles in "FAQ" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const faqContainer = driver.getByTestId(DigitalTransformation.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Why is digital transformation important for businesses?',
			'How can digital transformation services and solutions benefit my company?',
			'What are some common challenges faced during digital transformation?',
			'What steps should I take to implement digital transformation in my organization?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
