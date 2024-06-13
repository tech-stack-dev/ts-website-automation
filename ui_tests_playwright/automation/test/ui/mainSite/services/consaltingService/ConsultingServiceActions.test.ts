import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import ConsultingService from '../../../../../identifiers/mainSite/pages/services/ConsultingService';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import ExternalSourceLinks from '../../../../../preconditionsData/links/ExternalSourceLinks';
import Links from '../../../../../preconditionsData/links/Links';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test(
	qase(
		5116,
		'Check redirect by "Clutch Review" button in "Featured Case Study" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const featuredCaseStudyContainer = driver.getByTestId(ConsultingService.FeaturedCaseStudy);
		await baseDriverSteps.checkRedirectToPage(
			featuredCaseStudyContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.AnonymousMedicalDevice
		);
	}
);

test(
	qase(
		5121,
		'Check redirect by CTA button in "Featured Case Study" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const featuredCaseStudyContainer = driver.getByTestId(ConsultingService.FeaturedCaseStudy);

		await featuredCaseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.SoftDevTransformExistingSystem}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5133,
		'Check redirect by links in "Industries We Provide Consultancy To" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const industriesWeProvideContainer = driver.getByTestId(ConsultingService.IndustriesWeProvideConsultancyTo);

		const linksUrlMap = new Map([
			[
				industriesWeProvideContainer.getByTestId(MainSiteLinks.Healthcare),
				UrlProvider.urlBuilder(UrlPath.Healthcare),
			],
			[
				industriesWeProvideContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				industriesWeProvideContainer.getByTestId(MainSiteLinks.RenewableEnergy),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
			[
				industriesWeProvideContainer.getByTestId(MainSiteLinks.DigitalTransformation),
				UrlProvider.urlBuilder(UrlPath.DigitalTransform),
			],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.ConsultingServ));
		}
	}
);

test(
	qase(
		5147,
		'Check carousel arrow clicks in "Consulting Process" container from the "Consulting Service" page @desktop @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const consultingProcessContainer = driver.getByTestId(ConsultingService.ConsultingProcess);

		await baseDriverSteps.checkCarouselArrowsClick(consultingProcessContainer);
	}
);

test(
	qase(
		5127,
		'Check redirects by LinkedIn buttons in "Consulting Experts" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
		const linkedInButtons = consultingExpertsContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.VitaliiDolotov],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.IvanYeremenko],
			[linkedInButtons.nth(4), ExpertsLinkedInLinks.DmytroDytiuk],
			[linkedInButtons.nth(5), ExpertsLinkedInLinks.DmytroShtapauk],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5173,
		'Check redirects by Blog buttons in "Consulting Experts" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697 TSWEB-1061'
	),
	async () => {
		const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
		const blogButtons = consultingExpertsContainer.getByTestId(Buttons.Blog);
		const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);

		const buttonUrlMap = new Map([
			[blogButtons.nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
			[blogButtons.nth(1), `${blogUri}${AuthorsEnum.YevheniiKarachevtsev}`],
			[blogButtons.nth(2), `${blogUri}${AuthorsEnum.VitaliiDolotov}`],
			[blogButtons.nth(3), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
			[blogButtons.nth(4), `${blogUri}${AuthorsEnum.DmytroDytiuk}`],
			[blogButtons.nth(5), `${blogUri}${AuthorsEnum.DmytroShtapauk}`],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.ConsultingServ));
		}
	}
);

test(
	qase(
		5140,
		'Check redirects by links in "Our Approach" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);

		const linkUrlMap = new Map([
			[ourApproachContainer.getByTestId(MainSiteLinks.Nuget), Links.Nuget],
			[ourApproachContainer.getByTestId(MainSiteLinks.ScrumOrg), ExternalSourceLinks.ScrumOrg],
		]);

		for (const [link, url] of linkUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url);
		}
	}
);

test(
	qase(
		5153,
		'Check redirect by "Clutch Review" button in "Our Approach" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);
		await baseDriverSteps.checkRedirectToPage(
			ourApproachContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.AnonymousVehicle
		);
	}
);

test(
	qase(
		5254,
		'Check redirects by arrows in "Related Services" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
		const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
		const arrowUrlMap = new Map([
			[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
			[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[containerSection.nth(7).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.ConsultingServ));
		}
	}
);

test(
	qase(
		5162,
		'Check sections expanding and collapsing in "FAQ" container from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697'
	),
	async () => {
		const faqContainer = driver.getByTestId(ConsultingService.Faq);
		const expectedNumberOfSections = 5;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5168,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Consulting Service" page @desktop @mobile @Regression @ConsultingService @TSWEB-697 @TSWEB-1181'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(ConsultingService.Info).getByTestId(MainSiteButtons.RequestAQuote),
			driver
				.getByTestId(ConsultingService.IndustriesWeProvideConsultancyTo)
				.getByTestId(MainSiteButtons.GetAQuote),
			// driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(MainSiteButtons.RequestAQuote), // Uncomment after fix
			driver.getByTestId(ConsultingService.ConsultingExperts).getByTestId(MainSiteButtons.ScheduleACall),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, ConsultingService.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
