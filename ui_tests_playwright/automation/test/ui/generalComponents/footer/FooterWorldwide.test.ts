import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Container from '../../../../identifiers/Container';
import Buttons from '../../../../identifiers/Buttons';
import {companyUrl, serviceUrl, industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import Links from '../../../../preconditionsData/links/Links';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {Environment} from '../../../../providers/EnvProvider';
import UrlUtils from '../../../../utils/UrlUtils';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';

let footer: Locator;
let industriesButtons: object;
let servicesButtons: object;
let companyButtons: object;
let industriesUrls: string[];
let servicesUrls: string[];
let companyUrls: string[];

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlUtils.getRandomUrlFromRecord(industryUrl),
	UrlUtils.getRandomUrlFromRecord(serviceUrl),
	UrlProvider.urlBuilder(UrlPath.AboutUs),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
	footer = driver.getByTestId(Footer.Container_Footer);

	industriesButtons = Buttons.Industries;
	servicesButtons = Buttons.Services;
	companyButtons = Buttons.Company;

	industriesUrls = Object.values(industryUrl);
	servicesUrls = Object.values(serviceUrl);
	companyUrls = Object.values(companyUrl);
});

test(
	qase(
		5485,
		`Check the footer information from the "Footer" container on all pages @desktop @mobile @Regression @Footer @TSWEB-655 @TSWEB-674`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const contactBlock = footer.getByTestId(Footer.ContactsBlock);
			const industriesBlock = footer.getByTestId(Footer.IndustriesBlock);
			const servicesBlock = footer.getByTestId(Footer.ServicesBlock);
			const companyBlock = footer.getByTestId(Footer.CompanyBlock);
			const year = new Date().getFullYear();

			await expect(footer.getByTestId(Buttons.Logo)).toBeVisible();
			await expect(contactBlock.getByTestId(Container.SectionTitle)).toHaveText('Contacts');

			if (url === UrlProvider.urlBuilder(UrlPath.CaseStudies)) {
				await expect(contactBlock.getByTestId(Footer.Headquarters)).toHaveText(
					'Headquarters:Poland, Wroclaw,\n9 Rybacka street, 53-656'
				);
				await expect(contactBlock.getByTestId(Footer.Phone)).toHaveText('Phone number:+1-312-442-0823');
			} else {
				await expect(contactBlock.getByTestId(Footer.Headquarters)).toHaveText(
					'Headquarters:\nPoland, Wroclaw,\n9 Rybacka street, 53-656'
				);
				await expect(contactBlock.getByTestId(Footer.Phone)).toHaveText('Phone number:\n+1-312-442-0823');
				await expect(contactBlock.getByTestId(Footer.ContactUs)).toHaveText('Contact Us');
			}

			await expect(footer.getByTestId(Footer.Info)).toHaveText(`© ${year} Techstack. All rights reserved.`);

			await expect(industriesBlock.getByTestId(Container.BlockTitle)).toHaveText('Industries');
			const industriesText = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

			for (let index = 0; index < industriesUrls.length; index++) {
				const button = footer.getByTestId(Object.values(industriesButtons)[index]);
				await expect(button).toHaveText(industriesText[index]);
			}

			await expect(servicesBlock.getByTestId(Container.BlockTitle)).toHaveText('Services');
			const servicesText = [
				'Our Services',
				'Custom Software Development',
				'Digital Transformation',
				'Cloud Development',
				'Mobile Development',
				'Front-End Development',
				'Back-End Development',
				'Big Data & Analytics',
				'Internet of Things',
				'DevOps as a Service',
				'AI Development',
				'UX / UI Design',
				'QA as a Service',
				'Consulting Services',
			];

			for (let index = 0; index < servicesUrls.length; index++) {
				const button = footer.getByTestId(Object.values(servicesButtons)[index]);
				await expect(button).toHaveText(servicesText[index]);
			}

			await expect(companyBlock.getByTestId(Container.BlockTitle)).toHaveText('Company');
			const companyText = ['About Us', 'How we work', 'Pricing', 'Career', 'Case Studies', 'Blog', 'Whitepapers'];

			for (let index = 0; index < companyUrls.length; index++) {
				const button = footer.getByTestId(Object.values(companyButtons)[index]);
				await expect(button).toHaveText(companyText[index]);
			}

			await expect(footer.getByTestId(Footer.TermsOfUse)).toHaveText('Terms of use');
			await expect(footer.getByTestId(Footer.CookiesPolicy)).toHaveText('Cookies Policy');
			await expect(footer.getByTestId(Footer.Sitemap)).toHaveText('Sitemap');
		}
	}
);

test(
	qase(
		5487,
		`Check the redirection by the "Techstack" logo on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await footer.getByTestId(Buttons.Logo).click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5488,
		`Check the redirection for the Industries block on all pages @desktop @mobile @Regression @Footer @TSWEB-833`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < industriesUrls.length; index++) {
				await footer.getByTestId(Object.values(industriesButtons)[index]).click();
				await baseDriverSteps.checkUrl(industriesUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5492,
		`Check the redirection for the Services block on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < servicesUrls.length; index++) {
				await footer.getByTestId(Object.values(servicesButtons)[index]).click();
				await baseDriverSteps.checkUrl(servicesUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5491,
		`Check the redirection for the Company block on all pages @desktop @mobile @Regression @Footer @TSWEB-655 @TSWEB-674`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			companyUrl[CompanyEnum.Career] = UrlProvider.careerUrl(Environment.Production);
			companyUrls = Object.values(companyUrl);

			for (let index = 0; index < companyUrls.length; index++) {
				await footer.getByTestId(Object.values(companyButtons)[index]).click();
				await baseDriverSteps.checkUrl(companyUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5486,
		`Check the redirection by the "Get a quote" button on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await footer.getByTestId(MainSiteButtons.GetAQuote).click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.GetAQuote));
		}
	}
);

test(
	qase(
		5490,
		`Check the redirection for the social links on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		const linkMap = new Map([
			[Buttons.LinkedIn, Links.LinkedIn],
			[Buttons.Facebook, Links.Facebook],
			[Buttons.Instagram, Links.Instagram],
			[Buttons.Behance, Links.Behance],
			[Buttons.Dribbble, Links.Dribbble],
			[Buttons.Twitter, Links.Twitter],
			[Buttons.GoodFirms, Links.GoodFirms],
			[Buttons.Clutch, Links.Clutch],
			[Buttons.DesignRush, Links.DesignRush],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const entries of linkMap.entries()) {
				const [newPage] = await Promise.all([
					driver.DriverContext.waitForEvent('page'),
					await footer.getByTestId(entries[0]).click(),
				]);
				expect(newPage.url().includes(entries[1])).toBeTruthy();
				await newPage.close();
			}
		}
	}
);

test(
	qase(
		5489,
		`Check the redirection to the Terms, Cookies Policy, and Sitemap pages on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		const linkMap = new Map([
			[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
			[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
			[Footer.Sitemap, UrlProvider.urlBuilder(UrlPath.Sitemap)],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const entries of linkMap.entries()) {
				await baseDriverSteps.goToUrl(url);
				await driver.getByTestId(entries[0]).click();
				await baseDriverSteps.checkUrl(entries[1]);
			}
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
