import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {driver} from '../../../../base/driver/Driver';
import Pricing from '../../../../identifiers/mainSite/pages/Pricing';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import Buttons from '../../../../identifiers/Buttons';
import {ClutchReviewIds} from '../../../../preconditionsData/links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/links/ExpertsLinkedInLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Pricing));
});

test('Check navigation to "Get in Touch" container after clicking CTA button from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const ctaButtons = [
		driver.getByTestId(Pricing.CustomOffer).getByTestId(MainSiteButtons.GetYourCustomQuote),
		driver.getByTestId(Pricing.SimplifiedPaymentProcess).getByTestId(MainSiteButtons.GetYourFreeQuote),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, Pricing.GetInTouch);
	}
});

test('Check redirect by LinkedIn button in the Quote container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const linkedInButton = driver.getByTestId(Pricing.Believe).getByTestId(MainSiteButtons.LinkedInReviewArrow);

	await baseDriverSteps.checkRedirectToPage(linkedInButton, ExpertsLinkedInLinks.MaxLevytskyi);
});

test('Check redirects by "Clutch Review" buttons in "What Our Clients Say About Us" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const reviewsContainer = driver.getByTestId(Pricing.WhatClientsSay);
	const clutchReviewButtons = reviewsContainer.getByTestId(Buttons.Clutch);

	const clutchButtonUrlMap = new Map([
		[clutchReviewButtons.nth(0), ClutchReviewIds.AnonymousVehicle],
		[clutchReviewButtons.nth(1), ClutchReviewIds.HenriYoki],
	]);

	for (const [button, url] of clutchButtonUrlMap) {
		await baseDriverSteps.checkRedirectToClutch(button, url);
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const faqContainer = driver.getByTestId(Pricing.Faq);
	const expectedNumberOfSections = 6;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
