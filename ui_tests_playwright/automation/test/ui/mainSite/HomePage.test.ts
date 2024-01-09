import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Container from '../../../identifiers/Container';
import HomePage from '../../../identifiers/mainSite/pages/HomePage';
import {ClutchReviewLinks} from '../../../preconditionsData/links/ClutchReviewLinks';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import UrlPath from '../../../providers/UrlPath';
import MainSiteButtons from '../../../identifiers/mainSite/MainSiteButtons';
import {LinkedInReviewLinks} from '../../../preconditionsData/links/LinkedInReviewLinks';
import MainSiteImages from '../../../identifiers/mainSite/MainSiteImages';
import MainSiteLinks from '../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../preconditionsData/links/Links';
import BlogTagPath from '../../../providers/BlogTagPath';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test(
	qase(
		5011,
		'Check the "Enhance Healthcare Strategy: Free Cloud Guide" container from the "Home" page @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const enhanceHealthcareContainer = driver.getByTestId(HomePage.EnhanceHealthcareStrategy);
		const ctaButton = enhanceHealthcareContainer.getByTestId(MainSiteButtons.FreeCloudGuide);

		await expect(ctaButton).toHaveText('Enhance Healthcare Strategy: Free Cloud Guide');

		await ctaButton.click();
		expect(driver.Page.url()).toBe(UrlProvider.urlBuilder(UrlPath.Whitepapers));
	}
);

test(qase(5018, 'Check the Info container from the "Home" page @Regression @HomePage @TSWEB-1006'), async () => {
	const infoContainer = driver.getByTestId(HomePage.Info);
	await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Make\nan impact');
});

test(
	qase(5034, 'Check the container titles and numbers from the "Home" page @Regression @HomePage @TSWEB-1006'),
	async () => {
		const containers = [
			driver.getByTestId(HomePage.IndustriesWeServe),
			driver.getByTestId(HomePage.WhatWeDo),
			driver.getByTestId(HomePage.PartnerTestimonials),
			driver.getByTestId(HomePage.CaseStudies),
			driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide),
			driver.getByTestId(HomePage.OurPartners),
			driver.getByTestId(HomePage.CompanyInsights),
			driver.getByTestId(HomePage.GetInTouch),
		];

		const expectedData = [
			['Industries we serve', '01'],
			['What we do', '02'],
			['Partner testimonials', '03'],
			['Case studies', '04'],
			['Working with\nBusinesses Worldwide', '05'],
			['Our partners', '06'],
			['Company insights', '07'],
			['Get in Touch', '08'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5043,
		'Check section titles in "Industries we serve" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const industriesWeServe = driver.getByTestId(HomePage.IndustriesWeServe);
		const allBlockTitles = industriesWeServe.getByTestId(Container.BlockTitle);
		const testData = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5062,
		'Check redirects by blocks in "Industries we serve" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const industriesServicesContainer = driver.getByTestId(HomePage.IndustriesWeServe);
		const containerSection = industriesServicesContainer.getByTestId(Container.ContainerBlock);
		const blockUrlMap = new Map([
			[containerSection.nth(0).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.Healthcare)],
			[
				containerSection.nth(1).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				containerSection.nth(2).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
		]);

		for (const [block, url] of blockUrlMap) {
			await baseDriverSteps.checkRedirectToPage(block, url, UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(5049, 'Check section titles in "What we do" container from the "Home" page @Regression @HomePage @TSWEB-1006'),
	async () => {
		const whatWeDo = driver.getByTestId(HomePage.WhatWeDo);
		const allBlockTitles = whatWeDo.getByTestId(Container.BlockTitle);
		const testData = [
			'Custom Software Development',
			'Digital\nTransformation',
			'Cloud\nDevelopment',
			'Mobile Development',
			'Big Data & Analytics',
			'Internet of Things',
			'DevOps\nServices',
			'AI Development',
			'UI/UX Design',
			'QA as a Service',
			'Consulting Service',
		];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5130,
		'Check redirects by arrows in "What we do" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo);
		const arrows = whatWeDoContainer.getByTestId(Container.ContainerBlock).getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.DigitalTransform)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.DevOpsServ)],
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
		5055,
		'Check redirect by "LinkedIn Review" buttons in "Partner testimonials" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

		const linkedInButtons = await partnerTestimonialsContainer
			.getByTestId(MainSiteButtons.LinkedInReviewArrow)
			.all();

		const linkedInReviewsTab = partnerTestimonialsContainer.getByTestId(MainSiteButtons.LinkedInReviews);
		expect(await linkedInReviewsTab.getAttribute('class')).toContain('active');

		const buttonMap = new Map([
			[linkedInButtons[0], LinkedInReviewLinks.GrahamBrown],
			[linkedInButtons[1], LinkedInReviewLinks.MackenzieDaisley],
		]);

		for (const [button, url] of buttonMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5076,
		'Check redirect by "Clutch Review" buttons in "Partner testimonials" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

		const clutchReviewButton = partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviews);
		await clutchReviewButton.click();
		expect(await clutchReviewButton.getAttribute('class')).toContain('active');

		const clutchButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

		const buttonMap = new Map([
			[clutchButtons[0], ClutchReviewLinks.MarkBeare],
			[clutchButtons[1], ClutchReviewLinks.DerickDaily],
			[clutchButtons[2], ClutchReviewLinks.DarrenCody],
			[clutchButtons[3], ClutchReviewLinks.AnonymousMedicalDevice],
			[clutchButtons[4], ClutchReviewLinks.AnonymousPeerToPeer],
		]);

		for (const [button, url] of buttonMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5069,
		'Check images in "Working with Businesses Worldwide" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
		const bigNumberImages = workingWithBusinessesContainer.getByTestId(MainSiteImages.BigNumber);

		await baseDriverSteps.checkImagesVisibility(bigNumberImages, 3);

		await expect(workingWithBusinessesContainer.getByTestId(MainSiteImages.CompleteMap)).toBeVisible();
	}
);

test(
	qase(
		5090,
		'Check redirect by link in "Working with Businesses Worldwide" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
		const clutchLink = workingWithBusinessesContainer.getByTestId(MainSiteLinks.Clutch);

		await baseDriverSteps.checkRedirectToPage(clutchLink, Links.ClutchHighlights);
	}
);

test(
	qase(
		5084,
		'Check partner logos in "Our partners" container from the "Home" page @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const ourPartnersContainer = driver.getByTestId(HomePage.OurPartners);
		const partnerLogos = ourPartnersContainer.getByTestId(Container.PartnerLogo);

		await baseDriverSteps.checkImagesVisibility(partnerLogos, 10);
	}
);

test(
	qase(
		5095,
		'Check "See All News" button from the "Company insights" container on the "Home" page @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const companyInsightsContainer = driver.getByTestId(HomePage.CompanyInsights);
		const seeAllNewsButton = companyInsightsContainer.getByTestId(MainSiteButtons.SeeAllNews);

		await expect(seeAllNewsButton).toHaveText('See All News');
		await seeAllNewsButton.click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(BlogTagPath.TechstackNews));
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
