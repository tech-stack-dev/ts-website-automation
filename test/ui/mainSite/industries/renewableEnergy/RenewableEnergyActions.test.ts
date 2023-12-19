import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import Buttons from '../../../../../identifiers/Buttons';
import RenewableEnergy from '../../../../../identifiers/mainSite/pages/industries/RenewableEnergy';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';
import ExternalSourceLinks from '../../../../../preconditionsData/links/ExternalSourceLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test(
	qase(
		5247,
		'Check redirect by source link in "Techstack in Numbers" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const techstackInNumbersContainer = driver.getByTestId(RenewableEnergy.TechstackInNumbers);
		const buttonDeloitte = techstackInNumbersContainer.getByTestId(MainSiteButtons.DeloitteSurvey);
		const testData = ExternalSourceLinks.Deloitte100PercentRenewablesPdf;

		const actualLink = await buttonDeloitte.getAttribute('href');
		expect(actualLink).toBe(testData);

		const [download] = await Promise.all([
			driver.Page.waitForEvent('download'), // remotely opens pdf viewer, not page
			buttonDeloitte.click(),
		]);
		expect(download.url()).toBe(testData);

		const checkPdfName = download.suggestedFilename().endsWith('DI_100-Percent-Renewables.pdf');
		expect(checkPdfName).toBe(true);
	}
);

test(
	qase(
		5242,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const theSolarEnergyContainer = driver.getByTestId(RenewableEnergy.CaseStudy);

		await theSolarEnergyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuiltIt).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.SolarEnergyDataPortal}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5322,
		'Check redirects by arrows in "Our Key Areas of Expertise in Renewable Energy" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const ourKeyAreasOfExpertiseContainer = driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise);
		const arrows = ourKeyAreasOfExpertiseContainer.getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
		}
	}
);

test(
	qase(
		5253,
		'Check redirect by "Clutch Review" button in "Why Choose Us?" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const whyChooseUsContainer = driver.getByTestId(RenewableEnergy.WhyChooseUs);

		const clutchReviewButton = whyChooseUsContainer.getByTestId(Buttons.Clutch);

		await baseDriverSteps.checkRedirectToPage(clutchReviewButton, ClutchReviewLinks.HenriYoki);
	}
);

test(
	qase(
		5295,
		'Check carousel arrows click in "How We Operate at Techstack" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const howWeOperateContainer = driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack);

		await baseDriverSteps.checkCarouselArrowsClick(howWeOperateContainer);
	}
);

test(
	qase(
		5265,
		'Check sections expanding and collapsing in "FAQ" container from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const faqContainer = driver.getByTestId(RenewableEnergy.Faq);
		const expectedNumberOfSections = 5;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5277,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Renewable Energy" page @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(RenewableEnergy.Info).getByTestId(MainSiteButtons.GetInTouch),
			driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ).getByTestId(MainSiteButtons.BookAMeeting),
			driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack).getByTestId(MainSiteButtons.TalkToAnExpert),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, RenewableEnergy.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
