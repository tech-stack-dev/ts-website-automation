import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import Navigation from '../../../../identifiers/career/Navigation';
import AboutUsCareer from '../../../../identifiers/career/pages/AboutUsCareer';
import {qase} from 'playwright-qase-reporter/dist/playwright';

let clicksAmountToDisableNextButton;

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_AboutUs).click();
});

test(
	qase(
		4744,
		'Check the section title and number from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		await expect(driver.getByTestId(AboutUsCareer.WeAreTechstackTitle)).toHaveText('We are \nTechstack');
		await expect(driver.getByTestId(AboutUsCareer.WeAreTechstackNumber)).toHaveText('01');

		await expect(driver.getByTestId(AboutUsCareer.OurHistoryTitle)).toHaveText('Our History');
		await expect(driver.getByTestId(AboutUsCareer.OurHistoryNumber)).toHaveText('02');

		await expect(driver.getByTestId(AboutUsCareer.OurAchievementsTitle)).toHaveText('Our \nAchievements');
		await expect(driver.getByTestId(AboutUsCareer.OurAchievementsNumber)).toHaveText('03');

		await expect(driver.getByTestId(AboutUsCareer.TechstackInGrowsTitle)).toHaveText('Techstack \nin Growth');
		await expect(driver.getByTestId(AboutUsCareer.TechstackInGrowsNumber)).toHaveText('04');

		await expect(driver.getByTestId(AboutUsCareer.TechstackRolesTitle)).toHaveText('Techstack roles');
		await expect(driver.getByTestId(AboutUsCareer.TechstackRolesNumber)).toHaveText('05');

		await expect(driver.getByTestId(AboutUsCareer.EngineeringCultureTitle)).toHaveText('Engineering Culture');
		await expect(driver.getByTestId(AboutUsCareer.EngineeringCultureNumber)).toHaveText('06');

		await expect(driver.getByTestId(AboutUsCareer.SocialResponsibilityTitle)).toHaveText('Social Responsibility');
		await expect(driver.getByTestId(AboutUsCareer.SocialResponsibilityNumber)).toHaveText('07');

		await expect(driver.getByTestId(AboutUsCareer.CandidatePathTitle)).toHaveText('Candidate Path');
		await expect(driver.getByTestId(AboutUsCareer.CandidatePathNumber)).toHaveText('08');
	}
);

test(
	qase(
		4745,
		'Check the "Our History" carousel from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		const carousel = driver.getByTestId(AboutUsCareer.OurHistoryCarousel);

		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(0)).toContainText('01 2014');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(1)).toContainText('02 2015');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(2)).toContainText('03 2016');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(3)).toContainText('04 2017');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(4)).toContainText('05 2018');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(5)).toContainText('06 2019');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(6)).toContainText('07 2020');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(7)).toContainText('08 2021');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(8)).toContainText('09 2022');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(9)).toContainText('10 2023');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(10)).toContainText('11 2024');
	}
);

