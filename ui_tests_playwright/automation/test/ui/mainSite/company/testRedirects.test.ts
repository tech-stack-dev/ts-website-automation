import {test, expect} from '@playwright/test';
import AboutUs from '../../../../identifiers/mainSite/pages/company/AboutUs';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import UrlPath from '../../../../providers/UrlPath';
import Buttons from '../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/links/ExpertsLinkedInLinks';
import BigDataAndAnalytics from '../../../../identifiers/mainSite/pages/services/BigDataAndAnalytics';
import {ClutchReviewLinks} from '../../../../preconditionsData/links/ClutchReviewLinks';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import HomePage from '../../../../identifiers/mainSite/pages/HomePage';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
});

const max = 20;
for (let i = 0; i < max; i++) {
	test(`Test 1 redirects by LinkedIn buttons ${i}`, async () => {
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
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

			await baseDriverSteps.checkRedirectToPage(
				memberCard.getByTestId(Buttons.LinkedIn),
				expectedLinkedInLinks[i]
			);
		}
	});

	test(`Test 2 redirects by LinkedIn buttons ${i}`, async () => {
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
		const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
		const linkedInButtons = ourExpertsContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.OleksandrBezrukov],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.IvanYeremenko],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	});

	test(`Check redirect by "Clutch Review" buttons ${i}`, async () => {
		await baseDriverSteps.goToUrl(UrlProvider.webSiteUrl());
		const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

		const clutchReviewButton = partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviews);
		await clutchReviewButton.click();
		expect(await clutchReviewButton.getAttribute('class')).toContain('active');

		const clutchButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

		const buttonMap = new Map([
			[clutchButtons[0], ClutchReviewLinks.MarkBeare],
			[clutchButtons[1], ClutchReviewLinks.DerickDaily],
			[clutchButtons[2], ClutchReviewLinks.DarrenCody],
			[clutchButtons[3], ClutchReviewLinks.AnonymousMedicalDevice],
			[clutchButtons[4], ClutchReviewLinks.AnonymousPeerToPeer],
		]);

		for (const [button, url] of buttonMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
