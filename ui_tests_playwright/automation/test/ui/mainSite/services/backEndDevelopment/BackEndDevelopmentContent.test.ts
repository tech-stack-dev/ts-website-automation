import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import BackEndServices from '../../../../../identifiers/mainSite/pages/services/BackEndServices';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
});

test(
	qase(
		5527,
		'Check the Info container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const info = driver.getByTestId(BackEndServices.Info);

		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nBack-End Development');
		await expect(info.getByTestId(Container.Title)).toHaveText('Back-End Development Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomBEDevelopmentQuote)).toHaveText('Get your custom BE development quote');
	}
);

test(
	qase(
		5528,
		'Check the container titles and numbers from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const containers = [
			driver.getByTestId(BackEndServices.TechstackPowers),
			driver.getByTestId(BackEndServices.ExpertServices),
			driver.getByTestId(BackEndServices.BackendForAnySoftwareProduct),
			driver.getByTestId(BackEndServices.TechArsenal),
			driver.getByTestId(BackEndServices.CaseStudy),
			driver.getByTestId(BackEndServices.OurExperts),
			driver.getByTestId(BackEndServices.WhyTechstack),
			driver.getByTestId(BackEndServices.Partnering),
			driver.getByTestId(BackEndServices.PeekIntoBackend),
			driver.getByTestId(BackEndServices.BackendDevelopmentServices),
			driver.getByTestId(BackEndServices.HowWeCanWorkTogether),
			driver.getByTestId(BackEndServices.RelatedServices),
			driver.getByTestId(BackEndServices.GetInTouch),
			driver.getByTestId(BackEndServices.RelatedArticles),
			driver.getByTestId(BackEndServices.Faq),
		];

		const expectedData = [
			["Techstack's Powers in Back-End Development", '01'],
			['Expert Back-End Development Services', '02'],
			['Back-End Development Services for Any Software Product', '03'],
			['Our Tech Arsenal for Back-End Development', '04'],
			['Our Featured Back-End Case Study', '05'],
			['Our Leading Back-End Engineers', '06'],
			['Why Techstack Stands Out', '07'],
			['Partnering for Effective Back-End Development', '08'],
			['A Peek Into Our Back-End Development Process', '09'],
			['Back-End Development Services for Any Industry', '10'],
			['How We Can Work Together', '11'],
			['Related Services', '12'],
			['Get in Touch', '13'],
			['Related Articles', '14'],
			['FAQ', '15'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5532,
		'Check section titles in "Techstack’s Powers in Back-End Development" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const techstackPowersContainer = driver.getByTestId(BackEndServices.TechstackPowers);
		const allSectionTitles = techstackPowersContainer.getByTestId(Container.SectionTitle);
		const testData = ['Architect Tech Guild', 'Back-End Development as\nOur Core Expertise', 'Rising Tech Talent'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5526,
		'Check section titles and numbers, and CTA button in "Expert Back-End Development Services" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const expertServicesContainer = driver.getByTestId(BackEndServices.ExpertServices);

		await expect(expertServicesContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
		]);

		const allSectionTitles = expertServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Back-End\nDevelopment',
			'Database Design\nand Optimization',
			'Server Management\nand Deployment',
			'Microservices\nArchitecture',
			'Back-End Refactoring',
			'Technical\nBack-End Audit',
			'API Development\nand Integration',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(expertServicesContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5534,
		'Check section titles and numbers in "Back-End Development Services for Any Software Product" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const expertServicesContainer = driver.getByTestId(BackEndServices.BackendForAnySoftwareProduct);

		await expect(expertServicesContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

		const allSectionTitles = expertServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Back-End Development\nfor Mobile Apps',
			'Back-End Development\nfor Web Apps',
			'Back-End Development\nfor IoT',
			'Back-End Development\nfor AI/ ML',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5529,
		'Check section titles in "Our Tech Arsenal for Back-End Development" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const techArsenalContainer = driver.getByTestId(BackEndServices.TechArsenal);
		const allSectionTitles = techArsenalContainer.getByTestId(Container.SectionTitle);
		const BackEndTabData = [
			'Programming\nLanguages',
			'Server-Side\nTechnologies',
			'Database\nTechnologies',
			'Messaging',
			'API',
			'Caching',
			'Unit testing',
			'Cloud Services\nand Deployment\nPlatforms',
			'SDLC enabling\ntechnologies',
			'Servers',
			'Scripting\nand Miscellaneous',
		];
		await expect(allSectionTitles).toHaveText(BackEndTabData);
	}
);

test(
	qase(
		5530,
		'Check section titles, image and CTA in "Our Featured Back-End Case Study" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(BackEndServices.CaseStudy);
		const allSectionTitles = caseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['Complexity of\nData Management', 'Integration with\nExisting Systems'];

		await expect(allSectionTitles).toHaveText(testData);
		await expect(caseStudyContainer.getByTestId(MainSiteImages.BackendCaseStudy)).toBeVisible();
		await expect(caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5533,
		'Check member names, roles and CTA in "Our Leading Back-End Engineers" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BackEndServices.OurExperts);
		const allMemberRoles = ourExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'VP of Engineering,\nLeads the Tech Experts Program and the tech team',
			'Software Architect, Transforms business concepts into high-quality code and guides junior developers',
			'Senior Full Stack Software Engineer,\nLeads vital development initiatives',
			'Full Stack Software Engineer,\nDelivers scalable software solutions',
			'Full Stack Software Engineer,\nShapes business visions into code',
		];

		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = ourExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [
			ExpertNames.OleksiiSvystun,
			ExpertNames.IvanYeremenko,
			ExpertNames.SerhiiLedniov,
			ExpertNames.VladyslavUshakov,
			ExpertNames.OleksandrMakarov,
			ExpertNames.DmitryValko,
		];

		await expect(allMemberNames).toHaveText(testDataNames);
		await expect(ourExpertsContainer.getByTestId(MainSiteButtons.GetYourCustomQuote)).toHaveText(
			'Get your custom quote'
		);
	}
);

test(
	qase(
		5535,
		'Check section titles and award cards in "Why Techstack Stands Out" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const whyTechstackContainer = driver.getByTestId(BackEndServices.WhyTechstack);
		const sections = whyTechstackContainer.getByTestId(Container.ContainerSection);
		const numOfSections = 3;

		await expect(sections).toHaveCount(numOfSections);

		const sectionTitles = whyTechstackContainer.getByTestId(Container.SectionTitle);
		const expectedText = [
			'Solid back-end\nexpertise',
			'Cross-team\nknowledge\nsharing',
			'Product-oriented\napproach',
		];

		await expect(sectionTitles).toHaveText(expectedText);

		const awardCards = whyTechstackContainer.getByTestId(Container.AwardCard);

		await baseDriverSteps.checkImagesVisibility(awardCards, 6);
	}
);

test(
	qase(
		5531,
		'Check section titles and numbers in "Partnering for Effective Back-End Development" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const partneringContainer = driver.getByTestId(BackEndServices.Partnering);

		await expect(partneringContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
		]);

		const allSectionTitles = partneringContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Scalability',
			'High-load handling',
			'Improved performance',
			'Cost efficiency',
			'Customization and flexibility',
			'Reliability and stability',
			'Future-proofing',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5540,
		'Check carousel section numbers, titles and CTA in "A Peek Into Our Back-End Development Process" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const peekIntoBackendContainer = driver.getByTestId(BackEndServices.PeekIntoBackend);
		const carouselSections = await peekIntoBackendContainer.getByTestId(Container.CarouselSection).all();
		const actualCarouselIndexesAndTitles: Map<string, string> = new Map();

		for (const carouselSection of carouselSections) {
			const index = await carouselSection.getByTestId(Container.SectionNumber).textContent();
			const title = await carouselSection.getByTestId(Container.SectionTitle).textContent();
			actualCarouselIndexesAndTitles.set(index!, title!);
		}

		const expectedCarouselIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Requirement Analysis'],
			['02', 'Architecture Planning'],
			['03', 'Database Design'],
			['04', 'Development'],
			['05', 'API Development'],
			['06', 'Security Implementation'],
			['07', 'Testing and Quality\nAssurance'],
			['08', 'Optimization and\nPerformance Tuning'],
			['09', 'Deployment'],
			['10', 'Monitoring and\nMaintenance'],
			['11', 'Documentation'],
			['12', 'Support and Scalability'],
		]);

		expect(actualCarouselIndexesAndTitles).toEqual(expectedCarouselIndexesAndTitles);

		await expect(peekIntoBackendContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		5537,
		'Check section titles in "Back-End Development Services for Any Industry" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const backendDevelopmentServicesContainer = driver.getByTestId(BackEndServices.BackendDevelopmentServices);
		const allSectionTitles = backendDevelopmentServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Healthcare',
			'Transportation and logistics',
			'Renewable energy',
			'Manufacturing',
			'Agriculture',
			'Leisure and entertainment',
			'Fintech',
			'Digital transformation',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5539,
		'Check section titles, numbers and CTA in "How We Can Work Together" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const howWeCanWorkTogetherContainer = driver.getByTestId(BackEndServices.HowWeCanWorkTogether);

		await expect(howWeCanWorkTogetherContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);

		const allSectionTitles = howWeCanWorkTogetherContainer.getByTestId(Container.SectionTitle);
		const testData = ['Full-Cycle Back-End\nDevelopment', 'Back-End Audit', 'Back-End Engineers\nfor Your Product'];

		await expect(allSectionTitles).toHaveText(testData);
		await expect(howWeCanWorkTogetherContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5536,
		'Check section titles in "Related Services" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(BackEndServices.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom Software\nDevelopment',
			'Cloud Development',
			'Big Data & Analytics',
			'AI Development',
			'Internet of Things',
			'Mobile Development',
			'UX/ UI Design',
			'QA as a Service',
			'Consulting Services',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5538,
		'Check section titles in "FAQ" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const faqContainer = driver.getByTestId(BackEndServices.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What is back-end development, and why is it important for my product?',
			'What back-end technologies do you specialize in?',
			'How do you ensure the security of backend systems and user data?',
			'Can you integrate the\nback-end with third-party APIs or services?',
			'How do you handle scalability in backend development?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
