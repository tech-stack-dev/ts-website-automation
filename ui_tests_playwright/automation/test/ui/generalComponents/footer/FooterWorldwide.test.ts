import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Container from '../../../../identifiers/Container';
import Buttons from '../../../../identifiers/Buttons';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import {companyUrl, serviceUrl, industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import Links from '../../../../preconditionsData/links/Links';

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

for (const url of testDataProvider) {
	test(`Check the footer information from the 'Footer' container on the '${url}' page @Regression @Footer @TSWEB-655 @TSWEB-674`, async () => {
		await baseDriverSteps.goToUrl(url);
		const contactBlock = (await containerSteps.getContainerBlockByTitle(
			footer,
			Container.SectionTitle,
			'Contacts'
		))!;
		const industriesBlock = (await containerSteps.getContainerBlockByTitle(
			footer,
			Container.BlockTitle,
			'Industries'
		))!;
		const servicesBlock = (await containerSteps.getContainerBlockByTitle(
			footer,
			Container.BlockTitle,
			'Services'
		))!;
		const companyBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Company'))!;
		const year = new Date().getFullYear();

		await expect(footer.getByTestId(Buttons.Logo)).toBeVisible();
		await expect(contactBlock.getByTestId(Container.SectionTitle)).toHaveText('Contacts');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('Headquarters:');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('Poland, Wroclaw,');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('9 Rybacka street, 53-656');
		await expect(contactBlock.getByTestId(Container.Phone)).toContainText('Phone number:');
		await expect(contactBlock.getByTestId(Container.Phone)).toContainText('+1-312-442-0823');
		await expect(footer.getByTestId(Footer.Info)).toHaveText(`© ${year} Techstack. All rights reserved.`);

		await expect(industriesBlock.getByTestId(Container.BlockTitle)).toHaveText('Industries');
		expect(await industriesBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Healthcare',
			'Transportation and Logistics',
			'Renewable Energy',
		]);

		await expect(servicesBlock.getByTestId(Container.BlockTitle)).toHaveText('Services');
		expect(await servicesBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Our Services',
			'Custom Software Development',
			'Digital Transformation',
			'Cloud Development',
			'Mobile Development',
			'Big Data & Analytics',
			'Internet of Things',
			'DevOps as a Service',
			'AI Development',
			'UX / UI Design',
			'QA as a Service',
			'Consulting Services',
		]);

		await expect(companyBlock.getByTestId(Container.BlockTitle)).toHaveText('Company');
		expect(await companyBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'About Us',
			'How we work',
			'Pricing',
			'Career',
			'Case Studies',
			'Blog',
			'Whitepapers',
		]);

		await expect(footer.getByTestId(Footer.TermsOfUse)).toHaveText('Terms of use');
		await expect(footer.getByTestId(Footer.CookiesPolicy)).toHaveText('Cookies Policy');
		await expect(footer.getByTestId(Footer.Sitemap)).toHaveText('Sitemap');
	});

	test(`Check the redirection by the "Techstack" logo on the '${url}' page @Regression @Footer @TSWEB-655`, async () => {
		await baseDriverSteps.goToUrl(url);
		await footer.getByTestId(Buttons.Logo).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	});

	test(`Check the redirection for the Industries block on the '${url}' page @Regression @Footer @TSWEB-833`, async () => {
		await baseDriverSteps.goToUrl(url);
		const industriesBlock = (await containerSteps.getContainerBlockByTitle(
			footer,
			Container.BlockTitle,
			'Industries'
		))!;
		const industriesList = await industriesBlock.getByTestId(Container.SectionTitle).all();

		for (let index = 0; index < industriesList.length; index++) {
			await industriesList[index].click();
			await baseDriverSteps.checkUrl(Object.values(industryUrl)[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Services block on the '${url}' page @Regression @Footer @TSWEB-655`, async () => {
		await baseDriverSteps.goToUrl(url);
		const servicesBlock = (await containerSteps.getContainerBlockByTitle(
			footer,
			Container.BlockTitle,
			'Services'
		))!;
		const servicesList = await servicesBlock.getByTestId(Container.SectionTitle).all();

		for (let index = 0; index < servicesList.length; index++) {
			await servicesList[index].click();
			await baseDriverSteps.checkUrl(Object.values(serviceUrl)[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Company block on the '${url}' page @Regression @Footer @TSWEB-655 @TSWEB-674`, async () => {
		const companyUrlList = Object.values(companyUrl);
		await baseDriverSteps.goToUrl(url);
		const companyBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Company'))!;
		const companyList = await companyBlock.getByTestId(Container.SectionTitle).all();

		for (let index = 0; index < companyList.length; index++) {
			await companyList[index].click();
			await baseDriverSteps.checkUrl(companyUrlList[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection by the "Contact us" button on the '${url}' page @Regression @Footer @TSWEB-655`, async () => {
		await baseDriverSteps.goToUrl(url);
		await footer.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	});

	test(`Check the redirection for the social links on the '${url}' page @Regression @Footer @TSWEB-655`, async () => {
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

		await baseDriverSteps.goToUrl(url);

		for (const entries of linkMap.entries()) {
			const [newPage] = await Promise.all([
				driver.DriverContext.waitForEvent('page'),
				await footer.getByTestId(entries[0]).click(),
			]);
			expect(newPage.url().includes(entries[1])).toBeTruthy();
			await newPage.close();
		}
	});

	test(`Check the redirection to the Terms, Cookies Policy, and Sitemap pages on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const linkMap = new Map([
			[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
			[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
			[Footer.Sitemap, UrlProvider.urlBuilder(UrlPath.Sitemap)],
		]);

		for (const entries of linkMap.entries()) {
			await baseDriverSteps.goToUrl(url);
			await driver.getByTestId(entries[0]).click();
			await baseDriverSteps.checkUrl(entries[1]);
		}
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
