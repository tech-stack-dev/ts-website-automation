import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Container from '../../../../identifiers/Container';
import Link from '../../../../identifiers/Link';
import {Environment} from '../../../../providers/EnvProvider';
import Button from '../../../../identifiers/Button';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import {companyUrl, industryUrl, serviceUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';

let footer: Locator;
const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.OpenCase),
	UrlProvider.urlBuilder(UrlPath.ArticlePageDescription),
	UrlProvider.urlBuilder(UrlPath.AuthorPage + AuthorsEnum.VitaliiDolotov),
	companyUrl[CompanyEnum.AboutUs],
	companyUrl[CompanyEnum.HowWeWork],
	companyUrl[CompanyEnum.CaseStudies],
	companyUrl[CompanyEnum.Blog],
]
	.concat(Object.values(serviceUrl))
	.concat(Object.values(industryUrl));

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	await driver.getByTestId(Button.AcceptCookies).click();
	footer = driver.getByTestId(Footer.Container_Footer);
});

for (const url of testDataProvider) {
	test.skip(`Check the footer information from the 'Footer' container on the '${url}' link @Regression @Footer @TSWEB-655 @TSWEB-674`, async () => {
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

		await expect(footer.getByTestId(Link.Logo)).toBeVisible();
		await expect(contactBlock.getByTestId(Container.SectionTitle)).toHaveText('Contacts');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('Headquarters:');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('Poland, Wroclaw,');
		await expect(contactBlock.getByTestId(Footer.Headquarters)).toContainText('9 Rybacka street, 53-656');
		await expect(contactBlock.getByTestId(Footer.Phone)).toContainText('Phone number:');
		await expect(contactBlock.getByTestId(Footer.Phone)).toContainText('+1-312-442-0823');
		await expect(footer.getByTestId(Footer.Info)).toHaveText(`© ${year} Techstack. All rights reserved.`);

		expect(await industriesBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Healthcare',
			'Transportation and Logistics',
			'Renewable Energy',
		]);
		expect(await servicesBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'Our Services',
			'Custom Software Development',
			'Cloud & DevOps',
			'Big Data & Analytics',
			'AI & ML',
			'Internet of Things',
			'Mobile Development',
			'UX / UI Design',
			'QA as a Service',
			'Consulting Services',
		]);
		expect(await companyBlock.getByTestId(Container.SectionTitle).allInnerTexts()).toEqual([
			'About Us',
			'How we work',
			'Career',
			'Case Studies',
			'Blog',
		]);
	});

	test.skip(`Check the redirection for the Industries block on the '${url}' link @Regression @Footer @TSWEB-833`, async () => {
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

	test.skip(`Check the redirection for the Services block on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
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

	test.skip(`Check the redirection for the Company block on the '${url}' link @Regression @Footer @TSWEB-655  @TSWEB-674`, async () => {
		const companyUrlList: string[] = [
			companyUrl[CompanyEnum.AboutUs],
			companyUrl[CompanyEnum.HowWeWork],
			UrlProvider.careerUrl(Environment.Production),
			companyUrl[CompanyEnum.CaseStudies],
			companyUrl[CompanyEnum.Blog],
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

	test.skip(`Check the redirection for the social links on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const linkMap = new Map([
			[Footer.LinkedIn, 'https://www.linkedin.com'],
			[Footer.Facebook, 'https://www.facebook.com'],
			[Footer.Instagram, 'https://www.instagram.com'],
			[Footer.Behance, 'https://www.behance.net/Techstack_Ltd'],
			[Footer.Dribbble, 'https://dribbble.com/techstackdesign'],
			[Footer.Twitter, 'https://twitter.com'],
			[Footer.GoodFirms, 'https://www.goodfirms.co/company/techstack-ltd'],
			[Footer.Clutch, 'https://clutch.co/profile/techstack'],
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

	test.skip(`Check redirection to the Terms, Cookies Policy, Sitemap, Contact us and main pages on the '${url}' link @Regression @Footer @TSWEB-655`, async () => {
		const linkMap = new Map([
			[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
			[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
			[Footer.Sitemap, UrlProvider.urlBuilder(UrlPath.Sitemap)],
			[Button.ContactUs, UrlProvider.urlBuilder(UrlPath.ContactUs)],
			[Link.Logo, UrlProvider.webSiteUrl()],
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
