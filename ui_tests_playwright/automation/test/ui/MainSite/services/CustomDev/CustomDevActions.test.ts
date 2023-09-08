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

const requestAQuoteText = 'Request a Quote';

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

test("Check redirects by arrows in 'Custom Development Services We Provide' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);

	const containerSection = servicesWeProvide.getByTestId(Container.ContainerSection);
	const sectionUrlMap = new Map([
		[containerSection.nth(0), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		// [containerSection.nth(1), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
		[containerSection.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(3), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(4), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(5), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		// [containerSection.nth(7), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
		[containerSection.nth(8), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(9), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		// [containerSection.nth(10), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
	]);

	const pageUrl = UrlProvider.urlBuilder(UrlPath.CustomDev);
	await baseDriverSteps.checkRedirectToPagesInSameTab(sectionUrlMap, pageUrl);
});

test("Check carousel arrows from the 'Custom software development process' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devProcessContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(devProcessContainer);
});

// Unskip after Blog will be stable
test.skip("Check social link redirects in 'Custom Software Development Experts' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
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

test("Check redirect by 'Clutch Review' buttons in 'Why Choose Techstack' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const whyChooseTechstackContainer = driver.getByTestId(CustomDev.WhyChooseTechstack);
	const clutchReviewButtons = whyChooseTechstackContainer.getByTestId(Buttons.Clutch);

	const clutchButtonUrlMap = new Map([
		[clutchReviewButtons.nth(0), ClutchReviewLinks.DarrenCody],
		[clutchReviewButtons.nth(1), ClutchReviewLinks.MarkBeare],
	]);

	for (const [button, url] of clutchButtonUrlMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
	}
});

test("Check section collapsing in 'FAQ' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const faqContainer = driver.getByTestId(CustomDev.Faq);
	const epectedNumberOfSections = 5;
	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, epectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
