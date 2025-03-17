import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Footer from '../../../../identifiers/Footer';
import Container from '../../../../identifiers/Container';
import Buttons from '../../../../identifiers/Buttons';
import {companyUrl, serviceUrl, industryUrl, expertiseUrl} from '../../../../preconditionsData/UrlPreconditions';
import Links from '../../../../preconditionsData/links/Links';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {Environment} from '../../../../providers/EnvProvider';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import {arrayUtils} from '../../../../utils/ArrayUtils';

let footer: Locator;
let industriesButtons: string;
let servicesButtons: object;
let expertiseButtons: object;
let companyButtons: string;
let industriesUrls: string[];
let servicesUrls: string[];
let expertiseUrls: string[];
let companyUrls: string[];
let containerBlock: Locator[];
let contactBlock: Locator;
let industriesBlock: Locator;
let expertiseBlock: Locator;
let companyBlock: Locator;

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	footer = driver.getByTestId(Footer.Container_Footer);

	industriesButtons = Container.SectionTitle;
	servicesButtons = Buttons.ServicesBlog;
	expertiseButtons = Buttons.ExpertiseBlog;
	companyButtons = Container.SectionTitle;

	industriesUrls = Object.values(industryUrl);
	servicesUrls = Object.values(serviceUrl);
	expertiseUrls = Object.values(expertiseUrl);
	companyUrls = Object.values(companyUrl);

	containerBlock = await footer.getByTestId(Container.ContainerBlock).all();
	contactBlock = containerBlock[0];
	industriesBlock = containerBlock[2];
	expertiseBlock = containerBlock[3];
	companyBlock = containerBlock[4];
});

test(`Check the footer information from the "Footer" container on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const year = new Date().getFullYear();
	const headquoters = 'Headquarters:';
	const countryData = 'Poland, Wroclaw,';
	const streetData = '9 Rybacka street, 53-656';
	const callUs = 'Call us:';
	const phoneNumberDataUSA = '+1-312-442-0823 (USA)';
	const phoneNumberDataEU = '+4-871-735-3668 (EU)';
	const sayHi = 'Say hi:';
	const email = 'hello@tech-stack.com';

	await expect(footer.getByTestId(Buttons.Logo)).toBeVisible();
	await expect(contactBlock.getByTestId(Container.SectionTitle)).toHaveText('Contacts');

	await expect(footer.getByTestId('Headquarters')).toHaveText(`\n${headquoters}\n\n${countryData}${streetData}`);

	baseDriverSteps.checkContactsPhone(contactBlock, `${callUs}${phoneNumberDataUSA}${phoneNumberDataEU}`);
	baseDriverSteps.checkContactsEmail(contactBlock, `${sayHi}${email}`);

	await expect(footer.getByTestId(Footer.Info)).toHaveText(`© ${year} Techstack. All rights reserved.`);

	await expect(footer.getByTestId(Buttons.OurServices)).toHaveText('Services');
	const servicesText = [
		'PoC / MVP Development',
		'Custom Software Development',
		'AI Integration Services',
		'Data Strategy',
		'Software Audit',
		'Quality Assurance',
		'Product Scaling',
		'Cloud Migration',
		'Dedicated Team',
		'Expert Outstaffing',
	];

	for (const text of servicesText) {
		let targetButton;
		//todo: change data-id for Data Strategy link in footer blog
		if (text === 'Data Strategy') {
			targetButton = footer.getByTestId(Object.values(servicesButtons)[servicesText.indexOf(text) - 1]).last();
		} else {
			targetButton = footer.getByTestId(Object.values(servicesButtons)[servicesText.indexOf(text)]).first();
		}
		await expect(targetButton).toHaveText(text);
	}
	await expect(industriesBlock.getByTestId(Container.BlockTitle)).toHaveText('Industries');
	const industriesText = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy', 'Startups'];
	const buttons = await industriesBlock.getByTestId(industriesButtons).all();
	const industriesMap = arrayUtils.mergeTwoArraysToMap(industriesText, buttons);

	for (const [text, button] of industriesMap) {
		await expect(button).toHaveText(text);
	}

	await expect(expertiseBlock.getByTestId(Container.BlockTitle)).toHaveText('Expertise');
	const expertiseText = [
		'Cloud Development',
		'DevOps as a Service',
		'Internet of Things',
		'Digital Transformation',
		'UX / UI Design',
		'Mobile Development',
		'Front-End Development',
		'Back-End Development',
		'Big Data & Analytics',
		'AI Development',
		'Computer Vision',
		'OpenAI API Integration',
		'Deep Learning',
	];
	const expertiseMap = arrayUtils.mergeTwoArraysToMap(expertiseText, Object.values(expertiseButtons));
	for (const [text, button] of expertiseMap) {
		const buttonElement = footer.getByTestId(button);
		await expect(buttonElement).toHaveText(text);
	}

	await expect(companyBlock.getByTestId(Container.BlockTitle)).toHaveText('Company');
	const companyText = ['About Us', 'How we work', 'Our Clients', 'Pricing', 'Case Studies', 'Blog', 'Career'];

	const companyLocator = await companyBlock.getByTestId(industriesButtons).all();
	const companyMap = arrayUtils.mergeTwoArraysToMap(companyText, companyLocator);
	for (const [text, button] of companyMap) {
		await expect(button).toHaveText(text);
	}

	await expect(footer.getByTestId(Footer.TermsOfUse)).toHaveText('Terms of use');
	await expect(footer.getByTestId(Footer.CookiesPolicy)).toHaveText('Cookies Policy');
	await expect(footer.getByTestId(Footer.Sitemap)).toHaveText('Sitemap');
});

test(`Check the redirection by the "Techstack" logo on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	await footer.getByTestId(Buttons.Logo).click();
	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
});