test(
	qase(
		4748,
		'Check the buttons of the info carousel from the "AboutUs" page @desktop @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		const ourHistoryCarousel = driver.getByTestId(AboutUsCareer.OurHistoryCarousel);
		const ourHistotyPrevButton = ourHistoryCarousel.getByTestId(AboutUsCareer.CarouselPrevButton);
		const ourHistoryNextButton = ourHistoryCarousel.getByTestId(AboutUsCareer.CarouselNextButton);

		await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'true');
		await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'false');

		await ourHistoryNextButton.click();

		await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'false');

		clicksAmountToDisableNextButton = 8;
		await ourHistoryNextButton.click({clickCount: clicksAmountToDisableNextButton});

		await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'true');

		const candidateCarousel = driver.getByTestId(AboutUsCareer.CandidateCarousel);
		const candidatePrevButton = candidateCarousel.getByTestId(AboutUsCareer.CarouselPrevButton);
		const candidateNextButton = candidateCarousel.getByTestId(AboutUsCareer.CarouselNextButton);

		await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'true');
		await expect(candidateNextButton).toHaveAttribute('data-disabled', 'false');

		await candidateNextButton.click();

		await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(candidateNextButton).toHaveAttribute('data-disabled', 'false');

		clicksAmountToDisableNextButton = 4;
		await candidateNextButton.click({clickCount: clicksAmountToDisableNextButton});

		await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(candidateNextButton).toHaveAttribute('data-disabled', 'true');
	}
);
// locator should be updated with getByTestId
test(
	qase(
		4746,
		'Check the "Techstack roles", "Engineering Culture" and "Social Responsibility" containers from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		const techstackRoles = driver.Page.locator(`#${AboutUsCareer.TechstackRolesId}`);

		await expect(techstackRoles.locator(`#${AboutUsCareer.Roles_Mentor}`)).toContainText('Mentor');
		await expect(techstackRoles.locator(`#${AboutUsCareer.Roles_TechExpert}`)).toContainText('Tech Expert');
		await expect(techstackRoles.locator(`#${AboutUsCareer.Roles_PreSaleExpert}`)).toContainText('Pre-Sale Expert');
		await expect(techstackRoles.locator(`#${AboutUsCareer.Roles_TeamLead}`)).toContainText('Team Lead');
		await expect(techstackRoles.locator(`#${AboutUsCareer.Roles_VPofFunction}`)).toContainText('VP of Function');

		const engineeringCulture = driver.Page.locator(`#${AboutUsCareer.EngineeringCultureId}`);

		await expect(engineeringCulture.locator(`#${AboutUsCareer.EC_Meetups}`)).toContainText('Meetups');
		await expect(engineeringCulture.locator(`#${AboutUsCareer.EC_TechCompetitions}`)).toContainText(
			'Tech Competitions'
		);
		await expect(engineeringCulture.locator(`#${AboutUsCareer.EC_TraineeCamps}`)).toContainText('Trainee Camps');
		await expect(engineeringCulture.locator(`#${AboutUsCareer.EC_LoyaltyProgram}`)).toContainText(
			'Loyalty Program'
		);

		const socialResponsibility = driver.Page.locator(`#${AboutUsCareer.SocialResponsibilityId}`);

		await expect(socialResponsibility.locator(`#${AboutUsCareer.SR_Charity}`)).toContainText('Charity');
		await expect(socialResponsibility.locator(`#${AboutUsCareer.SR_EnvironmentalSafety}`)).toContainText(
			'Environmental Safety'
		);
		await expect(socialResponsibility.locator(`#${AboutUsCareer.SR_EducationSupport}`)).toContainText(
			'Education Support'
		);
	}
);

test(
	qase(
		4747,
		'Check the buttons of the photo carousel from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		const engineeringCultureCarousel = driver.getByTestId(AboutUsCareer.EngineeringCultureCarousel);
		const engineeringCulturePrevButton = engineeringCultureCarousel.getByTestId(AboutUsCareer.CarouselPrevButton);
		const engineeringCultureNextButton = engineeringCultureCarousel.getByTestId(AboutUsCareer.CarouselNextButton);

		await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'true');
		await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'false');

		await engineeringCultureNextButton.click();

		await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'false');

		clicksAmountToDisableNextButton = 3;
		await engineeringCultureNextButton.click({clickCount: clicksAmountToDisableNextButton});

		await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'true');

		const socialResponsibilityCarousel = driver.getByTestId(AboutUsCareer.SocialResponsibilityCarousel);
		const socialResponsibilityPrevButton = socialResponsibilityCarousel.getByTestId(
			AboutUsCareer.CarouselPrevButton
		);
		const socialResponsibilityNextButton = socialResponsibilityCarousel.getByTestId(
			AboutUsCareer.CarouselNextButton
		);

		await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'true');
		await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'false');

		await socialResponsibilityNextButton.click();

		await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'false');

		clicksAmountToDisableNextButton = 3;
		await socialResponsibilityNextButton.click({clickCount: clicksAmountToDisableNextButton});

		await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'false');
		await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'true');
	}
);

test(
	qase(
		4750,
		'Check the "Candidate Path" carousel from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'
	),
	async () => {
		const carousel = driver.getByTestId(AboutUsCareer.CandidateCarousel);

		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(0)).toContainText('01 CV');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(1)).toContainText('02 Pre-screening');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(2)).toContainText('03 Test task');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(3)).toContainText('04 Tech expert review');
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(4)).toContainText(
			'05 Tech expert interview'
		);
		await expect(carousel.getByTestId(AboutUsCareer.CarouselBlock).nth(5)).toContainText(
			'06 Product owner interview'
		);
	}
);
// locator should be updated with getByTestId
test(
	qase(4751, 'Check the "Apply" container from the "AboutUs" page @desktop @mobile @Regression @AboutUs @TSWEB-150'),
	async () => {
		await expect(driver.locator(`#${AboutUsCareer.ApplyTitle}`)).toContainText(
			`Want to make an impact?You're in the right place.Check out our open positions!`
		);

		await driver.getByTestId(AboutUsCareer.ApplyNowButton).click();
		await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
