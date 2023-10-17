import {expect, test} from '@playwright/test';
import AboutUs from '../../../../identifiers/MainSite/pages/company/AboutUs';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import UrlPath from '../../../../providers/UrlPath';
import {ExpertNames} from '../../../../preconditionsData/ExpertNames';
import Buttons from '../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {Environment} from '../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import {LinkedInReviewLinks} from '../../../../preconditionsData/Links/linkedInReviewLinks';
import {ClutchReviewLinks} from '../../../../preconditionsData/Links/ClutchReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
});

test('Check the header from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const info = driver.getByTestId(AboutUs.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nAbout Us');
	await expect(info.getByTestId(Container.Title)).toHaveText('We Make an Impact on\nthe Product, People, and\nWorld');
	await expect(info.getByTestId(MainSiteButtons.LetsMakeItTogether)).toHaveText('Let’s make it together');
});

test('Check the container title and number from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
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

test('Check section numbers and titles, and subtitle in "What’s at the Core" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const whatAtTheCoreContainer = driver.getByTestId(AboutUs.WhatsAtTheCore);

	await expect(whatAtTheCoreContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02']);
	const allSectionTitles = whatAtTheCoreContainer.getByTestId(Container.SectionTitle);
	const testData = [' Vision:', ' Mission:'];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(whatAtTheCoreContainer.getByTestId(Container.SubTitle)).toHaveText('Our Values:');

	await expect(whatAtTheCoreContainer.getByTestId(Container.BlockNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
	]);

	const allTableTitles = whatAtTheCoreContainer.getByTestId(Container.BlockTitle);
	const tableTitles = ['Quality:', 'Tech:', 'Bravery:', 'Creativity:', 'Ownership:', 'People:', 'Joy:'];

	await expect(allTableTitles).toHaveText(tableTitles);
});

test('Check member names and roles in "Our team" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
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
		"Chief Creative Officer,\nAligns UX with users' needs and business goals",
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

test('Check redirects by LinkedIn buttons in "Our team" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const ourTeamExperts = driver.getByTestId(AboutUs.OurTeam);
	const expertCards = await ourTeamExperts.getByTestId(Container.MemberCard).all();
	const expectedLinkedInLinks = [
		ExpertsLinkedInLinks.IvanIeremenko,
		ExpertsLinkedInLinks.MaxLevytskyi,
		ExpertsLinkedInLinks.ArtemDolotov,
		ExpertsLinkedInLinks.OleksiiSvystun,
		ExpertsLinkedInLinks.VitaliiDolotov,
		ExpertsLinkedInLinks.MariaDarmanian,
		ExpertsLinkedInLinks.IvanYeremenko,
		ExpertsLinkedInLinks.DmytroDytiuk,
		ExpertsLinkedInLinks.DmytroShtapauk,
		ExpertsLinkedInLinks.NastasiiaDudnik,
	];

	for (let i = 0; i < expertCards.length; i++) {
		const memberCard = expertCards[i];

		await baseDriverSteps.checkRedirectToPage(memberCard.getByTestId(Buttons.LinkedIn), expectedLinkedInLinks[i]);
	}
});

test('Check redirects by Blog buttons in "Our team" container from the "About Us" page @Regression @AboutUs @TSWEB-1022 @TSWEB-1061', async () => {
	const ourTeamContainer = driver.getByTestId(AboutUs.OurTeam);
	const blogButtons = await ourTeamContainer.getByTestId(Buttons.Blog).all();
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);
	const expectedBlogLinks = [
		AuthorsEnum.IvanIeremenko,
		AuthorsEnum.OleksiiSvystun,
		AuthorsEnum.VitaliiDolotov,
		AuthorsEnum.IvanYeremenko,
		AuthorsEnum.DmytroDytiuk,
		AuthorsEnum.DmytroShtapauk,
	];

	for (let i = 0; i < blogButtons.length; i++) {
		const blogButton = blogButtons[i];
		const expectedUrl = `${blogUri}${expectedBlogLinks[i]}`;

		await baseDriverSteps.checkRedirectToPage(blogButton, expectedUrl);
	}
});

test('Check section titles in "What makes us special" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const whatMakesUsSpecialContainer = driver.getByTestId(AboutUs.WhatMakesUsSpecial);
	const allSectionTitles = whatMakesUsSpecialContainer.getByTestId(Container.SectionTitle);
	const testData = ['Focus on product', 'Team growth', 'Making an impact (CSR)', 'Sharing expertise'];
	await expect(allSectionTitles).toHaveText(testData);
});

test('Check "Learn more about how we work" button in the "Our partners" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const ourPartnersBlock = driver.getByTestId(AboutUs.OurPartners);

	await ourPartnersBlock.getByTestId(Container.Arrow).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.HowWeWork));
});

test('Check redirect by "LinkedIn Review" button in "Shoutout from our partners" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const shoutoutFromOurPartnersContainer = driver.getByTestId(AboutUs.ShoutoutFromOurPartners);

	const linkedInButtons = await shoutoutFromOurPartnersContainer
		.getByTestId(MainSiteButtons.LinkedInReviewArrow)
		.all();

	const linkedInReviewsTab = shoutoutFromOurPartnersContainer.getByTestId(MainSiteButtons.LinkedInReviews);
	expect(await linkedInReviewsTab.getAttribute('class')).toContain('active');

	const buttonMap = new Map([
		[linkedInButtons[0], LinkedInReviewLinks.FerdiVanHeerden],
		[linkedInButtons[1], LinkedInReviewLinks.GrahamBrown],
	]);

	for (const [button, url] of buttonMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
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
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test('Check photo carousel in the "Our people" container from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const ourPeopleContainer = driver.getByTestId(AboutUs.OurPeople);

	const carouselPhotoContainer = await ourPeopleContainer.getByTestId(Container.CarouselPhoto).all();

	const nextButton = ourPeopleContainer.getByTestId(Container.CarouselButtonNext);

	for (let index = 0; index < carouselPhotoContainer.length; index++) {
		expect(await carouselPhotoContainer[index].getAttribute('class')).toContain('active');
		await nextButton.click();
	}
});

test('Check CTA button from the "Our people" container from the "About Us" page @Regression @AboutUs @TSWEB-1022 @TSWEB-836', async () => {
	const ourPeopleBlock = driver.getByTestId(AboutUs.OurPeople);

	await ourPeopleBlock.getByTestId(MainSiteButtons.JoinUs).click();
	await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
});

test('Check navigation to "Get in Touch" container after clicking CTA button from the "About Us" page @Regression @AboutUs @TSWEB-1022', async () => {
	const ctaButton = driver.getByTestId(AboutUs.Info).getByTestId(MainSiteButtons.LetsMakeItTogether);

	await baseDriverSteps.checkScrollToContainerByCtaButtonClick(ctaButton, AboutUs.GetInTouch);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
