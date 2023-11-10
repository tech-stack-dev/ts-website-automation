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

test('Check redirect by link in "Techstack’s Strengths in Custom Software Development" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const techstackStrengthContainer = driver.getByTestId(CustomDev.TechstacksStrengthsInCustomSoftDev);

	await baseDriverSteps.checkRedirectToPage(
		techstackStrengthContainer.getByTestId(MainSiteLinks.Clutch),
		Links.ClutchReviews
	);
});

test('Check redirects by arrows in "Custom Development Services We Provide" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);

	const containerSection = servicesWeProvide.getByTestId(Container.ContainerSection);
	const sectionUrlMap = new Map([
		[containerSection.nth(0), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(1), UrlProvider.urlBuilder(UrlPath.BackEndDevelopment)],
		[containerSection.nth(2), UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment)],
		[containerSection.nth(3), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(4), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(5), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(6), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[containerSection.nth(7), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		// [containerSection.nth(8), UrlProvider.urlBuilder(UrlPath.CustomDev)], // Section without link yet
		[containerSection.nth(9), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(10), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(11), UrlProvider.urlBuilder(UrlPath.DigitalTransform)],
	]);

	const pageUrl = UrlProvider.urlBuilder(UrlPath.CustomDev);

	for (const [section, url] of sectionUrlMap) {
		await baseDriverSteps.checkRedirectToPage(section, url, pageUrl);
	}
});

test('Check redirect by CTA button in "Our Featured Case Study" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const ourFeaturedCaseStudyContainer = driver.getByTestId(CustomDev.OurFeaturedCaseStudy);

	await ourFeaturedCaseStudyContainer.getByTestId(MainSiteButtons.ReadMore).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(`${UrlPath.CaseStudies}${CaseStudyPath.OneStopCrossPlatform}`, Environment.Production)
	);
});

test('Check redirect by links in "Industries We Develop Software For" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
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

test('Check redirects by "Clutch Review" buttons in "Why Choose Techstack" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
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

test('Check redirects by LinkedIn buttons in "Custom Software Development Experts" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const customDeveExpertsContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
	const memberCards = customDeveExpertsContainer.getByTestId(Container.MemberCard);
	const numOfMembers = 7;

	await expect(memberCards).toHaveCount(numOfMembers);

	const linkedInButtons = customDeveExpertsContainer.getByTestId(Buttons.LinkedIn);

	const buttonUrlMap = new Map([
		[linkedInButtons.nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[linkedInButtons.nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[linkedInButtons.nth(2), ExpertsLinkedInLinks.VitaliiDolotov],
		[linkedInButtons.nth(3), ExpertsLinkedInLinks.IvanYeremenko],
		[linkedInButtons.nth(4), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		[linkedInButtons.nth(5), ExpertsLinkedInLinks.DmytroDytiuk],
		[linkedInButtons.nth(6), ExpertsLinkedInLinks.DmytroShtapauk],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test('Check redirects by Blog buttons in "Custom Software Development Experts" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672 @TSWEB-1061', async () => {
	const customDeveExpertsContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
	const blogButtons = customDeveExpertsContainer.getByTestId(Buttons.Blog);
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);

	const buttonUrlMap = new Map([
		[blogButtons.nth(0), `${blogUri}${AuthorsEnum.IvanIeremenko}`],
		[blogButtons.nth(1), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
		[blogButtons.nth(2), `${blogUri}${AuthorsEnum.VitaliiDolotov}`],
		[blogButtons.nth(3), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
		[blogButtons.nth(4), `${blogUri}${AuthorsEnum.YevheniiKarachevtsev}`],
		[blogButtons.nth(5), `${blogUri}${AuthorsEnum.DmytroDytiuk}`],
		[blogButtons.nth(6), `${blogUri}${AuthorsEnum.DmytroShtapauk}`],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.CustomDev));
	}
});

test('Check carousel arrows clicks in "Custom Software Development Process" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
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