test(`Check the redirection by the "Contact Us" button on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	await footer.getByTestId(Footer.ContactUs).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
});

test(`Check the redirection by the "Services" button on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	await footer.getByTestId(Buttons.OurServices).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
	await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
});

test(`Check the redirection for the Services block on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const servicesMap = arrayUtils.mergeTwoArraysToMap(Object.values(servicesButtons), servicesUrls);
	for (const [buttonText, url] of servicesMap) {
		if (buttonText === Buttons.ServicesBlog.DataStrategy) {
			await footer
				.getByTestId(Object.values(servicesButtons)[Object.values(servicesButtons).indexOf(buttonText) - 1])
				.last()
				.click();
		} else {
			await footer
				.getByTestId(Object.values(servicesButtons)[Object.values(servicesButtons).indexOf(buttonText)])
				.first()
				.click();
		}
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	}
});

test(`Check the redirection for the Industries block on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const buttons = await industriesBlock.getByTestId(industriesButtons).all();

	const industriesMap = arrayUtils.mergeTwoArraysToMap(industriesUrls, buttons);

	for (const [url, button] of industriesMap) {
		await button.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	}

	await buttons[buttons.length - 1].click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.Startups));
	await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
});

test(`Check the redirection for the Expertise block on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const expertiseMap = arrayUtils.mergeTwoArraysToMap(expertiseUrls, Object.values(expertiseButtons));

	for (const [url, button] of expertiseMap) {
		await footer.getByTestId(button).click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	}
});

test(`Check the redirection for the Company block on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const companyList = [
		companyUrl[CompanyEnum.AboutUs],
		companyUrl[CompanyEnum.HowWeWork],
		companyUrl[CompanyEnum.OurClients],
		companyUrl[CompanyEnum.Pricing],
		companyUrl[CompanyEnum.CaseStudies],
		companyUrl[CompanyEnum.Blog],
		UrlProvider.careerUrl(Environment.Production),
	];

	companyUrls = Object.values(companyList);
	const buttons = Array.from(await companyBlock.getByTestId(companyButtons).all());
	for (const [button, url] of arrayUtils.mergeTwoArraysToMap(buttons, companyUrls)) {
		await button.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
	}
});

test(`Check the redirection by the "Get a quote" button on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	await footer.getByTestId(MainSiteButtons.GetAQuote).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.GetAQuote));
});

test(`Check the redirection for the social links on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
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

	for (const entries of linkMap.entries()) {
		const [newPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			footer.getByTestId(entries[0]).click(),
		]);

		let instagramErrorHandled = false;

		newPage.on('response', (response) => {
			if (response.url().includes(Links.Instagram) && !instagramErrorHandled) {
				const statusCode = response.status();
				if (statusCode !== 200) {
					console.warn('Instagram link returned non-200 status code:', statusCode);
					instagramErrorHandled = true;
				}
			}
		});

		expect(newPage.url()).toContain(entries[1]);
		await newPage.close();
	}
});

test(`Check the redirection to the Terms, Cookies Policy, and Sitemap pages on Blog page @desktop @mobile @Regression @Footer @Blog @TSWEB-818`, async () => {
	const linkMap = new Map([
		[Footer.TermsOfUse, UrlProvider.urlBuilder(UrlPath.Terms)],
		[Footer.CookiesPolicy, UrlProvider.urlBuilder(UrlPath.CookiesPolicy)],
		[Footer.Sitemap, UrlProvider.urlBuilder(UrlPath.Sitemap)],
	]);

	for (const entries of linkMap.entries()) {
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Blog));
		await driver.getByTestId(entries[0]).click();
		await baseDriverSteps.checkUrl(entries[1]);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
