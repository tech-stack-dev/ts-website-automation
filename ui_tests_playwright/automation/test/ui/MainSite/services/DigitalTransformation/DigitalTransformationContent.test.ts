import {expect, test} from '@playwright/test';
import { baseDriverSteps } from '../../../../../base/step/BaseDriverSteps';
import { driver } from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import UrlPath from '../../../../../providers/UrlPath';
import DigitalTransformation from '../../../../../identifiers/MainSite/pages/services/DigitalTransformation';
import Container from '../../../../../identifiers/Container';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DigitalTransform));
});

test('Check the Info container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const info = driver.getByTestId(DigitalTransformation.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nDigital Transformation');
	await expect(info.getByTestId(Container.Title)).toHaveText('Digital Transformation\nServices');
	await expect(info.getByTestId(MainSiteButtons.GetInTouch)).toHaveText('Get in Touch');
});

test('Check the container titles and numbers from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const containers = [
		driver.getByTestId(DigitalTransformation.OurAchievementsInITTransformation),
		driver.getByTestId(DigitalTransformation.DigitalBusinessTransformation),
		driver.getByTestId(DigitalTransformation.IndustriesWeServe),
		driver.getByTestId(DigitalTransformation.SuccessStories),
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
		['Our Achievements\nin IT Transformation\nServices', '01'],
		['Digital Business\nTransformation\nServices', '02'],
		['Industries We Serve', '03'],
		['Success Stories as a\nDigital Transformation\nService Provider', '04'],
		['Technologies\nWe Use for Digital\nTransformation', '05'],
		['Digital Transformation\nStrategy', '06'],
		['How Techstack Can\nInfluence Your Digital\nTransformation', '07'],
		['Digital Transformation\nProduct Map', '08'],
		['Technology\nTransformation\nWorkflow', '09'],
		['Get in Touch', '10'],
		['Related Articles', '11'],
		['FAQ', '12'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check section titles in "Our Achievements in IT Transformation Services" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const ourAchievementsContainer = driver.getByTestId(DigitalTransformation.OurAchievementsInITTransformation);
	const allSectionTitles = ourAchievementsContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = ['Our partner grew from 10 to 60 with our expertise', 'Mobile app & IoT device in 1 month', 'From MVP to unicorn in 7 years'];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);
});

test('Check section numbers and titles in "Digital Business Transformation Services" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
 	const digitalBusinessTransformationContainer = driver.getByTestId(DigitalTransformation.DigitalBusinessTransformation);

	await expect(digitalBusinessTransformationContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

	const allSectionTitles = digitalBusinessTransformationContainer.getByTestId(Container.SectionTitle);
	const testData = [
		' Customer experience',
		' Operational processes',
		' Business models',
		' Process and workforce automation',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section numbers and section titles in "Industries We Serve" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
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
});

test('Check section titles, image and CTA button`s title in "Success Stories" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const successStoriesContainer = driver.getByTestId(DigitalTransformation.SuccessStories);
	const allSectionTitles = successStoriesContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = [
		'First-mile\ntraceability',
		'Quality control\nand tracking',
		'Business\ntransparency',
		'Tracking and\naggregation\nsystem',
		'Aggregation of\ndata sources',
		'Automated data\nmanagement',
	];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);

	await expect(successStoriesContainer.getByTestId(MainSiteImages.SuccessStories)).toBeVisible();

	await expect(successStoriesContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy)).toHaveText(
		'Read Full Case Study'
	);
});

test('Check section titles in "Technologies We Use for Digital Transformation" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const technologiesContainer = driver.getByTestId(DigitalTransformation.TechnologiesWeUse);
	const allSectionTitles = technologiesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Front-End\nand Back-End\nDevelopment',
		'Mobile App\nDevelopment',
		'Cloud Solutions',
		'DevOps',
		'Big Data & Analytics',
		'IoT (Internet of Things)',
		'AI & ML',
		'QA Manual & Automation',
		'UX / UI Design',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles and award cards in "Digital Transformation Strategy" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const digitalTransformationContainer = driver.getByTestId(DigitalTransformation.DigitalTransformationStrategy);
	const allSectionTitles = digitalTransformationContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'High standards\nand tech culture',
		'Customer-centric\napproach',
		'Access our entire\ncompany\'s\nexpertise',
		'Continuous\nevaluation and\nimprovement', 'Expertise you\ncan trust'
	];

	await expect(allSectionTitles).toHaveText(testData);

	const awardCards = digitalTransformationContainer.getByTestId(Container.AwardCard);
	await baseDriverSteps.checkImagesVisibility(awardCards, 8);
});

test('Check section titles and CTA button in "How Techstack Can Influence Your Digital Transformation" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
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

	await expect(ourUiUxServicesContainer.getByTestId(MainSiteButtons.ScheduleAConsultation)).toHaveText('Schedule a Consultation');
});

test('Check section titles and image in "Digital Transformation Product Map" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const digitalTransformationContainer = driver.getByTestId(DigitalTransformation.DigitalTransformationProductMap);
	const allSectionTitles = digitalTransformationContainer.getByTestId(Container.SectionTitle);
	const testDataSectionTitles = [
		'Netherlands',
		'USA, Georgia',
		'USA, Illinois',
		'Switzerland, Zurich',
		'Ottawa, Canada',
		'Australia',
	];

	await expect(allSectionTitles).toHaveText(testDataSectionTitles);

	await expect(digitalTransformationContainer.getByTestId(MainSiteImages.CompleteMap)).toBeVisible();
});

test('Check carousel section numbers and titles in "Technology Transformation Workflow" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
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
});

test('Check section titles in "FAQ" container from the "Digital Transformation Services" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const faqContainer = driver.getByTestId(DigitalTransformation.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Why is digital transformation important for businesses?',
		'How can digital transformation services\nand solutions benefit my company?',
		'What are some common challenges faced during digital transformation?',
		'What steps should I take\nto implement digital transformation in my organization?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});