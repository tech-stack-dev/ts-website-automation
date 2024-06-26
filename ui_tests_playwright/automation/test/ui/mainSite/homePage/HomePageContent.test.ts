import {expect, test} from '@playwright/test';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import HomePage from '../../../../identifiers/mainSite/pages/HomePage';
import UrlProvider from '../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import TechnologyStackData from '../../../../preconditionsData/technologyStack/TechnologyStackData';

// TSWEB actual tags
// not forget remove button in header!!!
// add @mobile @desktop tags
test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test('Check the Info container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const infoContainer = driver.getByTestId(HomePage.Info);
	await expect(infoContainer.getByTestId(Container.Title)).toHaveText(
		'Product Engineering & Custom Software Development Company'
	);
});

test('Check the container titles and numbers from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const containers = [
		driver.getByTestId(HomePage.WhatWeDo),
		driver.getByTestId(HomePage.IndustriesWeServe),
		driver.getByTestId(HomePage.SoftwareDevelopmentServices),
		driver.getByTestId(HomePage.PartnerTestimonials),
		driver.getByTestId(HomePage.CaseStudies),
		driver.getByTestId(HomePage.BriefOverviewOfTechnologies),
		driver.getByTestId(HomePage.WhyTechstackForSoftwareDevelopment),
		driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide),
		driver.getByTestId(HomePage.OurPartners),
		driver.getByTestId(HomePage.HowWeBuildCommunicationProcesses),
		driver.getByTestId(HomePage.TechstackAchievements),
		driver.getByTestId(HomePage.RecognitionAndMediaPresence),
		driver.getByTestId(HomePage.CompanyInsights),
		driver.getByTestId(HomePage.GetInTouch),
		driver.getByTestId(HomePage.Faq),
	];

	const expectedData = [
		['What we do', '01'],
		['Industries we serve', '02'],
		['Software Development Services', '03'],
		['Partner testimonials', '04'],
		['Case studies', '05'],
		['Brief Overview of Technologies', '06'],
		['Why Techstack for Software Development?', '07'],
		['Working with\nBusinesses Worldwide', '08'],
		['Our partners', '09'],
		['How We Build Communication Processes', '10'],
		['Techstack Achievements', '11'],
		['Recognition and Media Presence', '12'],
		['Company insights', '13'],
		['Get in Touch', '14'],
		['FAQ', '15'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check section numbers, titles, and CTA in "What We Do" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo);
	const allSectionitles = whatWeDoContainer.getByTestId(Container.SectionTitle);
	const testData = ['Product or solution development', 'Dedicated team', 'Team augmentation', 'Tech audit service'];

	await expect(whatWeDoContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);
	await expect(allSectionitles).toHaveText(testData);
	await expect(whatWeDoContainer.getByTestId(MainSiteButtons.RequestAConsultation)).toHaveText(
		'Request a consultation'
	);
});

test('Check section titles in "Industries we serve" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const industriesWeServe = driver.getByTestId(HomePage.IndustriesWeServe);
	const allBlockTitles = industriesWeServe.getByTestId(Container.BlockTitle);
	const testData = ['Renewable Energy', 'Transportation and Logistics', 'Healthcare'];

	await expect(allBlockTitles).toHaveText(testData);
});

test('Check section titles in "Software Development Services" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo); // Actual container !
	const allBlockTitles = whatWeDoContainer.getByTestId(Container.BlockTitle);
	const testData = [
		'Custom software development',
		'Digital transformation',
		'Cloud development',
		'DevOps services',
		'Mobile development',
		'Big data & analytics',
		'Internet of things',
		'AI development',
		'UI/UX design',
		'QA as a service',
		'Consulting service',
	];

	await expect(allBlockTitles).toHaveText(testData);
});

test('Check CTA text in "Case Studies" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const caseStudiesContainer = driver.getByTestId(HomePage.CaseStudies);
	// mb add for text in cards
	await expect(caseStudiesContainer.getByTestId(MainSiteButtons.ReadAllCases)).toHaveText('Read all cases');
});

test('Check navigation tabs and CTA text in "Brief Overview of Technologies" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const briefOverviewContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
	const testData = [
		'Back-End',
		'Front-End',
		'Mobile Development',
		'Cloud',
		'CI/CD and Automation',
		'Quality Assurance',
	];
	const technologyStackTabs = await TechnologyStackData.getTechnologyStackTabs(briefOverviewContainer, 'images');

	for (let i = 0; i < technologyStackTabs.length; i++) {
		await expect(technologyStackTabs[i]).toHaveText(testData[i]);
	}

	// await expect(briefOverviewContainer.getByTestId(MainSiteButtons.ViewFullTechnologyStack)).toHaveText(
	// 'View full technology stack'
	// );
});

test('Check section titles in "Why Techstack for Software Development?" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const WhyTechstackContainer = driver.getByTestId(HomePage.WhyTechstackForSoftwareDevelopment);
	const allSectionTitles = WhyTechstackContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Strategic solution development',
		'Flexible scale-up & seamless support',
		'All-in-one tech solution',
		'Product-centric engineering',
		'Solution-driven collaboration',
		'Risk mitigation',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check images in "Working with Businesses Worldwide" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
	const bigNumberImages = workingWithBusinessesContainer.getByTestId(MainSiteImages.BigNumber);

	await baseDriverSteps.checkImagesVisibility(bigNumberImages, 3);

	await expect(workingWithBusinessesContainer.getByTestId(MainSiteImages.CompleteMap)).toBeVisible();
});

test('Check partner logos in "Our partners" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const ourPartnersContainer = driver.getByTestId(HomePage.OurPartners);
	const partnerLogos = ourPartnersContainer.getByTestId(Container.PartnerLogo);

	await baseDriverSteps.checkImagesVisibility(partnerLogos, 10);
});

test('Check section numbers, titles, and CTA in "How We Build Communication Processes" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const howWeBuildCommunicationContainer = driver.getByTestId(HomePage.HowWeBuildCommunicationProcesses);
	const allSectionitles = howWeBuildCommunicationContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Agile methodology',
		'Account management',
		'B2-C1 English proficiency is held by 60% of engineers',
	];

	await expect(howWeBuildCommunicationContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);
	await expect(allSectionitles).toHaveText(testData);
	await expect(howWeBuildCommunicationContainer.getByTestId(MainSiteButtons.RequestAConsultation)).toHaveText(
		'Request a consultation'
	);
});

test('Check images in "Techstack Achievements" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const techstackAchievementsContainer = driver.getByTestId(HomePage.TechstackAchievements);
	const awardsImg = techstackAchievementsContainer.getByTestId(Container.AwardCard);
	// mb check each image
	await baseDriverSteps.checkImagesVisibility(awardsImg, 8);
});

test('Check card titles in "Recognition and Media Presence" container from the "Home" page @Regression @HomePage @TSWEB-1006', async () => {
	const recognitionAndMediaContainer = driver.getByTestId(HomePage.RecognitionAndMediaPresence);
	const allSectionitles = recognitionAndMediaContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Major Data Breaches, Ransomware Attacks and Cybersecurity Trends',
		'Detailed PMO Time Management Guide',
		'The Work You Defer Only Accumulates Tech Debt',
	];

	await expect(allSectionitles).toHaveText(testData);
});

test(
	qase(4985, 'Check section titles in "FAQ" container from the "Home" page @Regression @HomePage @TSWEB-1006'),
	async () => {
		const faqContainer = driver.getByTestId(HomePage.Faq);

		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'How to choose a custom software development company?',
			'How much does custom software development cost?',
			'How long does it take to build custom software?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
