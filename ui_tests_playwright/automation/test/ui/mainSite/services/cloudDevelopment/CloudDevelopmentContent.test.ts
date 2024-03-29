import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import CloudDevelopment from '../../../../../identifiers/mainSite/pages/services/CloudDevelopment';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test(
	qase(5038, 'Check the Info container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'),
	async () => {
		const info = driver.getByTestId(CloudDevelopment.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCloud Development');
		await expect(info.getByTestId(Container.Title)).toHaveText('Cloud Application\nDevelopment Services');
		await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a Quote');
	}
);

test(
	qase(
		5051,
		'Check the container titles and numbers from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const containers = [
			driver.getByTestId(CloudDevelopment.LeverageCloudNativeDevServ),
			driver.getByTestId(CloudDevelopment.CaseStudy),
			driver.getByTestId(CloudDevelopment.IndustriesWeServe),
			driver.getByTestId(CloudDevelopment.TechnologyStack),
			driver.getByTestId(CloudDevelopment.CloudComputingDevelopmentBenefits),
			driver.getByTestId(CloudDevelopment.OurApproach),
			driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts),
			driver.getByTestId(CloudDevelopment.RelatedServices),
			driver.getByTestId(CloudDevelopment.GetInTouch),
			driver.getByTestId(CloudDevelopment.RelatedArticles),
			driver.getByTestId(CloudDevelopment.Faq),
		];
		const expectedData = [
			['Leverage Cloud Native\nDevelopment Services', '01'],
			['Case Study by Techstack', '02'],
			['Industries We Serve', '03'],
			['Technology Stack', '04'],
			['Cloud Computing Development Benefits', '05'],
			['Our Approach\nto Cloud App Development', '06'],
			['Our Leading Cloud Experts', '07'],
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
		5056,
		'Check section numbers and titles in "Leverage Cloud Native Development Services" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const leverageCloudNativeDevServContainer = driver.getByTestId(CloudDevelopment.LeverageCloudNativeDevServ);
		await expect(leverageCloudNativeDevServContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = leverageCloudNativeDevServContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Cloud application development',
			'Cloud integration',
			'Cloud migration',
			'Cloud architecture setup',
			'Cloud consulting',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5065,
		'Check section titles, block title, image and CTA in "Case Study by Techstack" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(CloudDevelopment.CaseStudy);
		const allSectionTitles = caseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['High-load infrastructure', 'Data integrity', 'Scalability'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(caseStudyContainer.getByTestId(Container.BlockTitle)).toHaveText(
			'Cloud platform for car charging stations'
		);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.SchemaCaseStudy)).toBeVisible();
		await expect(caseStudyContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy)).toHaveText(
			'Read Full Case Study'
		);
	}
);

test(
	qase(
		5075,
		'Check section titles in "Industries We Serve" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(CloudDevelopment.IndustriesWeServe);
		const allSectionTitles = industriesWeServeContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Healthcare',
			'Transportation and Logistics',
			'Manufacturing',
			'Renewable energy',
			'Digital transformation',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5071,
		'Check section titles in "Technology stack" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(CloudDevelopment.TechnologyStack);
		const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);

		await expect(allSectionTitles).toHaveText(TechnologyStackData.CloudAndDevOpsTab);
	}
);

test(
	qase(
		5082,
		'Check section numbers and titles, and CTA in "Cloud Computing Development Benefits" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const cloudComputingDevBenefitsContainer = driver.getByTestId(
			CloudDevelopment.CloudComputingDevelopmentBenefits
		);

		await expect(cloudComputingDevBenefitsContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
		]);

		const allSectionTitles = cloudComputingDevBenefitsContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Lower costs',
			'Enhanced scalability options',
			'Improved flexibility',
			'Data loss prevention',
			'Increased security',
			'Improved data analysis',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(cloudComputingDevBenefitsContainer.getByTestId(MainSiteButtons.RequestMoreInformation)).toHaveText(
			'Request More Information'
		);
	}
);

test(
	qase(
		5087,
		'Check award cards in "Our Approach to Cloud App Development" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(CloudDevelopment.OurApproach);
		const awardCards = ourApproachContainer.getByTestId(Container.AwardCard);
		await baseDriverSteps.checkImagesVisibility(awardCards, 3);
	}
);

test(
	qase(
		5102,
		'Check member names and roles, and CTA button in "Our Leading Cloud Experts" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const ourCloudDevOpsExpertsContainer = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
		const allMemberRoles = ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'VP of Engineering,\nLeads the Tech Experts program and team',
			'Senior Full Stack Software Engineer,\nLeads vital development initiatives',
		];
		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = ourCloudDevOpsExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [ExpertNames.OleksiiSvystun, ExpertNames.IvanYeremenko, ExpertNames.VladyslavUshakov];
		await expect(allMemberNames).toHaveText(testDataNames);

		await expect(ourCloudDevOpsExpertsContainer.getByTestId(MainSiteButtons.ScheduleAConsultation)).toHaveText(
			'Schedule a Consultation'
		);
	}
);

test(
	qase(
		5099,
		'Check section titles in "Related Services" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(CloudDevelopment.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'DevOps',
			'Custom software development',
			'UX/UI Design',
			'AI & ML',
			'Development consulting',
			'QA as a Service',
			'Big Data & Analytics',
			'Internet of Things',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5109,
		'Check section titles in "FAQ" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692'
	),
	async () => {
		const faqContainer = driver.getByTestId(CloudDevelopment.Faq);

		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'How do I develop a cloud\nstrategy?',
			'How can I get started with cloud application development services?',
			'Can you migrate our existing on-premises applications to the cloud?',
			'Can you integrate cloud applications with other systems or third-party services?',
			'What do I need to do to\nprepare for the cloud?',
			'How can I ensure the cloud is secure?',
			'What are the advantages of cloud-native application development?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
