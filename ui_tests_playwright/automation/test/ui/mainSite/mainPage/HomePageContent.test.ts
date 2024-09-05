import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import HomePage from '../../../../identifiers/mainSite/pages/HomePage';
import UrlProvider from '../../../../providers/UrlProvider';
import {driver} from '../../../../base/driver/Driver';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, test, expect} from '../../../../fixtures/DesktopMobileSetup';
import CaseStudies from '../../../../identifiers/mainSite/CaseStudies';
import TechnologyStackData from '../../../../preconditionsData/technologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test(
	qase(
		5018, 
		'Check the Info container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const infoContainer = driver.getByTestId(HomePage.Info);
		await expect(infoContainer.getByTestId(Container.Title)).toHaveText(
			'Tech Solutions Partner: Staffing, Engineering & Optimization'
		);
	}
);

test(
	qase(
		5034,
		'Check the container titles and numbers from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const containers = [
			driver.getByTestId(HomePage.WhatWeDo),
			driver.getByTestId(HomePage.PartnerTestimonials),
			driver.getByTestId(HomePage.WhyTechstack),
			driver.getByTestId(HomePage.SoftwareDevelopmentServices),
			driver.getByTestId(HomePage.CaseStudies),
			driver.getByTestId(HomePage.BriefOverviewOfTechnologies),
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
			['What We Do', '01'],
			['Partner Testimonials', '02'],
			['Why Techstack for Software Development?', '03'],
			['Our Expertise in Development', '04'],
			['Case Studies', '05'],
			['Brief Overview of Technologies', '06'],
			['Working with Businesses Worldwide', '07'],
			['Our partners', '08'],
			['How We Build Communication Processes', '09'],
			['Techstack Achievements', '10'],
			['Recognition and Media Presence', '11'],
			['Company insights', '12'],
			['Request a Free No-obligation Quote', '13'],
			['FAQ', '14'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5614,
		'Check section numbers, titles and CTA button in "What We Do" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo);
		await expect(whatWeDoContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03']);

		const allSectionTitles = whatWeDoContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Staffing services',
			'Engineering services',
			'Optimization services',
		];
		await expect(allSectionTitles).toHaveText(testData);
		await expect(whatWeDoContainer.getByTestId(MainSiteButtons.ViewFullServiceList)).toHaveText('View full service list');
	}
);

test(
	qase(
		5617,
		'Check section titles in "Why Techstack for Software Development?" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const whyTechstackContainer = driver.getByTestId(HomePage.WhyTechstack);
		const actualSectionTitles = whyTechstackContainer.getByTestId(Container.SectionTitle);
		const expectSectionTitles = [
			'From one expert to teams integration',
			'Full circle development',
			'Not just code—engineer solutions',
			'Proactive problem-solving',
			'Ensure your project independence',
			'Daily communication overlap',
		];

		await expect(actualSectionTitles).toHaveText(expectSectionTitles);
	}
);

test(
	qase(
		5049,
		'Check section titles in "Our Expertise in Development" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const softwareDevelopmentServices = driver.getByTestId(HomePage.SoftwareDevelopmentServices);
		const allBlockTitles = softwareDevelopmentServices.getByTestId(Container.BlockTitle);
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
	}
);

test(
	qase(
		5622,
		'Check CTA button in "Case Studies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const caseStudiesContainer = driver.getByTestId(HomePage.CaseStudies);
		await expect(caseStudiesContainer.getByTestId(MainSiteButtons.ReadAllCases)).toHaveText('Read all cases');
	}
);

test(
	qase(
		5627,
		'Check the text of Technology Stack tabs in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
		await expect(briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_BackEnd)).toHaveText(
			'Back-End'
		);
		await expect(briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_FrontEnd)).toHaveText(
			'Front-End'
		);
		await expect(briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_Mobile)).toHaveText(
			'Mobile Development'
		);
		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_DevopsCloud)
		).toHaveText('Cloud');
		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_CICDAndAutomation)
		).toHaveText('CI/CD and Automation');
		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.Technology_QualityAssurance)
		).toHaveText('Quality Assurance');
	}
);

