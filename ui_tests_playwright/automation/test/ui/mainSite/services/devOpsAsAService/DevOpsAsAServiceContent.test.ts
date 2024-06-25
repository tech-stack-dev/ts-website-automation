import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import {DevOpsAsAService} from '../../../../../identifiers/mainSite/pages/services/DevOpsAsAService';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DevOpsServ));
});

test(
	qase(
		4883,
		'Check the Info container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const info = driver.getByTestId(DevOpsAsAService.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nDevOps');
		await expect(info.getByTestId(Container.Title)).toHaveText('DevOps Services & Solutions');
		await expect(info.getByTestId(MainSiteButtons.GetYouCustomDevOpsQuote)).toHaveText('Get you custom DevOps quote');
	}
);

test(
	qase(
		4904,
		'Check the container titles and numbers from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const containers = [
			driver.getByTestId(DevOpsAsAService.DevOpsSolutionBenefits),
			driver.getByTestId(DevOpsAsAService.LeverageDevOpsServices),
			driver.getByTestId(DevOpsAsAService.TechnologyStack),
			driver.getByTestId(DevOpsAsAService.SuccessStories),
			driver.getByTestId(DevOpsAsAService.IndustriesWeServe),
			driver.getByTestId(DevOpsAsAService.OurApproach),
			driver.getByTestId(DevOpsAsAService.TheValueTechstackAddsToProducts),
			driver.getByTestId(DevOpsAsAService.OurExperts),
			driver.getByTestId(DevOpsAsAService.DevOpsAsAServicePipeline),
			driver.getByTestId(DevOpsAsAService.RelatedServices),
			driver.getByTestId(DevOpsAsAService.GetInTouch),
			driver.getByTestId(DevOpsAsAService.RelatedArticles),
			driver.getByTestId(DevOpsAsAService.Faq),
		];
		const expectedData = [
			['DevOps Solution Benefits', '01'],
			['Leverage DevOps Services', '02'],
			['Technology stack', '03'],
			['Success Stories', '04'],
			['Industries We Serve', '05'],
			['Our Approach to DevOps', '06'],
			['The Value Techstack Adds to Products', '07'],
			['Our DevOps experts', '08'],
			['DevOps as a Service: Pipeline', '09'],
			['Related Services', '10'],
			['Get in Touch', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		4899,
		'Check section numbers and titles in "DevOps Solution Benefits" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const devOpsSolutionBenefitsContainer = driver.getByTestId(DevOpsAsAService.DevOpsSolutionBenefits);

		await expect(devOpsSolutionBenefitsContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = devOpsSolutionBenefitsContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Enhanced efficiency\nand streamlined delivery',
			'Confidence in secure,\nstreamlined development',
			'Comprehensive insights\nfor enhanced performance',
			'Reliable networks\nwith secure access',
			'Streamlined productivity\nwith automated infrastructure',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4922,
		'Check section titles, images and CTA button in "Leverage DevOps Services" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const leverageDevOpsServicesrContainer = driver.getByTestId(DevOpsAsAService.LeverageDevOpsServices);
		const allSectionTitles = leverageDevOpsServicesrContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'AWS, Google Cloud,\nand Azure',
			'Terraform',
			'Kubernetes',
			'CI/CD pipeline',
			'Git flow',
			'Quality gates',
			'Disaster recovery\nplan',
			'SRE services',
			'Logging and\nmonitoring',
			'DevSecOps',
		];

		await expect(allSectionTitles).toHaveText(testData);

		const images = [MainSiteImages.Terraform, MainSiteImages.Kubernetes];

		for (const image of images) {
			await expect(leverageDevOpsServicesrContainer.getByTestId(image)).toBeVisible();
		}

		await expect(leverageDevOpsServicesrContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		4916,
		'Check section titles in "Technology stack" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(DevOpsAsAService.TechnologyStack);
		const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);

		await expect(allSectionTitles).toHaveText(TechnologyStackData.CloudAndDevOpsTab);
	}
);

test(
	qase(
		4929,
		'Check section titles and CTA in "Success Stories" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const successStoriesContainer = driver.getByTestId(DevOpsAsAService.SuccessStories);
		const allSectionTitles = successStoriesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Seamless Integration\nof Multiple Monolithic\nSystems',
			'Implementation\nof the 9 Dots Menu\nPattern',
			'Overcoming\nTechnical\nChallenges',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(successStoriesContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		4939,
		'Check section numbers and titles, and CTA button in "Industries We Serve" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(DevOpsAsAService.IndustriesWeServe);

		await expect(industriesWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = industriesWeServeContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Renewable Energy',
			'Healthcare',
			'Logistics and Transportation',
			'Manufacturing',
			'Digital Transformation',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(industriesWeServeContainer.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote)).toHaveText(
			'Get your industry-specific quote'
		);
	}
);

test(
	qase(
		4948,
		'Check section titles and images in "Our Approach to DevOps" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const ourApproachToDevOpsContainer = driver.getByTestId(DevOpsAsAService.OurApproach);
		const awardCards = ourApproachToDevOpsContainer.getByTestId(Container.AwardCard);
		const allSectionTitles = ourApproachToDevOpsContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Collaboration\nand communication',
			'Continuous integration\nand continuous delivery',
			'Reliability\nand stability',
			'Security is\na top priority',
			'Scalability\nand flexibility',
			'Certification',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await baseDriverSteps.checkImagesVisibility(awardCards, 6);
	}
);

test(
	qase(
		4957,
		'Check section numbers and titles in "The Value Techstack Adds to Products" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const theValueToProductsContainer = driver.getByTestId(DevOpsAsAService.TheValueTechstackAddsToProducts);

		await expect(theValueToProductsContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);

		const allSectionTitles = theValueToProductsContainer.getByTestId(Container.SectionTitle);
		const testData = ['Custom orchestration expertise', 'Skilled DevOps team', 'Efficient CI/CD Systems'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4973,
		'Check member names and roles, and CTA button in "Our DevOps experts" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const ourDevOpsExpertsContainer = driver.getByTestId(DevOpsAsAService.OurExperts);
		const allMemberRoles = ourDevOpsExpertsContainer.getByTestId(Container.MemberRole);
		const testDataRoles = [
			'CTO, Software Architect,\nElaborates on the technology strategy',
			'DevOps Engineer,\nElaborates on smooth development and operation',
			'DevOps Engineer,\nEnables seamless development and operations',
			'DevOps System Engineer,\nEnsures seamless DevOps integration',
			'DevOps Engineer, \nEnhances development and operations',
			'DevOps Engineer,\nEnsures that development aspects run smoothly',
		];
		await expect(allMemberRoles).toHaveText(testDataRoles);

		const allMemberNames = ourDevOpsExpertsContainer.getByTestId(Container.MemberName);
		const testDataNames = [
			ExpertNames.OleksiiSvystun,
			ExpertNames.DmytroGamanenko,
			ExpertNames.KyryloMasiuk,
			ExpertNames.AndriiDumych,
			ExpertNames.SerhiiYevdokymenko,
			ExpertNames.DmytroPakki,
		];
		await expect(allMemberNames).toHaveText(testDataNames);

		await expect(ourDevOpsExpertsContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
			'Request a quote'
		);
	}
);

test(
	qase(
		4979,
		'Check section numbers and titles in "DevOps as a Service: Pipeline" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const devOpsAsAServiceContainer = driver.getByTestId(DevOpsAsAService.DevOpsAsAServicePipeline);

		await expect(devOpsAsAServiceContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
		]);

		const allSectionTitles = devOpsAsAServiceContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Introduction',
			'Discover & Consult',
			'Creating short, mid, long\nterm roadmaps',
			' Implementation\n& monitoring',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4991,
		'Check section titles in "Related Services" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(DevOpsAsAService.RelatedServices);

		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Custom Software\nDevelopment',
			'Cloud Services',
			'Big Data & Analytics',
			'Internet of Things',
			'QA as a Service',
			'Consulting Services',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4985,
		'Check section titles in "FAQ" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const faqContainer = driver.getByTestId(DevOpsAsAService.Faq);

		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What are DevOps services, and why are they important?',
			'What are the benefits of working with a DevOps service provider like Techstack?',
			'What is Azure DevOps, and how can Techstack help businesses with it?',
			'What is release management, and how can Techstack help businesses with it?',
			'What is infrastructure management, and how can Techstack help businesses with it?',
			'What is a managed service, and how can Techstack help businesses with it?',
			'What are some specific DevOps solutions & services that Techstack might offer?',
			'What is DevOps consulting, and how can Techstack help businesses with it?',
			'How can Techstack help businesses with custom software development?',
			'What are some other related services that Techstack offers?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
