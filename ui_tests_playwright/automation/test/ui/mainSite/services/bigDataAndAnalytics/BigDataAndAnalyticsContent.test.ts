import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import BigDataAndAnalytics from '../../../../../identifiers/mainSite/pages/services/BigDataAndAnalytics';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
});

test(
	qase(
		4938,
		'Check the Info container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const info = driver.getByTestId(BigDataAndAnalytics.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nBig Data & Analytics');
		await expect(info.getByTestId(Container.Title)).toHaveText('Big Data Application Development Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomBigDataQuote)).toHaveText(
			'Get your custom Big Data quote'
		);
	}
);

test(
	qase(
		4950,
		'Check the container titles and numbers from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const containers = [
			driver.getByTestId(BigDataAndAnalytics.HowBigDataWillHelpYou),
			driver.getByTestId(BigDataAndAnalytics.BigDataSoftwareDevelopmentWithTechstack),
			driver.getByTestId(BigDataAndAnalytics.BigDataSolutionsTechnologyStack),
			driver.getByTestId(BigDataAndAnalytics.BigDataCaseStudies),
			driver.getByTestId(BigDataAndAnalytics.IndustrySpecificBigDataSolutions),
			driver.getByTestId(BigDataAndAnalytics.WhyChooseTechstackBigDataServices),
			driver.getByTestId(BigDataAndAnalytics.OurExperts),
			driver.getByTestId(BigDataAndAnalytics.RelatedServices),
			driver.getByTestId(BigDataAndAnalytics.GetInTouch),
			driver.getByTestId(BigDataAndAnalytics.RelatedArticles),
			driver.getByTestId(BigDataAndAnalytics.Faq),
		];

		const expectedData = [
			['How Big Data Will Help You', '01'],
			['Big Data Software Development With Techstack', '02'],
			['Big Data Solutions Technology Stack', '03'],
			['Big Data Case Studies', '04'],
			['Industry-specific Big Data Solutions', '05'],
			['Why Choose Techstack’s Big Data Software Development Services?', '06'],
			['Our Experts', '07'],
			['Related Services', '08'],
			['Get in Touch', '09'],
			['Related Articles', '10'],
			['FAQ', '11'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		4962,
		'Check section numbers and titles in "How Big Data Will Help You" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const howBigDataWillHelpYouContainer = driver.getByTestId(BigDataAndAnalytics.HowBigDataWillHelpYou);

		await expect(howBigDataWillHelpYouContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);
		const allSectionTitles = howBigDataWillHelpYouContainer.getByTestId(Container.SectionTitle);
		const testData = ['Monetize data', 'Personalize experiences', 'Improve efficiency', 'Evaluate opportunities'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4967,
		'Check section titles and CTA button in "Big Data Software Development With Techstack" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const bigDataWithTechstackContainer = driver.getByTestId(
			BigDataAndAnalytics.BigDataSoftwareDevelopmentWithTechstack
		);
		const allSectionTitles = bigDataWithTechstackContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Data infrastructure and engineering',
			'Real-time data analytics',
			'Predictive analytics',
			'Task Automation',
			'Data visualization',
			'Analytics integration',
			'Consulting Services',
		];
		await expect(allSectionTitles).toHaveText(testData);

		await expect(bigDataWithTechstackContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		4972,
		'Check section titles in "Big Data Solutions Technology Stack" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const bigDataTechnologyStackContainer = driver.getByTestId(BigDataAndAnalytics.BigDataSolutionsTechnologyStack);
		const allSectionTitles = bigDataTechnologyStackContainer.getByTestId(Container.SectionTitle);
		const testData = TechnologyStackData.AiMLDataScieceTab;

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4978,
		'Check section titles, block title, image and CTA button in "Big Data Case Studies" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const bigDataCaseStudiesContainer = driver.getByTestId(BigDataAndAnalytics.BigDataCaseStudies);
		const allSectionTitles = bigDataCaseStudiesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Early Anomaly Detection',
			'Real-Time Monitoring',
			'Cloud Storage and Analysis',
			'Improved Efficiency',
			'Cost Savings',
		];
		await expect(allSectionTitles).toHaveText(testData);

		await expect(bigDataCaseStudiesContainer.getByTestId(Container.BlockTitle)).toHaveText(
			'Video-based quality control scheme'
		);
		await expect(bigDataCaseStudiesContainer.getByTestId(MainSiteImages.SchemaCaseStudy)).toBeVisible();
		await expect(bigDataCaseStudiesContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		4984,
		'Check section titles and CTA button in "Industry-specific Big Data Solutions" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const industrySpecificContainer = driver.getByTestId(BigDataAndAnalytics.IndustrySpecificBigDataSolutions);
		const allSectionTitles = industrySpecificContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Transportation and Logistics',
			'Healthcare',
			'Digital Transformation',
			'Fintech',
			'Manufacturing',
			'E-Commerce',
		];
		await expect(allSectionTitles).toHaveText(testData);

		await expect(industrySpecificContainer.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote)).toHaveText(
			'Get your industry-specific quote'
		);
	}
);

test(
	qase(
		4989,
		'Check section titles and award cards in "Why Choose Techstack’s Big Data Software Development Services?" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const whyChooseTechstackContainer = driver.getByTestId(BigDataAndAnalytics.WhyChooseTechstackBigDataServices);
		const allSectionTitles = whyChooseTechstackContainer.getByTestId(Container.SectionTitle);
		const testData = ['Product ownership', 'Domain proficiency', 'Tech community'];

		await expect(allSectionTitles).toHaveText(testData);

		const awardCards = whyChooseTechstackContainer.getByTestId(Container.AwardCard);
		const numberOfCards = 2;
		await baseDriverSteps.checkImagesVisibility(awardCards, numberOfCards);
	}
);

test(
	qase(
		4994,
		'Check member names, roles and CTA button in "Our Experts" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
		const allMemberRoles = ourExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'R&D Engineer, Software Engineering Lead,Will advise the best custom solution',
			'Data Scientist,Analyzes data for actionable insights',
			'VP of Engineering,\nLeads the Tech Experts program and team',
		];

		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = ourExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [
			ExpertNames.OleksiiSvystun,
			ExpertNames.YevheniiKarachevtsev,
			ExpertNames.OleksandrBezrukov,
			ExpertNames.IvanYeremenko,
		];

		await expect(allMemberNames).toHaveText(testDataNames);

		await expect(ourExpertsContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		4999,
		'Check section titles in "Related Services" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(BigDataAndAnalytics.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom software development',
			'UX/UI Design',
			'AI & ML',
			'Development consulting',
			'QA as a Service',
			'Cloud & DevOps',
			'Internet of Things',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5005,
		'Check section titles in "FAQ" container from the "Big Data & Analytics" page @desktop @mobile @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const faqContainer = driver.getByTestId(BigDataAndAnalytics.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What is the typical team composition of a Big Data-focused product?',
			'How long does it take to build a software product with Techstack?',
			'How long does it take to hire a product starter engineer?',
			'What is the difference between descriptive, predictive, and prescriptive analytics?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
