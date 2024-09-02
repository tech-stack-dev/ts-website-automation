import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import ConsultingService from '../../../../../identifiers/mainSite/pages/services/ConsultingService';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test(
	qase(
		5159,
		'Check Info container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const info = driver.getByTestId(ConsultingService.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services\nConsulting Service');
		await expect(info.getByTestId(Container.Title)).toHaveText('Software Consulting Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomAuditQuote)).toHaveText(
			'Get your custom audit quote'
		);
	}
);

test(
	qase(
		5186,
		'Check the container titles and numbers from the "Consulting service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const containers = [
			driver.getByTestId(ConsultingService.InformationTechnologyConsultingServices),
			driver.getByTestId(ConsultingService.ConsultingBenefits),
			driver.getByTestId(ConsultingService.OurITConsultingServices),
			driver.getByTestId(ConsultingService.FeaturedCaseStudy),
			driver.getByTestId(ConsultingService.IndustriesWeProvideConsultancyTo),
			driver.getByTestId(ConsultingService.ConsultingProcess),
			driver.getByTestId(ConsultingService.ConsultingExperts),
			driver.getByTestId(ConsultingService.OurApproach),
			driver.getByTestId(ConsultingService.MakeAnImpactWithUs),
			driver.getByTestId(ConsultingService.RelatedServices),
			driver.getByTestId(ConsultingService.GetInTouch),
			driver.getByTestId(ConsultingService.RelatedArticles),
			driver.getByTestId(ConsultingService.Faq),
		];

		const expectedData = [
			['Information Technology Consulting Services', '01'],
			['Consulting Benefits', '02'],
			['Our IT Consulting Services', '03'],
			['Featured Case Study', '04'],
			['Industries We Provide Consultancy To', '05'],
			['Consulting Process', '06'],
			['Consulting Experts', '07'],
			['Our Approach', '08'],
			['Make an Impact With Us', '09'],
			['Related Services', '10'],
			['Request a Free No-obligation Quote', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);

		// Checks for container titles from 'Our IT consulting services' container
		await expect(
			driver.getByTestId(ConsultingService.DevelopmentProcessAudit).getByTestId(Container.ContainerTitle)
		).toHaveText('Development Process Audit');

		await expect(
			driver.getByTestId(ConsultingService.SoftwareAudit).getByTestId(Container.ContainerTitle)
		).toHaveText('Software Audit');
	}
);

test(
	qase(
		5191,
		'Check section numbers and titles in "Information Technology Consulting Services" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const informationTechnologyConsultingServicesContainer = driver.getByTestId(
			ConsultingService.InformationTechnologyConsultingServices
		);
		const allSectionTitles = informationTechnologyConsultingServicesContainer.getByTestId(Container.SectionTitle);
		const testData = ['Infrastructure', 'Process audit', 'CI/CD roadmap', 'Testing strategy', 'UX analysis'];

		await expect(allSectionTitles).toHaveText(testData);
		await expect(informationTechnologyConsultingServicesContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);
	}
);

test(
	qase(
		5179,
		'Check section titles in "Consulting Benefits" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const consultingBenefitsContainer = driver.getByTestId(ConsultingService.ConsultingBenefits);
		const allSectionTitles = consultingBenefitsContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Eliminate waste of effort and focus on value;',
			'Minimize technical debt;',
			'Improve code quality and release a quality product;',
			'Improve motivation and engineering culture;',
			'Optimize infrastructure costs;',
			'Remove production issues and keep the environment stable.',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5181,
		'Check section titles in "Development Process Audit" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const developmentProcessAuditContainer = driver.getByTestId(ConsultingService.DevelopmentProcessAudit);
		const allSectionTitles = developmentProcessAuditContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Project management process',
			'Development process',
			'Release process / Integration layer',
			'QA process',
			'Business analytics process',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5197,
		'Check section titles and CTA button in "Software Audit" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const softwareAuditContainer = driver.getByTestId(ConsultingService.SoftwareAudit);
		const allSectionTitles = softwareAuditContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Architecture',
			'AWS',
			'Code quality',
			'Security',
			'UX / UI',
			'Testing artifacts',
			'Database and data model',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(softwareAuditContainer.getByTestId(MainSiteButtons.GetAFreeQquoteToday)).toHaveText(
			'Get a free quote today'
		);
	}
);

