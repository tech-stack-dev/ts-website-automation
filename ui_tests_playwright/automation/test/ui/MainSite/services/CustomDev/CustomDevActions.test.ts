import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {CustomDev} from '../../../../../identifiers/mainSite/pages/services/CustomDev';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {Environment} from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../../../preconditionsData/links/Links';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check redirect by link in 'Techstack’s Strengths in Custom Software Development' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const techstackStrengthContainer = driver.getByTestId(CustomDev.TechstacksStrengthsInCustomSoftDev);

	await baseDriverSteps.checkRedirectToPage(
		techstackStrengthContainer.getByTestId(MainSiteLinks.Clutch),
		Links.ClutchReviews
	);
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
		[containerSection.nth(5), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[containerSection.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		// [containerSection.nth(7), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
		[containerSection.nth(8), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(9), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		// [containerSection.nth(10), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
	]);

	const pageUrl = UrlProvider.urlBuilder(UrlPath.CustomDev);

	for (const [section, url] of sectionUrlMap) {
		await baseDriverSteps.checkRedirectToPage(section, url, pageUrl);
	}
});

test("Check redirect by 'Read More' button in 'Our Featured Case Study' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const ourFeaturedCaseStudyContainer = driver.getByTestId(CustomDev.OurFeaturedCaseStudy);

	await ourFeaturedCaseStudyContainer.getByTestId(MainSiteButtons.ReadMore).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(`${UrlPath.CaseStudies}${CaseStudyPath.OneStopCrossPlatform}`, Environment.Production)
	);
});

test("Check redirect by links in 'Industries We Develop Software For' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const industriesWeDevelopContainer = driver.getByTestId(CustomDev.IndustriesWeDevelopSoftwareFor);
	const sections = industriesWeDevelopContainer.getByTestId(Container.ContainerSection);

	const linksUrlMap = new Map([
		[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[sections.getByTestId(MainSiteLinks.TransportAndLogistics), UrlProvider.urlBuilder(UrlPath.TransportAndLogist)],
		[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
	]);

	for (const [link, url] of linksUrlMap) {
		await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.CustomDev));
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
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
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

test("Check carousel arrows from the 'Custom Software Development Process' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devProcessContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(devProcessContainer);
});

test('Check sections expanding and collapsing in "FAQ" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const faqContainer = driver.getByTestId(CustomDev.Faq);
	const expectedNumberOfSections = 5;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const ctaButtons = [
		driver.getByTestId(CustomDev.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide).getByTestId(MainSiteButtons.SendUsYourQueries),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts).getByTestId(MainSiteButtons.ContactOurExperts),
		driver
			.getByTestId(CustomDev.OurTailoredCollaborationAndPricingModels)
			.getByTestId(MainSiteButtons.ClaimYourCustomQuote),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, CustomDev.GetInTouch);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
