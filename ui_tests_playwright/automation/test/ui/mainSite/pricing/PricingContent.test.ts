import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {driver} from '../../../../base/driver/Driver';
import Container from '../../../../identifiers/Container';
import Pricing from '../../../../identifiers/mainSite/pages/Pricing';
import PricingData from '../../../../preconditionsData/PricingData';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Pricing));
});

test('Check the Info container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const info = driver.getByTestId(Pricing.Info);
	const infoTitle = info.getByTestId(Container.Title);
	const infoBlockTitles = await info.getByTestId(Container.BlockTitle).allInnerTexts();
	const infoBlockTitlesTrimmed = infoBlockTitles.map((title) => title.trim());

	const expectedBlockTitles = ['10\n+', '12\n+', '5.0', '91\n%'];

	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nPricing Model');
	await expect(infoTitle).toHaveText('Our Software Development Pricing Model');
	expect(infoBlockTitlesTrimmed).toStrictEqual(expectedBlockTitles);
});

test('Check the container titles and numbers from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const containers = [
		driver.getByTestId(Pricing.SimplifiedPaymentProcess),
		driver.getByTestId(Pricing.PricingInfluences),
		driver.getByTestId(Pricing.CustomOffer),
		driver.getByTestId(Pricing.WhyPartnerWithUs),
		driver.getByTestId(Pricing.WhatClientsSay),
		driver.getByTestId(Pricing.GetInTouch),
		driver.getByTestId(Pricing.Faq),
	];

	const expectedData = [
		['Simplified Payment Process for Your Software Development Needs', '01'],
		['What Influences The Cost of Software Development', '02'],
		['From Consultation To Custom Offer', '03'],
		['Why Partner with Us', '04'],
		['What Our Clients Say About Us', '05'],
		['Request a Free No-obligation Quote', '06'],
		['FAQ', '07'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test('Check section titles, navigation bar and CTA button text in "From Consultation To Custom Offer" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const customOfferContainer = driver.getByTestId(Pricing.CustomOffer);

	const navigationTabs = await PricingData.getPricingTabs(customOfferContainer);
	const containerBlocks = customOfferContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = await PricingData.getAllCustomOfferTabsData();

	const ctaButton = customOfferContainer.getByTestId(MainSiteButtons.GetYourCustomQuote);

	await baseDriverSteps.checkTabsAndSectionTitles(navigationTabs, containerBlocks, testDataSectionTitles);
	await expect(ctaButton).toHaveText('Get your custom quote');
});

test('Check section quote on the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const quoteContainer = driver.getByTestId(Pricing.Believe);
	const quote = quoteContainer.getByTestId(Container.ContainerContent);
	const expectedQuote =
		'At Techstack, we believe that the foundation of a successful partnership in software development lies in transparency, collaboration, and a firm commitment to meeting all your product objectives.';

	await expect(quote).toHaveText(expectedQuote);
});

test('Check section titles and navigation bar in "What Influences The Cost of Software Development" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const pricingInfluencesContainer = driver.getByTestId(Pricing.PricingInfluences);

	const navigationTabs = await PricingData.getPricingTabs(pricingInfluencesContainer);
	const containerBlocks = pricingInfluencesContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = await PricingData.getAllCostTabsData();

	await baseDriverSteps.checkTabsAndSectionTitles(navigationTabs, containerBlocks, testDataSectionTitles);
});

test('Check section titles and CTA button text in "Simplified Payment Process for Your Software Development Needs" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const simplifiedPaymentContainer = driver.getByTestId(Pricing.SimplifiedPaymentProcess);
	const simplifiedSectionTitles = simplifiedPaymentContainer.getByTestId(Container.SectionTitle);
	const expectedTitles = ['Time & Material', 'Monthly Invoices', 'Multi-Currency Payments', 'Payment Flexibility'];
	const ctaButton = simplifiedPaymentContainer.getByTestId(MainSiteButtons.GetYourFreeQuote);

	await expect(simplifiedSectionTitles).toHaveText(expectedTitles);
	await expect(ctaButton).toHaveText('Get your free quote');
});

test('Check section titles and numbers in "Why Partner with Us" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const whyPartnerWithUsContainer = driver.getByTestId(Pricing.WhyPartnerWithUs);
	const sections = whyPartnerWithUsContainer.getByTestId(Container.ContainerSection);

	const numOfSections = 4;
	await expect(sections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Experienced project managers', '01'],
		['Middle and senior experts', '02'],
		['Product-first approach', '03'],
		['Expert technical support', '04'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = sections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}
});

test('Check section titles in "FAQ" container from the "Pricing" page @desktop @mobile @Regression @Pricing @TSWEB-1297', async () => {
	const faqContainer = driver.getByTestId(Pricing.Faq);

	const sections = faqContainer.getByTestId(Container.ContainerSection);
	const numOfSections = 6;

	await expect(sections).toHaveCount(numOfSections);

	const expectedText = [
		'How much does software development cost?',
		'How is the cost of software development calculated?',
		'What are the hourly software development rates?',
		'What are the software development cost factors?',
		'How to reduce software development cost?',
		'What affects the software development costs?',
	];

	for (let i = 0; i < numOfSections; i++) {
		await expect(sections.nth(i).getByTestId(Container.SectionTitle)).toHaveText(expectedText[i]);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
