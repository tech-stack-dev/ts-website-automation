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
import {IndustriesEnum} from '../../../../enum/IndustriesEnum';
import {ServicesEnum} from '../../../../enum/ServicesEnum';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {Environment} from '../../../../providers/EnvProvider';

let footer: Locator;

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.Healthcare),
	UrlProvider.urlBuilder(UrlPath.OurServices),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
	footer = driver.getByTestId(Footer.Container_Footer);
});

test(
	qase(
		5485,
		`Check the footer information from the 'Footer' container on all pages @desktop @mobile @Regression @Footer @TSWEB-655 @TSWEB-674`
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
			}

			await expect(footer.getByTestId(Footer.Info)).toHaveText(`© ${year} Techstack. All rights reserved.`);

			await expect(industriesBlock.getByTestId(Container.BlockTitle)).toHaveText('Industries');
			const industriesList = new Map([
				[Buttons.Industries_Healthcare, 'Healthcare'],
				[Buttons.Industries_TransportationAndLogistics, 'Transportation and Logistics'],
				[Buttons.Industries_RenewableEnergy, 'Renewable Energy'],
			]);

			for (const [element, title] of industriesList) {
				await expect(footer.getByTestId(element)).toHaveText(title);
			}

			await expect(servicesBlock.getByTestId(Container.BlockTitle)).toHaveText('Services');
			const servicesList = new Map([
				[Buttons.Services_OurServices, 'Our Services'],
				[Buttons.Services_CustomDev, 'Custom Software Development'],
				[Buttons.Services_DigitalTransform, 'Digital Transformation'],
				[Buttons.Services_CloudDev, 'Cloud Development'],
				[Buttons.Services_MobileDev, 'Mobile Development'],
				[Buttons.Services_BigData, 'Big Data & Analytics'],
				[Buttons.Services_InternetOfThings, 'Internet of Things'],
				[Buttons.Services_DevOps, 'DevOps as a Service'],
				[Buttons.Services_AiDevelopment, 'AI Development'],
				[Buttons.Services_UiUxDesign, 'UX / UI Design'],
				[Buttons.Services_QaAsAServ, 'QA as a Service'],
				[Buttons.Services_ConsultingServ, 'Consulting Services'],
			]);

			for (const [element, title] of servicesList) {
				await expect(footer.getByTestId(element)).toHaveText(title);
			}

			await expect(companyBlock.getByTestId(Container.BlockTitle)).toHaveText('Company');
			const companyList = new Map([
				[Buttons.Company_AboutUs, 'About Us'],
				[Buttons.Company_HowWeWork, 'How we work'],
				[Buttons.Company_Pricing, 'Pricing'],
				[Buttons.Company_Career, 'Career'],
				[Buttons.Company_CaseStudies, 'Case Studies'],
				[Buttons.Company_Blog, 'Blog'],
				[Buttons.Company_Whitepapers, 'Whitepapers'],
			]);

			for (const [element, title] of companyList) {
				await expect(footer.getByTestId(element)).toHaveText(title);
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

			const industriesList = new Map([
				[Buttons.Industries_Healthcare, industryUrl[IndustriesEnum.Healthcare]],
				[Buttons.Industries_TransportationAndLogistics, industryUrl[IndustriesEnum.TransportAndLogist]],
				[Buttons.Industries_RenewableEnergy, industryUrl[IndustriesEnum.RenewableEnergy]],
			]);

			for (const [element, industryUrl] of industriesList) {
				await footer.getByTestId(element).click();
				await baseDriverSteps.checkUrl(industryUrl);
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

			const servicesList = new Map([
				[Buttons.Services_OurServices, serviceUrl[ServicesEnum.OurServices]],
				[Buttons.Services_CustomDev, serviceUrl[ServicesEnum.CustomDev]],
				[Buttons.Services_DigitalTransform, serviceUrl[ServicesEnum.DigitalTransform]],
				[Buttons.Services_CloudDev, serviceUrl[ServicesEnum.CloudDev]],
				[Buttons.Services_MobileDev, serviceUrl[ServicesEnum.MobileDev]],
				[Buttons.Services_BigData, serviceUrl[ServicesEnum.BigData]],
				[Buttons.Services_InternetOfThings, serviceUrl[ServicesEnum.InternetOfThings]],
				[Buttons.Services_DevOps, serviceUrl[ServicesEnum.DevOpsAsAServ]],
				[Buttons.Services_AiDevelopment, serviceUrl[ServicesEnum.AiDevelopment]],
				[Buttons.Services_UiUxDesign, serviceUrl[ServicesEnum.UiUxDesign]],
				[Buttons.Services_QaAsAServ, serviceUrl[ServicesEnum.QaAsAServ]],
				[Buttons.Services_ConsultingServ, serviceUrl[ServicesEnum.ConsultingServ]],
			]);

			for (const [element, servicesUrl] of servicesList) {
				await footer.getByTestId(element).click();
				await baseDriverSteps.checkUrl(servicesUrl);
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
		const companyList = new Map([
			[Buttons.Company_AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Buttons.Company_HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Buttons.Company_Pricing, companyUrl[CompanyEnum.Pricing]],
			[Buttons.Company_Career, UrlProvider.careerUrl(Environment.Production)],
			[Buttons.Company_CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			// [Buttons.Company_Blog, companyUrl[CompanyEnum.Blog]], // Uncomment after Blog will be stable
			[Buttons.Company_Whitepapers, companyUrl[CompanyEnum.Whitepapers]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyList) {
				await footer.getByTestId(element).click();
				await baseDriverSteps.checkUrl(companyUrl);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5486,
		`Check the redirection by the "Contact us" button on all pages @desktop @mobile @Regression @Footer @TSWEB-655`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await footer.getByTestId(Buttons.ContactUs).click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
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
