import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Container from '../../../../identifiers/Container';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import Buttons from '../../../../identifiers/Buttons';
import Links from '../../../../preconditionsData/Links/Links';

let footer: Locator;
const testDataProvider = [
	UrlProvider.careerUrl(),
	UrlProvider.careerUrlBuilder(UrlPath.AboutUs),
	UrlProvider.careerUrlBuilder(UrlPath.Reviews),
	UrlProvider.careerUrlBuilder(UrlPath.ContactUs),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Buttons.AcceptCookies).click();
	footer = driver.getByTestId(Footer.Container_Footer);
});

for (const url of testDataProvider) {
	test.skip(`Check the footer information from the 'Footer' container on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		await baseDriverSteps.goToUrl(url);

		const companyBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Company'))!;
		const careerBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Career'))!;
		const year = new Date().getFullYear();

		await expect(footer.getByTestId(Buttons.Logo)).toBeVisible();
		await expect(companyBlock.getByTestId(Container.BlockTitle)).toHaveText('Company');
		await expect(careerBlock.getByTestId(Container.BlockTitle)).toHaveText('Career');
		await expect(footer.getByTestId(Footer.Info).nth(0)).toHaveText(`© ${year} Techstack. All rights reserved.`);
		expect(await companyBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Techstack Worldwide',
			'Services',
			'Case Studies',
			'Blog',
		]);
		expect(await careerBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Jobs',
			'About us',
			'Reviews',
			'Contact us',
		]);
	});

	test.skip(`Check the redirection for the Company block on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const companyUrlList = [
			UrlProvider.webSiteUrl(),
			UrlProvider.urlBuilder(UrlPath.OurServices),
			UrlProvider.urlBuilder(UrlPath.CaseStudies),
			UrlProvider.urlBuilder(UrlPath.Blog),
		];

		await baseDriverSteps.goToUrl(url);
		const companyBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Company'))!;
		const companyList = await companyBlock.getByTestId(Container.SectionTitle).all();

		for (let index = 0; index < companyList.length; index++) {
			await companyList[index].click();
			await baseDriverSteps.checkUrl(companyUrlList[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test.skip(`Check the redirection for the Career block on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const careerUrlList = [
			UrlProvider.careerUrl(),
			UrlProvider.careerUrlBuilder(UrlPath.AboutUs),
			UrlProvider.careerUrlBuilder(UrlPath.Reviews),
			UrlProvider.careerUrlBuilder(UrlPath.ContactUs),
		];

		await baseDriverSteps.goToUrl(url);
		const careerBlock = (await containerSteps.getContainerBlockByTitle(footer, Container.BlockTitle, 'Career'))!;
		const careerList = await careerBlock.getByTestId(Container.SectionTitle).all();

		for (let index = 0; index < careerList.length; index++) {
			await careerList[index].click();
			await baseDriverSteps.checkUrl(careerUrlList[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test.skip(`Check the redirection for the social links on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const linkMap = new Map([
			[Buttons.Behance, Links.Behance],
			[Buttons.LinkedIn, Links.LinkedIn],
			[Buttons.Facebook, Links.Facebook],
			[Buttons.Instagram, Links.Instagram],
		]);

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
	});

	test.skip(`Check redirection to the Terms, Cookies Policy and main pages on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const linkMap = new Map([
			[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
			[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
			[Buttons.Logo, UrlProvider.careerUrl()],
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
