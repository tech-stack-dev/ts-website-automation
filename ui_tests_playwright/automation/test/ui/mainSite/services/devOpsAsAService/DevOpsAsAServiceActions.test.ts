import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import {DevOpsAsAService} from '../../../../../identifiers/mainSite/pages/services/DevOpsAsAService';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DevOpsServ));
});

test(
	qase(
		4824,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(DevOpsAsAService.Info).getByTestId(MainSiteButtons.GetYouCustomDevOpsQuote),
			driver.getByTestId(DevOpsAsAService.LeverageDevOpsServices).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver
				.getByTestId(DevOpsAsAService.IndustriesWeServe)
				.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote),
			driver.getByTestId(DevOpsAsAService.OurExperts).getByTestId(MainSiteButtons.RequestAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, DevOpsAsAService.GetInTouch);
		}
	}
);

test(
	qase(
		4818,
		'Check redirect by "Clutch Review" button in "Success Stories" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const successStoriesContainer = driver.getByTestId(DevOpsAsAService.SuccessStories);

		await baseDriverSteps.checkRedirectToClutch(
			successStoriesContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.MarkBeare
		);
	}
);

test(
	qase(
		4834,
		'Check redirect by CTA button in "Success Stories" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const successStoriesContainer = driver.getByTestId(DevOpsAsAService.SuccessStories);

		await successStoriesContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.IntegrationManyMonolithSystems}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4873,
		'Check redirect by links in "Industries We Serve" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(DevOpsAsAService.IndustriesWeServe);
		const sections = industriesWeServeContainer.getByTestId(Container.ContainerSection);

		const linksUrlMap = new Map([
			[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
			[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
			[
				sections.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				sections.getByTestId(MainSiteLinks.DigitalTransformation),
				UrlProvider.urlBuilder(UrlPath.DigitalTransform),
			],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.DevOpsServ));
		}
	}
);

test(
	qase(
		4841,
		'Check redirect by "Clutch Review" button in "Our Approach to DevOps" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(DevOpsAsAService.OurApproach);

		await baseDriverSteps.checkRedirectToClutch(
			ourApproachContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.MarkBeare
		);
	}
);

test(
	qase(
		4848,
		'Check redirects by LinkedIn buttons in "Our DevOps Experts" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(DevOpsAsAService.OurExperts);
		const linkedInButtons = ourExpertsContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.DmytroGamanenko],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.KyryloMasiuk],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.AndriiDumych],
			[linkedInButtons.nth(4), ExpertsLinkedInLinks.SerhiiYevdokymenko],
			[linkedInButtons.nth(5), ExpertsLinkedInLinks.DmytroPakki],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		4892,
		'Check redirects by Blog buttons in "Our DevOps Experts" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136 @TSWEB-1061'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(DevOpsAsAService.OurExperts);
		const blogButtons = ourExpertsContainer.getByTestId(Buttons.Blog);
		const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);

		const buttonUrlMap = new Map([
			[blogButtons.nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
			[blogButtons.nth(1), `${blogUri}${AuthorsEnum.DmytroGamanenko}`],
			[blogButtons.nth(2), `${blogUri}${AuthorsEnum.AndriiDumych}`],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.DevOpsServ));
		}
	}
);

test(
	qase(
		4964,
		'Check redirects by arrows in "Related Services" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(DevOpsAsAService.RelatedServices);
		const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
		const arrowUrlMap = new Map([
			[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
			[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.DevOpsServ));
		}
	}
);

test(
	qase(
		4910,
		'Check sections expanding and collapsing in "FAQ" container from the "DevOps as a Service" page @desktop @mobile @Regression @DevOpsAsAService @TSWEB-1136'
	),
	async () => {
		const faqContainer = driver.getByTestId(DevOpsAsAService.Faq);
		const expectedNumberOfSections = 10;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
