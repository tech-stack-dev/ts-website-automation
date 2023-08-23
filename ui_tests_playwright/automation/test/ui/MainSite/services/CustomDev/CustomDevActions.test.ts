import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {CustomDev} from '../../../../../identifiers/MainSite/pages/services/CustomDev';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {Environment} from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check redirect by 'Home' breadcrumbs button in header from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
});

test("Check page is scrolled down to 'Get in Touch' block after clicking on 'Request quote' from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	const requestAQuote = info.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check page is scrolled down to 'Get in Touch' block after clicking on 'Request quote' from the 'Technology stack' block @Regression @CustomDev", async () => {
	const technologyStack = driver.getByTestId(CustomDev.TechnologyStack);
	const requestAQuote = technologyStack.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check carousel arrows and 'Request quote' button from the 'Custom software development process' block @Regression @CustomDev", async () => {
	const devProcess = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(devProcess);

	const requestAQuote = devProcess.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check social link redirects in 'Custom software development experts' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devExperts = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
	const memberCards = devExperts.getByTestId(Container.MemberCard);

	const numOfMembers = 7;

	await expect(memberCards).toHaveCount(numOfMembers);

	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);
	const expectedMemberCardsLinks: {blogLink: string; linkedInLink: string}[] = [
		{blogLink: blogUri + AuthorsEnum.IvanIeremenko, linkedInLink: ExpertsLinkedInLinks.IvanIeremenko},
		{blogLink: blogUri + AuthorsEnum.OleksiiSvystun, linkedInLink: ExpertsLinkedInLinks.OleksiiSvystun},
		{blogLink: blogUri + AuthorsEnum.VitaliiDolotov, linkedInLink: ExpertsLinkedInLinks.VitaliiDolotov},
		{blogLink: blogUri + AuthorsEnum.IvanYeremenko, linkedInLink: ExpertsLinkedInLinks.IvanYeremenko},
		{blogLink: blogUri + AuthorsEnum.YevheniiKarachevtsev, linkedInLink: ExpertsLinkedInLinks.YevheniiKarachevtsev},
		{blogLink: blogUri + AuthorsEnum.DmytroDytiuk, linkedInLink: ExpertsLinkedInLinks.DmytroDytiuk},
		{blogLink: blogUri + AuthorsEnum.DmytroShtapauk, linkedInLink: ExpertsLinkedInLinks.DmytroShtapauk},
	];

	for (let i = 0; i < numOfMembers; i++) {
		const memberCard = memberCards.nth(i);

		await memberCard.getByTestId(Buttons.Blog).click();
		let newPage = await driver.DriverContext.waitForEvent('page');

		await expect(newPage).toHaveURL(expectedMemberCardsLinks[i].blogLink);
		await newPage.close();

		await memberCard.getByTestId(Buttons.LinkedIn).click();
		newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(expectedMemberCardsLinks[i].linkedInLink);
		await newPage.close();
	}
});

//TODO
test.skip("Check redirect by 'Clutch Review' buttons in 'Our approach to software development' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devApproach = driver.getByTestId(CustomDev.OurApproachToSoftwareDevelopment);

	const clutchButtons = devApproach.getByTestId(Buttons.Clutch);

	const numOfButtons = 2;

	await expect(clutchButtons).toHaveCount(numOfButtons);

	const expectedLinks = [ClutchReviewLinks.DarrenCody, ClutchReviewLinks.AnonymousPeerToPeer];

	for (let i = 0; i < numOfButtons; i++) {
		await clutchButtons.nth(i).click();
		const newPage = await driver.DriverContext.waitForEvent('page');

		expect(newPage.url()).toContain(expectedLinks[i]);
		await newPage.close();
	}
});

test("Check section collapsing in 'FAQ' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const faq = driver.getByTestId(CustomDev.Faq);

	const sections = faq.getByTestId(Container.ContainerSection);
	const numOfSections = await sections.count();

	for (let i = numOfSections - 1; i >= 0; i--) {
		const section = sections.nth(i);
		await expect(section).toHaveAttribute('class', /.collapsed./);

		await expect(section.getByTestId(Container.SectionShortAnswer)).toBeVisible();
		await expect(section.getByTestId(Container.SectionFullAnswer)).toBeHidden();

		await section.click();

		await expect(section).not.toHaveAttribute('class', /.collapsed./);

		await expect(section.getByTestId(Container.SectionShortAnswer)).toBeVisible();
		await expect(section.getByTestId(Container.SectionFullAnswer)).toBeVisible();
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
