import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Buttons from '../../../../identifiers/Buttons';
import Links from '../../../../preconditionsData/links/Links';

let footer: Locator;
const testDataProvider = [
	UrlProvider.careerUrl(),
	UrlProvider.careerUrlBuilder(UrlPath.AboutUs),
	UrlProvider.careerUrlBuilder(UrlPath.Reviews),
	UrlProvider.careerUrlBuilder(UrlPath.ContactUs),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	footer = driver.getByTestId(Footer.Container_Footer);
});

test(`Check the footer information from the 'Footer' container on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);
		const companyBlock = footer.getByTestId(Footer.CompanyBlock);
		const careerBlock = footer.getByTestId(Footer.CareerBlock);
		const year = new Date().getFullYear();

		await expect(footer.getByTestId(Buttons.Logo)).toBeVisible();
		await expect(companyBlock).toHaveText('Company');
		const companyList = new Map([
			[Buttons.Company_TechstackWorldwide, 'Techstack Worldwide'],
			[Buttons.Company_Services, 'Services'],
			[Buttons.Company_CaseStudies, 'Case Studies'],
			[Buttons.Company_Blog, 'Blog'],
		]);

		for (const [element, title] of companyList) {
			await expect(footer.getByTestId(element)).toHaveText(title);
		}

		await expect(careerBlock).toHaveText('Career');
		const careerList = new Map([
			[Buttons.Career_Jobs, 'Jobs'],
			[Buttons.Career_AboutUs, 'About us'],
			[Buttons.Career_Reviews, 'Reviews'],
			[Buttons.Career_ContactUs, 'Contact us'],
		]);

		for (const [element, title] of careerList) {
			await expect(footer.getByTestId(element)).toHaveText(title);
		}

		await expect(footer.getByTestId(Footer.Info).nth(0)).toHaveText(`© ${year} Techstack. All rights reserved.`);

		await expect(driver.getByTestId(Footer.TermsOfUse)).toHaveText('Terms of use');
		await expect(driver.getByTestId(Footer.CookiesPolicy)).toHaveText('Cookies Policy');
	}
});

test(`Check the redirection by the "Techstack" logo on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);
		await footer.getByTestId(Buttons.Logo).click();
		await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
	}
});

test(`Check the redirection for the Company block on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	const companyUrlList = new Map([
		[Buttons.Company_TechstackWorldwide, UrlProvider.webSiteUrl()],
		[Buttons.Company_Services, UrlProvider.urlBuilder(UrlPath.OurServices)],
		[Buttons.Company_CaseStudies, UrlProvider.urlBuilder(UrlPath.CaseStudies)],
		[Buttons.Company_Blog, UrlProvider.urlBuilder(UrlPath.Blog)],
	]);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		for (const [element, companyUrl] of companyUrlList) {
			await footer.getByTestId(element).click();
			await baseDriverSteps.checkUrl(companyUrl);
			await baseDriverSteps.goToUrl(url);
		}
	}
});

test(`Check the redirection for the Career block on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	const careerUrlList = new Map([
		[Buttons.Career_Jobs, UrlProvider.careerUrl()],
		[Buttons.Career_AboutUs, UrlProvider.careerUrlBuilder(UrlPath.AboutUs)],
		[Buttons.Career_Reviews, UrlProvider.careerUrlBuilder(UrlPath.Reviews)],
		[Buttons.Career_ContactUs, UrlProvider.careerUrlBuilder(UrlPath.ContactUs)],
	]);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		for (const [element, careerUrl] of careerUrlList) {
			await footer.getByTestId(element).click();
			await baseDriverSteps.checkUrl(careerUrl);
			await baseDriverSteps.goToUrl(url);
		}
	}
});

test(`Check the redirection for the social links on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	const linkMap = new Map([
		[Buttons.Behance, Links.Behance],
		[Buttons.LinkedIn, Links.LinkedIn],
		[Buttons.Facebook, Links.Facebook],
		[Buttons.Instagram, Links.Instagram],
	]);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		for (const entries of linkMap.entries()) {
			const [newPage] = await Promise.all([
				driver.DriverContext.waitForEvent('page'),
				await footer.getByTestId(entries[0]).nth(0).click(),
			]);
			expect(newPage.url().includes(entries[1])).toBeTruthy();
			await newPage.close();
		}

		const [newPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await footer.getByTestId(Buttons.Clutch).nth(1).click(),
		]);
		expect(newPage.url()).toContain(Links.Clutch);
		await newPage.close();
	}
});

test(`Check redirection to the Terms and Cookies Policy pages on all pages @Regression @FooterCareer @TSWEB-655`, async () => {
	const linkMap = new Map([
		[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
		[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
	]);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		for (const entries of linkMap.entries()) {
			await driver.getByTestId(entries[0]).click();
			await baseDriverSteps.checkUrl(entries[1]);
			await baseDriverSteps.goToUrl(url);
		}
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