test(
	qase(
		5615,
		'Check navigation bar and award cards in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
		const navigationTabs = await TechnologyStackData.getTechnologyStackTabsForHomePage(
			briefOverviewOfTechnologiesContainer
		);
		const awardCardCountList = [8, 5, 5, 4, 8, 5];

		for (let index = 0; index < navigationTabs.length; index++) {
			navigationTabs[index].click();
			const awardCards = briefOverviewOfTechnologiesContainer
				.getByTestId(Container.AwardCard)
				.locator('visible=true');

			await baseDriverSteps.checkImagesVisibility(awardCards, awardCardCountList[index]);
		}
	}
);

test(
	qase(
		5615,
		'Check CTA button in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.ViewFullTechnologyStack)
		).toHaveText('View full technology stack');
	}
);

test(
	qase(
		5069,
		'Check images in "Working with Businesses Worldwide" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
		const bigNumberImages = workingWithBusinessesContainer
			.getByTestId(MainSiteImages.BigNumber)
			.locator('visible=true');

		await baseDriverSteps.checkImagesVisibility(bigNumberImages, 3);

		const mobileMaps = [MainSiteImages.NorthAmericaMap, MainSiteImages.EuropeMap, MainSiteImages.AustraliaMap];
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
		5084,
		'Check partner logos in "Our partners" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const ourPartnersContainer = driver.getByTestId(HomePage.OurPartners);
		const partnerLogos = ourPartnersContainer.getByTestId(Container.PartnerLogo);

		await baseDriverSteps.checkImagesVisibility(partnerLogos, 10);
	}
);

test(
	qase(
		5618,
		'Check section numbers, titles and CTA button in "How We Build Communication Processes" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const howWeBuildCommunicationProcessesContainer = driver.getByTestId(HomePage.HowWeBuildCommunicationProcesses);
		await expect(howWeBuildCommunicationProcessesContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
		]);

		const allSectionTitles = howWeBuildCommunicationProcessesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Agile methodology',
			'Account management',
			'B2-C1 English proficiency is held by 60% of engineers',
		];
		await expect(allSectionTitles).toHaveText(testData);
		await expect(howWeBuildCommunicationProcessesContainer.getByTestId(MainSiteButtons.GetAQuote)).toHaveText(
			'Get a quote'
		);
	}
);

test(
	qase(
		5619,
		'Check award cards in "Techstack Achievements" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(HomePage.TechstackAchievements);
		const awardCards = ourApproachContainer.getByTestId(Container.AwardCard);
		await baseDriverSteps.checkImagesVisibility(awardCards, 10);
	}
);

test(
	qase(
		5623,
		'Check titles, case cards in "Recognition and Media Presence" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const recognitionAndMediaPresenceContainer = driver.getByTestId(HomePage.RecognitionAndMediaPresence);
		const caseCards = recognitionAndMediaPresenceContainer.getByTestId(CaseStudies.CaseCard);
		await baseDriverSteps.checkImagesVisibility(caseCards, 3);

		const caseNameOfCards = recognitionAndMediaPresenceContainer.getByTestId(CaseStudies.CaseName);
		const expectCaseNameOfCards = [
			'Major Data Breaches, Ransomware Attacks and Cybersecurity Trends',
			'Detailed PMO Time Management Guide',
			'The Work You Defer Only Accumulates Tech Debt',
		];

		await expect(caseNameOfCards).toHaveText(expectCaseNameOfCards);
	}
);

test(
	qase(
		5095,
		'Check CTA button from the "Company insights" container on the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const companyInsightsContainer = driver.getByTestId(HomePage.CompanyInsights);
		const seeAllNewsButton = companyInsightsContainer.getByTestId(MainSiteButtons.SeeAllNews);

		await expect(seeAllNewsButton).toHaveText('See All News');
	}
);

test(
	qase(
		5621,
		'Check section titles in "FAQ" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
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
