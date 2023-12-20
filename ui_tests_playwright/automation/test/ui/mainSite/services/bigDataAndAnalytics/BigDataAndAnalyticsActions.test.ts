import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import BigDataAndAnalytics from '../../../../../identifiers/mainSite/pages/services/BigDataAndAnalytics';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
});

test(
	qase(
		4909,
		'Check redirect by CTA button in "Big Data Case Studies" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const bigDataCaseStudiesContainer = driver.getByTestId(BigDataAndAnalytics.BigDataCaseStudies);

		await bigDataCaseStudiesContainer.getByTestId(MainSiteButtons.ReadMoreAboutSolution).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.VideoBasedQualityControl}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4925,
		'Check redirect by links in "Industry-specific Big Data Solutions" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const industriesSpecificContainer = driver.getByTestId(BigDataAndAnalytics.IndustrySpecificBigDataSolutions);

		const linksUrlMap = new Map([
			[
				industriesSpecificContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				industriesSpecificContainer.getByTestId(MainSiteLinks.Healthcare),
				UrlProvider.urlBuilder(UrlPath.Healthcare),
			],
			[
				industriesSpecificContainer.getByTestId(MainSiteLinks.RenewableEnergy),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.BigData));
		}
	}
);

test(
	qase(
		4912,
		'Check redirect by "Clutch Review" button in "Why Choose Techstack’s Big Data Software Development Services?" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const whyChooseTechstackBigDataContainer = driver.getByTestId(
			BigDataAndAnalytics.WhyChooseTechstackBigDataServices
		);

		await baseDriverSteps.checkRedirectToPage(
			whyChooseTechstackBigDataContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.MarkBeare
		);
	}
);

test(
	qase(
		4918,
		'Check redirects by LinkedIn buttons in "Our Experts" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
		const linkedInButtons = ourExpertsContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.OleksandrBezrukov],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.IvanYeremenko],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToExternalSourceInNewTab(button, url);
		}
	}
);

test(
	qase(
		4956,
		'Check redirects by Blog buttons in "Our Experts" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693 @TSWEB-1061'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
		const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);
		const blogButtons = ourExpertsContainer.getByTestId(Buttons.Blog);

		const buttonUrlMap = new Map([
			[blogButtons.nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
			[blogButtons.nth(1), `${blogUri}${AuthorsEnum.YevheniiKarachevtsev}`],
			[blogButtons.nth(2), `${blogUri}${AuthorsEnum.OleksandrBezrukov}`],
			[blogButtons.nth(3), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.BigData));
		}
	}
);

test(
	qase(
		5012,
		'Check redirects by arrows in "Related Services" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(BigDataAndAnalytics.RelatedServices);
		const arrows = relatedServicesContainer.getByTestId(Container.Arrow);

		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.BigData));
		}
	}
);

test(
	qase(
		4930,
		'Check sections expanding and collapsing in "FAQ" container from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const faqContainer = driver.getByTestId(BigDataAndAnalytics.Faq);
		const expectedNumberOfSections = 4;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		4944,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Big Data & Analytics" page @Regression @BigDataAndAnalytics @TSWEB-693'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(BigDataAndAnalytics.Info).getByTestId(MainSiteButtons.RequestAQuote),
			driver
				.getByTestId(BigDataAndAnalytics.BigDataSoftwareDevelopmentWithTechstack)
				.getByTestId(MainSiteButtons.GetAConsultation),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, BigDataAndAnalytics.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
