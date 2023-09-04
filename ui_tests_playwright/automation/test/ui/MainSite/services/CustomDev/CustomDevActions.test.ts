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

const requestAQuoteText = 'Request a quote';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check redirect by 'Our Services' breadcrumbs button in header from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
});

test("Check page is scrolled down to 'Get in Touch' container after clicking on 'Request a quote' button from the 'Info' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	const requestAQuote = info.getByTestId(MainSiteButtons.RequestAQuote);

	await requestAQuote.scrollIntoViewIfNeeded();
	await expect(requestAQuote).toHaveText(requestAQuoteText);

	await driver.Page.waitForLoadState('networkidle');
	await requestAQuote.click();

	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check redirects by arrows in 'Custom development services we provide' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);
	const sections = servicesWeProvide.getByTestId(Container.ContainerSection);

	const sectionRegex = /.(Front-End and Back-End development)|.(Building software products)/;
	const numberOfSectionsWithoutRedirects = 2;
	const sectionsWithoutRedirects = sections.filter({
		hasText: sectionRegex,
	});

	for (let i = 0; i < numberOfSectionsWithoutRedirects; i++) {
		await sectionsWithoutRedirects.nth(i).click();

		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
	}

	const sectionsWithRedirects = sections.filter({hasNotText: sectionRegex});
	const numberOfSectionsWithRedirects = 8;
	const expectedRedirectUri = [
		UrlProvider.urlBuilder(UrlPath.MobileDev),
		UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
		UrlProvider.urlBuilder(UrlPath.BigData),
		UrlProvider.urlBuilder(UrlPath.AiMl),
		UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		UrlProvider.urlBuilder(UrlPath.UiUxDesign),
		UrlProvider.urlBuilder(UrlPath.QaAsAServ),
		UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	];

	for (let i = 0; i < numberOfSectionsWithRedirects; i++) {
		const section = sectionsWithRedirects.nth(i);

		await section.click();
		await baseDriverSteps.checkUrl(expectedRedirectUri[i]);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
	}
});

test("Check page is scrolled down to 'Get in Touch' container after clicking on 'Request a quote' from the 'Technology stack' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	await driver.Page.waitForLoadState('load');
	const technologyStack = driver.getByTestId(CustomDev.TechnologyStack);
	const requestAQuote = technologyStack.getByTestId(MainSiteButtons.RequestAQuote);

	await requestAQuote.scrollIntoViewIfNeeded();
	await expect(requestAQuote).toHaveText(requestAQuoteText);

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check carousel arrows and 'Request a quote' button from the 'Custom software development process' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devProcess = driver.getByTestId(CustomDev.CustomDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(devProcess);

	const requestAQuote = devProcess.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText(requestAQuoteText);

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test.skip("Check social link redirects in 'Custom software development experts' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devExperts = driver.getByTestId(CustomDev.CustomDevelopmentExperts);
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

test("Check redirect by 'Clutch Review' buttons in 'Our approach to software development' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
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

test("Check section collapsing in 'FAQ' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const faqContainer = driver.getByTestId(CustomDev.Faq);

	const sections = faqContainer.getByTestId(Container.ContainerSection);
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
