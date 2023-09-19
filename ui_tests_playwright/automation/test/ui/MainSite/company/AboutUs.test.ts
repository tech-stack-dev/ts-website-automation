import {expect, test} from '@playwright/test';
import AboutUs from '../../../../identifiers/MainSite/pages/company/AboutUs';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import { driver } from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import UrlPath from '../../../../providers/UrlPath';
import { ExpertNames } from '../../../../preconditionsData/ExpertNames';
import Buttons from '../../../../identifiers/Buttons';
import { ExpertsLinkedInLinks } from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import { Environment } from '../../../../providers/EnvProvider';
import { AuthorsEnum } from '../../../../enum/AuthorsEnum';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import { LinkedInReviewLinks } from '../../../../preconditionsData/Links/linkedInReviewLinks';
import { ClutchReviewLinks } from '../../../../preconditionsData/Links/ClutchReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
});

test("Check the header from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const info = driver.getByTestId(AboutUs.Info);
	await expect(info.getByTestId(Container.Title)).toHaveText('We Make an Impact on\nthe Product, People, and\nWorld');
});

test("Check the container title and number from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const containers = [
		driver.getByTestId(AboutUs.OurStory),
		driver.getByTestId(AboutUs.WhatsAtTheCore),
		driver.getByTestId(AboutUs.OurTeam),
		driver.getByTestId(AboutUs.WhatMakesUsSpecial),
		driver.getByTestId(AboutUs.OurPartners),
		driver.getByTestId(AboutUs.ShoutoutFromOurPartners),
		driver.getByTestId(AboutUs.OurPeople),
		driver.getByTestId(AboutUs.GetInTouch),
	];

	const expectedData = [
		['Our story', '01'],
		['What’s at the Core', '02'],
		['Our team', '03'],
		['What makes\nus special', '04'],
		['Our partners', '05'],
		['Shoutout from\nour partners', '06'],
		['Our people', '07'],
		['Get in Touch', '08'],
	];
	
	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check member names and roles in 'Our team' block from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const ourExpertsContainer = driver.getByTestId(AboutUs.OurTeam);
	const allMemberRoles = ourExpertsContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'CEO, Сo-Founder,\nEnsures the growth of products, teams, and culture of Techstack',
		'Managing Partner,\nFacilitates communication between partners and the team',
		'Chief Operations Officer, Co-Founder,\nOversees operations to keep businesses on track',
		'CTO, Сo-Founder,\nElaborates on the technology strategy',
		'Sr. Director of Quality Engineering,\nOversees quality product development',
		'Head of Human Resources,\nFinds the best talents and ensures their growth and fulfillment',
		'VP of Engineering,\nLeads architecture and development in large-scale products',
		'Chief Creative Officer,\nAligns UX with users\' needs and business goals',
		'Head of Account Management,\nDrives cross-functional business process transformation',
		'Head of Marketing,\nLeads the marketing strategy and growth of our tech community',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = ourExpertsContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.IvanIeremenko,
		ExpertNames.MaxLevytskyi,
		ExpertNames.ArtemDolotov,
		ExpertNames.OleksiiSvystun,
		ExpertNames.VitaliiDolotov,
		ExpertNames.MariaDarmanian,
		ExpertNames.IvanYeremenko,
		ExpertNames.DmytroDytiuk,
		ExpertNames.DmytroShtapauk,
		ExpertNames.NastasiiaDudnik,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test("Check redirects by buttons in 'Our team' block from the 'About Us' page @Regression @AboutUs @TSWEB-1022 @TSWEB-1061", async () => {
	const ourTeamExperts = driver.getByTestId(AboutUs.OurTeam);
	const buttonUrlMap = new Map([
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.MaxLevytskyi],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.ArtemDolotov],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(4), ExpertsLinkedInLinks.VitaliiDolotov],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(5), ExpertsLinkedInLinks.MariaDarmanian],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(6), ExpertsLinkedInLinks.IvanYeremenko],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(7), ExpertsLinkedInLinks.DmytroDytiuk],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(8), ExpertsLinkedInLinks.DmytroShtapauk],
		[ourTeamExperts.getByTestId(Buttons.LinkedIn).nth(9), ExpertsLinkedInLinks.NastasiiaDudnik],

		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanIeremenko,
		],
		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.VitaliiDolotov,
		],
		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(4),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroDytiuk,
		],
		[
			ourTeamExperts.getByTestId(Buttons.Blog).nth(5),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroShtapauk,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check 'Learn more about how we work' button from the 'Our partners' block on the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const ourPartnersBlock = driver.getByTestId(AboutUs.OurPartners);

	await ourPartnersBlock.getByTestId(MainSiteButtons.Arrow).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.HowWeWork));
});


test("Check redirect by 'LinkedIn Review' button in 'Shoutout from our partners' block from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const shoutoutFromOurPartnersContainer = driver.getByTestId(AboutUs.ShoutoutFromOurPartners);

	const linkedInButtons = await shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.LinkedInReviewArrow).all();

	const linkedInReviewsTab = shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.LinkedInReviews);
	expect(await linkedInReviewsTab.getAttribute('class')).toContain('active');

	const buttonMap = new Map([
		[linkedInButtons[0], LinkedInReviewLinks.FerdiVanHeerden],
		[linkedInButtons[1], LinkedInReviewLinks.GrahamBrown],
	]);

	for (const [button, url] of buttonMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check redirect by 'Clutch Review' button in 'Shoutout from our partners' container from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const shoutoutFromOurPartnersContainer = driver.getByTestId(AboutUs.ShoutoutFromOurPartners);

	const clutchReviewButton = shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.ClutchReviews);
	await clutchReviewButton.click();
	expect(await clutchReviewButton.getAttribute('class')).toContain('active');

	const clutchButtons = await shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

	const buttonMap = new Map([
		[clutchButtons[0], ClutchReviewLinks.MarkBeare],
		[clutchButtons[1], ClutchReviewLinks.AnonymousMedicalDevice],
	]);

	for (const [button, url] of buttonMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test('Check redirect by "Clutch Review" button in "Shoutout from our partners" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const shoutoutFromOurPartnersContainer = driver.getByTestId(AboutUs.ShoutoutFromOurPartners);

	const clutchReviewButton = shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.ClutchReviews);
	await clutchReviewButton.click();
	expect(await clutchReviewButton.getAttribute('class')).toContain('active');

	const clutchButtons = await shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

	const buttonMap = new Map([
		[clutchButtons[0], ClutchReviewLinks.MarkBeare],
		[clutchButtons[1], ClutchReviewLinks.AnonymousMedicalDevice],
	]);

	for (const [button, url] of buttonMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});