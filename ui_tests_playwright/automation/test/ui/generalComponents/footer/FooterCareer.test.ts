import {Locator} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Buttons from '../../../../identifiers/Buttons';
import Links from '../../../../preconditionsData/links/Links';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, expect, test} from '../../../../fixtures/DesktopMobileSetup';
import {playwrightUtils} from '../../../../utils/PlaywrightUtils';

let footer: Locator;
let socialBlock: Locator;
const testDataProvider = [
	UrlProvider.careerUrl(),
	UrlProvider.careerUrlBuilder(UrlPath.AboutUs),
	UrlProvider.careerUrlBuilder(UrlPath.Reviews),
	UrlProvider.careerUrlBuilder(UrlPath.ContactUs),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	footer = driver.getByTestId(Footer.Container_Footer);
	socialBlock = await containerSteps.getDynamicLocator({
		desktopLocator: Footer.FooterLinkDesktop,
		mobileLocator: Footer.FooterLinkMobile,
	});
});

test(
	qase(
		5493,
		`Check the footer information from the 'Footer' container on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
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
				[Buttons.Company.CaseStudies, 'Case Studies'],
				[Buttons.Company.Blog, 'Blog'],
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

			await expect(footer.getByTestId(Footer.Info).nth(0)).toHaveText(
				`© ${year} Techstack. All rights reserved.`
			);

			await expect(driver.getByTestId(Footer.TermsOfUse)).toHaveText('Terms of use');
			await expect(driver.getByTestId(Footer.CookiesPolicy)).toHaveText('Cookies Policy');
		}
	}
);

test(
	qase(
		5494,
		`Check the redirection by the "Techstack" logo on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await footer.getByTestId(Buttons.Logo).click();
			await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
		}
	}
);

test(
	qase(
		5497,
		`Check the redirection for the Company block on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
		const companyUrlList = new Map([
			[Buttons.Company_TechstackWorldwide, UrlProvider.webSiteUrl()],
			[Buttons.Company_Services, UrlProvider.urlBuilder(UrlPath.OurServices)],
			[Buttons.Company.CaseStudies, UrlProvider.urlBuilder(UrlPath.CaseStudies)],
			[Buttons.Company.Blog, UrlProvider.urlBuilder(UrlPath.Blog)],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyUrlList) {
				await footer.getByTestId(element).click();
				await baseDriverSteps.checkUrl(companyUrl);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5496,
		`Check the redirection for the Career block on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
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
	}
);

test(
	qase(
		5498,
		`Check the redirection for the social links on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
		const linkMap = new Map([
			[Buttons.Behance, Links.Behance],
			[Buttons.LinkedIn, Links.LinkedIn],
			[Buttons.Facebook, Links.Facebook],
			//[Buttons.Instagram, Links.Instagram], // because it returns 429 status code
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			for (const entries of linkMap.entries()) {
				await playwrightUtils.expectWithRetries(
					async () => {
						const socialLinkButton = socialBlock.getByTestId(entries[0]);

						const [newPage] = await Promise.all([
							driver.DriverContext.waitForEvent('page'),
							socialLinkButton.click(),
						]);
						expect(newPage.url()).toContain(entries[1]);
						await newPage.close();
					},
					5,
					5000
				);
			}
		}

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			await playwrightUtils.expectWithRetries(
				async () => {
					const clutchButton = socialBlock.getByTestId(Buttons.Clutch).last();
					const [newPage] = await Promise.all([
						driver.DriverContext.waitForEvent('page'),
						clutchButton.click(),
					]);

					expect(newPage.url()).toContain(Links.Clutch);
					await newPage.close();
				},
				5,
				5000
			);
		}
	}
);

test(
	qase(
		5495,
		`Check redirection to the Terms and Cookies Policy pages on all pages @desktop @mobile @Regression @FooterCareer @TSWEB-655`
	),
	async () => {
		const linkMap = new Map([
			[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
			[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const entries of linkMap.entries()) {
				await socialBlock.getByTestId(entries[0]).click();
				await baseDriverSteps.checkUrl(entries[1]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
