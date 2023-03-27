import { expect, test } from '@playwright/test';
import { driver } from '../../../base/driver/Driver';
import { baseDriverSteps } from '../../../base/step/BaseDriverSteps';
import AboutUs from '../../../identifiers/AboutUs';
import Button from '../../../identifiers/Button';
import UrlProvider from '../../../providers/UrlProvider';

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
    await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
    await driver.getByTestId(Button.NavigationTab_AboutUs).click();
});

test("Check the section title and number from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    await expect(driver.getByTestId(AboutUs.WeAreTechstackTitle)).toHaveText('We are \nTechstack');
    await expect(driver.getByTestId(AboutUs.WeAreTechstackNumber)).toHaveText('01');

    await expect(driver.getByTestId(AboutUs.OurHistoryTitle)).toHaveText('Our History');
    await expect(driver.getByTestId(AboutUs.OurHistoryNumber)).toHaveText('02');

    await expect(driver.getByTestId(AboutUs.OurAchievementsTitle)).toHaveText('Our \nAchievements');
    await expect(driver.getByTestId(AboutUs.OurAchievementsNumber)).toHaveText('03');

    await expect(driver.getByTestId(AboutUs.TechstackInGrowsTitle)).toHaveText('Techstack \nin Growth');
    await expect(driver.getByTestId(AboutUs.TechstackInGrowsNumber)).toHaveText('04');

    await expect(driver.getByTestId(AboutUs.TechstackRolesTitle)).toHaveText('Techstack roles');
    await expect(driver.getByTestId(AboutUs.TechstackRolesNumber)).toHaveText('05');

    await expect(driver.getByTestId(AboutUs.EngineeringCultureTitle)).toHaveText('Engineering Culture');
    await expect(driver.getByTestId(AboutUs.EngineeringCultureNumber)).toHaveText('06');

    await expect(driver.getByTestId(AboutUs.SocialResponsibilityTitle)).toHaveText('Social Responsibility');
    await expect(driver.getByTestId(AboutUs.SocialResponsibilityNumber)).toHaveText('07');

    await expect(driver.getByTestId(AboutUs.CandidatePathTitle)).toHaveText('Candidate Path');
    await expect(driver.getByTestId(AboutUs.CandidatePathNumber)).toHaveText('08');
});

test("Check the 'Our History' carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let carosel = driver.getByTestId(AboutUs.OurHistoryCarosel);

    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(0)).toContainText('01 2014');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(1)).toContainText('02 2015');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(2)).toContainText('03 2016');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(3)).toContainText('04 2017');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(4)).toContainText('05 2018');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(5)).toContainText('06 2019');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(6)).toContainText('07 2020');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(7)).toContainText('08 2021');
});

test("Check the 'Candidate Path' carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let carosel = driver.getByTestId(AboutUs.CandidateCarosel);

    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(0)).toContainText('01 CV');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(1)).toContainText('02 Pre-screening');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(2)).toContainText('03 Test task');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(3)).toContainText('04 Tech expert review');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(4)).toContainText('05 Tech expert interview');
    await expect(carosel.getByTestId(AboutUs.CaroselBlock).nth(5)).toContainText('06 Product owner interview');
});

test("Check the 'Techstack roles', 'Engineering Culture' and 'Social Responsibility' blocks from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let techstackRoles = driver.Page.locator(`#${AboutUs.TechstackRolesId}`);

    await expect(techstackRoles.locator(`#${AboutUs.Roles_Mentor}`)).toContainText('Mentor');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_TechExpert}`)).toContainText('Tech Expert');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_PreSaleExpert}`)).toContainText('Pre-Sale Expert');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_TeamLead}`)).toContainText('Team Lead');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_VPofFunction}`)).toContainText('VP of Function');

    let engineeringCulture = driver.Page.locator(`#${AboutUs.EngineeringCultureId}`);

    await expect(engineeringCulture.locator(`#${AboutUs.EC_TechClubs}`)).toContainText('Tech clubs');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_Meetups}`)).toContainText('Meetups');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_TechCompetitions}`)).toContainText('Tech Competitions');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_Library}`)).toContainText('Library');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_LoyaltyProgram}`)).toContainText('Loyalty Program');

    let socialResponsibility = driver.Page.locator(`#${AboutUs.SocialResponsibilityId}`);

    await expect(socialResponsibility.locator(`#${AboutUs.SR_Charity}`)).toContainText('Charity');
    await expect(socialResponsibility.locator(`#${AboutUs.SR_EnvironmentalSafety}`)).toContainText('Environmental Safety');
    await expect(socialResponsibility.locator(`#${AboutUs.SR_EducationSupport}`)).toContainText('Education Support');
});

test("Check the redirect to the 'Jobs' block from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    await driver.getByTestId(AboutUs.ApplyNowButton).click();
    await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
});


test.afterEach(async () => {
    await driver.closeDrivers();
});