test(
	qase(
		5203,
		'Check section titles, image and CTA in "Featured Case Study" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const featuredCaseStudyContainer = driver.getByTestId(ConsultingService.FeaturedCaseStudy);
		const allSectionTitles = featuredCaseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['Outdated Tech Stack', 'Black Boxes in System Code'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(featuredCaseStudyContainer.getByTestId(MainSiteImages.FeaturedCaseStudy)).toBeVisible();

		await expect(featuredCaseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5209,
		'Check section numbers and titles, and CTA in "Industries We Provide Consultancy To" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const industriesWeProvideContainer = driver.getByTestId(ConsultingService.IndustriesWeProvideConsultancyTo);

		await expect(industriesWeProvideContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = industriesWeProvideContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Healthcare',
			'Transportation and Logistics',
			'Renewable Energy',
			'Manufacturing',
			'Digital Transformation',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(industriesWeProvideContainer.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote)).toHaveText(
			'Get your industry-specific quote'
		);
	}
);

test(
	qase(
		5213,
		'Check carousel section numbers and titles, and CTA in "Consulting Process" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const consultingProcessContainer = driver.getByTestId(ConsultingService.ConsultingProcess);
		const carouselSections = consultingProcessContainer.getByTestId(Container.CarouselSection);

		await expect(carouselSections.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
		]);

		const allSectionTitles = carouselSections.getByTestId(Container.SectionTitle);
		const testData = ['Discovery', 'Analysis', 'Brainstorming', 'Presentation', 'Implementation', 'Touch base'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5218,
		'Check member names and roles, and CTA in "Consulting Experts" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
		const allMemberRoles = consultingExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'R&D Engineer, Software Engineering Lead,\nYevhenii will advise the best custom solution',
			'Sr. Director of Quality Engineering,\nOversees technology-related initiatives',
			'VP of Engineering,\nFull-stack development and microservices expert',
			'Chief Creative Officer,\nAligns UX with users’ needs / business goals',
			'Head of Account Management,\nDrives cross-functional process transformation',
		];

		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = consultingExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [
			ExpertNames.OleksiiSvystun,
			ExpertNames.YevheniiKarachevtsev,
			ExpertNames.VitaliiDolotov,
			ExpertNames.IvanYeremenko,
			ExpertNames.DmytroDytiuk,
			ExpertNames.DmytroShtapauk,
		];

		await expect(allMemberNames).toHaveText(testDataNames);

		await expect(consultingExpertsContainer.getByTestId(MainSiteButtons.GetYourCustomQuote)).toHaveText(
			'Get your custom quote'
		);
	}
);

test(
	qase(
		5224,
		'Check section titles and award cards in "Our Approach" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);
		const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
		const testData = ['Open Source Contributions', 'Global Certifications', 'Profound Experience'];

		await expect(allSectionTitles).toHaveText(testData);

		const awardCards = ourApproachContainer.getByTestId(Container.AwardCard);
		await baseDriverSteps.checkImagesVisibility(awardCards, 6);
	}
);

test(
	qase(
		5228,
		'Check section titles in "Make an Impact With Us" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const makeAnImpactContainer = driver.getByTestId(ConsultingService.MakeAnImpactWithUs);
		const allSectionTitles = makeAnImpactContainer.getByTestId(Container.SectionTitle);
		const testData = ['Retain clients', 'Improve performance', 'Aim for quality'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5234,
		'Check section titles in "Related Services" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'UX/UI Design',
			'AI',
			'Custom software development',
			'Mobile development',
			'QA as a Service',
			'Big Data & Analytics',
			'Internet of Things',
			'Cloud App Development',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5239,
		'Check section titles in "FAQ" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const faqContainer = driver.getByTestId(ConsultingService.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Why are professional software consulting services necessary for business?',
			'Who are software development consultants, and what do they do?',
			'Why can Techstack provide software consultancy services to technology businesses?',
			'What types of companies benefit from software engineering consultancy the most?',
			'What types of audits do we offer?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
