import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Container from '../../../identifiers/Container';
import HomePage from '../../../identifiers/mainSite/pages/HomePage';
import {ClutchReviewLinks} from '../../../preconditionsData/links/ClutchReviewLinks';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import UrlPath from '../../../providers/UrlPath';
import MainSiteButtons from '../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../identifiers/mainSite/MainSiteImages';
import MainSiteLinks from '../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../preconditionsData/links/Links';
import BlogTagPath from '../../../providers/BlogTagPath';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, test, expect} from '../../../fixtures/DesktopMobileSetup';
import TechnologyStackData from '../../../preconditionsData/technologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test(
	qase(
		5620,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(HomePage.WhatWeDo).getByTestId(MainSiteButtons.RequestAQuote),
			driver.getByTestId(HomePage.HowWeBuildCommunicationProcesses).getByTestId(MainSiteButtons.GetAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, HomePage.GetInTouch);
		}
	}
);

test(
	qase(
		5011,
		'Check the "Enhance Healthcare Strategy: Free Cloud Guide" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const enhanceHealthcareContainer = driver.getByTestId(HomePage.EnhanceHealthcareStrategy);
		const ctaButton = enhanceHealthcareContainer.getByTestId(MainSiteButtons.FreeCloudGuide);

		await expect(ctaButton).toHaveText('Enhance Healthcare Strategy: Free Cloud Guide');

		await ctaButton.click();
		expect(driver.Page.url()).toBe(UrlProvider.urlBuilder(UrlPath.Whitepapers));
	}
);

test(
	qase(5018, 'Check the Info container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'),
	async () => {
		const infoContainer = driver.getByTestId(HomePage.Info);
		await expect(infoContainer.getByTestId(Container.Title)).toHaveText(
			'Product Engineering & Custom Software Development Company'
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
			driver.getByTestId(HomePage.IndustriesWeServe),
			driver.getByTestId(HomePage.SoftwareDevelopmentServices),
			driver.getByTestId(HomePage.CaseStudies),
			driver.getByTestId(HomePage.BriefOverviewOfTechnologies),
			driver.getByTestId(HomePage.WhyTechstack),
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
			['Industries We Serve', '03'],
			['Software Development Services', '04'],
			['Case Studies', '05'],
			['Brief Overview of Technologies', '06'],
			['Why Techstack for Software Development?', '07'],
			['Working with Businesses Worldwide', '08'],
			['Our partners', '09'],
			['How We Build Communication Processes', '10'],
			['Techstack Achievements', '11'],
			['Recognition and Media Presence', '12'],
			['Company insights', '13'],
			['Request a Free No-obligation Quote', '14'],
			['FAQ', '15'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5614,
		'Check section numbers and titles in "What We Do" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo);
		await expect(whatWeDoContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

		const allSectionTitles = whatWeDoContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Product or solution development',
			'Dedicated team',
			'Team augmentation',
			'Tech audit service',
		];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.skip(
	qase(
		5076,
		'Check redirect by "Clutch Review" buttons in "Partner Testimonials" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

		const clutchReviewButton = partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviews);
		await clutchReviewButton.click();
		expect(await clutchReviewButton.getAttribute('class')).toContain('active');

		const clutchButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

		const buttonMap = new Map([
			[clutchButtons[0], ClutchReviewLinks.DerickDaily],
			[clutchButtons[2], ClutchReviewLinks.MarkBeare],
		]);

		for (const [button, url] of buttonMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5043,
		'Check section titles in "Industries We Serve" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const industriesWeServe = driver.getByTestId(HomePage.IndustriesWeServe);
		const allBlockTitles = industriesWeServe.getByTestId(Container.BlockTitle);
		const testData = ['Renewable energy', 'Transportation and logistics', 'Healthcare'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5062,
		'Check redirects by blocks in "Industries We Serve" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const industriesServicesContainer = driver.getByTestId(HomePage.IndustriesWeServe);
		const containerSection = industriesServicesContainer.getByTestId(Container.ContainerBlock);
		const blockUrlMap = new Map([
			[
				containerSection.nth(0).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
			[
				containerSection.nth(1).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[containerSection.nth(2).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		]);

		for (const [block, url] of blockUrlMap) {
			await baseDriverSteps.checkRedirectToPage(block, url, UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5049,
		'Check section titles in "Software Development Services" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
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
		5130,
		'Check redirects by arrows in "Software Development Services" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const softwareDevelopmentServicesContainer = driver.getByTestId(HomePage.SoftwareDevelopmentServices);
		const arrows = softwareDevelopmentServicesContainer
			.getByTestId(Container.ContainerBlock)
			.getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.DigitalTransform)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.DevOpsServ)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(7), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(8), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[arrows.nth(9), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(10), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5615,
		'Check navigation bar, award cards and CTA button in "Brief Overview of Technologies" container from the "Home" page @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
		const navigationTabs = await TechnologyStackData.getTechnologyStackTabsForHomePage(
			briefOverviewOfTechnologiesContainer
		);
		const awardCardCountList = [8, 6, 6, 4, 8, 6];

		for (let index = 0; index < navigationTabs.length; index++) {
			navigationTabs[index].click();
			const awardCards = briefOverviewOfTechnologiesContainer
				.getByTestId(Container.AwardCard)
				.locator('visible=true');

			await baseDriverSteps.checkImagesVisibility(awardCards, awardCardCountList[index]);
		}

		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.ViewFullTechnologyStack)
		).toHaveText('View full technology stack');
	}
);

test(
	qase(
		5615,
		'Check navigation bar, award cards and CTA button in "Brief Overview of Technologies" container from the "Home" page @desktop @Regression @HomePage @TSWEB-1006'
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

		await expect(
			briefOverviewOfTechnologiesContainer.getByTestId(MainSiteButtons.ViewFullTechnologyStack)
		).toHaveText('View full technology stack');
	}
);

test(
	qase(
		5616,
		'Check redirect by CTA button in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver
			.getByTestId(HomePage.BriefOverviewOfTechnologies)
			.getByTestId(MainSiteButtons.ViewFullTechnologyStack);
		await baseDriverSteps.checkRedirectToPage(
			briefOverviewOfTechnologiesContainer,
			UrlProvider.urlBuilder(UrlPath.OurServicesTechnologyStackBlock),
			UrlProvider.webSiteUrl()
		);
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
			'Strategic solution development',
			'Flexible scale-up & seamless support',
			'All-in-one tech solution',
			'Product-centric engineering',
			'Solution-driven collaboration',
			'Risk mitigation',
		];

		await expect(actualSectionTitles).toHaveText(expectSectionTitles);
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
		5090,
		'Check redirect by link in "Working with Businesses Worldwide" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
		const clutchLink = workingWithBusinessesContainer.getByTestId(MainSiteLinks.Clutch).locator('visible=true');

		await baseDriverSteps.checkRedirectToClutch(clutchLink, Links.ClutchHighlights);
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
		'Check section numbers and titles in "How We Build Communication Processes" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
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
		5095,
		'Check "See All News" button from the "Company insights" container on the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const companyInsightsContainer = driver.getByTestId(HomePage.CompanyInsights);
		const seeAllNewsButton = companyInsightsContainer.getByTestId(MainSiteButtons.SeeAllNews);

		await expect(seeAllNewsButton).toHaveText('See All News');
		await seeAllNewsButton.click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(BlogTagPath.TechstackNews));
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
