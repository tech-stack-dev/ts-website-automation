import { test } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";
import { baseDriverSteps } from "../../../base/step/BaseDriverSteps";
import ButtonByDataId from "../../../components/Button/ButtonByDataId";
import AboutUs from "../../../identifiers/AboutUs";
import Button from "../../../identifiers/Button";
import UrlProvider from "../../../providers/UrlProvider";
import { buttonSteps } from "../../../steps/components/Button/ButtonSteps";
import { containerSteps } from "../../../steps/components/Container/ContainerSteps";
import { carouselSteps } from "../../../steps/components/Carousel/CarouselSteps";
import ContainerBySelector from "../../../components/Container/ContainerBySelector";
import ContainerById from "../../../components/Container/ContainerById";

test.beforeEach(async (page) => {
    await baseDriverSteps.createsNewBrowser();
    await baseDriverSteps.goToUrl(UrlProvider.stagingCareerUrl());
    await buttonSteps.clickButton(ContainerBySelector, Button.NavigationTab_AboutUs);
});

test("Check that all the required sections are displayed on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.WeAreTechstackId, "01");
    await containerSteps.checkContainerTitle(AboutUs.WeAreTechstackId, "We are Techstack");
    await containerSteps.checkContainerNumber(AboutUs.OurHistory, "02");
    await containerSteps.checkContainerTitle(AboutUs.OurHistory, "Our History");
    await containerSteps.checkContainerNumber(AboutUs.OurAchievements, "03");
    await containerSteps.checkContainerTitle(AboutUs.OurAchievements, "Our Achievements");
    await containerSteps.checkContainerNumber(AboutUs.TechstackInGrows, "04");
    await containerSteps.checkContainerTitle(AboutUs.TechstackInGrows, "Techstack in Growth");
    await containerSteps.checkContainerNumber(AboutUs.TechstackRoles, "05");
    await containerSteps.checkContainerTitle(AboutUs.TechstackRoles, "Techstack roles");
    await containerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    await containerSteps.checkContainerTitle(AboutUs.EngineeringCulture, "Engineering Culture");
    await containerSteps.checkContainerNumber(AboutUs.SocialResponsibility, "07");
    await containerSteps.checkContainerTitle(AboutUs.SocialResponsibility, "Social Responsibility");
    await containerSteps.checkContainerNumber(AboutUs.CandidatePath, "08");
    await containerSteps.checkContainerTitle(AboutUs.CandidatePath, "Candidate Path");
});

test("Check that 'Our History' info carousel is displayed with content on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.OurHistory, "02");
    await containerSteps.checkContainerTitle(AboutUs.OurHistory, "Our History");
    await carouselSteps.checkInfoCarouselItem( "01","2014", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "02","2015", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "03","2016", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "04","2017", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "05","2018", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "06","2019", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "07","2020", AboutUs.OurHistory);
    await carouselSteps.checkInfoCarouselItem( "08","2021", AboutUs.OurHistory);
});

test("Check that 'Candidate Path' info carousel is displayed with content on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.CandidatePath, "08");
    await carouselSteps.checkInfoCarouselItem( "01", "CV", AboutUs.CandidatePath);
    await carouselSteps.checkInfoCarouselItem( "02", "Pre-screening", AboutUs.CandidatePath);
    await carouselSteps.checkInfoCarouselItem( "03", "Test task", AboutUs.CandidatePath);
    await carouselSteps.checkInfoCarouselItem( "04", "Tech expert review", AboutUs.CandidatePath);
    await carouselSteps.checkInfoCarouselItem( "05", "Tech expert interview", AboutUs.CandidatePath);
    await carouselSteps.checkInfoCarouselItem( "06", "Product owner interview", AboutUs.CandidatePath);
});

test("Check 'Engineering Culture' photo carousel on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    await carouselSteps.checkPhotosAmountInPhotoCarousel(5, AboutUs.EngineeringCulture, AboutUs.EngineeringCultureCarousel);
  
    await buttonSteps.isDisabled(ButtonByDataId, Button.Carousel_Prev, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await buttonSteps.isEnabled(ButtonByDataId,Button.Carousel_Next, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await buttonSteps.clickButton(ButtonByDataId,Button.Carousel_Next, 4, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
   
    await buttonSteps.isEnabled(ButtonByDataId, Button.Carousel_Prev, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await buttonSteps.isDisabled(ButtonByDataId,Button.Carousel_Next, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await buttonSteps.clickButton(ButtonByDataId,Button.Carousel_Prev, 4, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    
    await buttonSteps.isDisabled(ButtonByDataId, Button.Carousel_Prev, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await buttonSteps.isEnabled(ButtonByDataId,Button.Carousel_Next, await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
});

test("Check 'Techstack roles' contains required sections on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.TechstackRoles, "05");
    await containerSteps.checkContainerBlockTitle(AboutUs.Roles_Mentor, "Mentor", await containerSteps.getContainer(ContainerById, AboutUs.TechstackRoles));
    await containerSteps.checkContainerBlockTitle(AboutUs.Roles_TechExpert, "Tech Expert", await containerSteps.getContainer(ContainerById, AboutUs.TechstackRoles));
    await containerSteps.checkContainerBlockTitle(AboutUs.Roles_PreSaleExpert, "Pre-Sale Expert", await containerSteps.getContainer(ContainerById, AboutUs.TechstackRoles));
    await containerSteps.checkContainerBlockTitle(AboutUs.Roles_TeamLead, "Team Lead", await containerSteps.getContainer(ContainerById, AboutUs.TechstackRoles));
    await containerSteps.checkContainerBlockTitle(AboutUs.Roles_VPofFunction, "VP of Function", await containerSteps.getContainer(ContainerById, AboutUs.TechstackRoles));
});

test("Check 'Engineering Culture' contains required sections on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_TechClubs, "Tech clubs", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_Meetups, "Meetups", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_TechCompetitions, "Tech Competitions", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_Library, "Library", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_TraineeCamps, "Trainee Camps", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
    await containerSteps.checkContainerBlockTitle(AboutUs.EC_LoyaltyProgram, "Loyalty Program", await containerSteps.getContainer(ContainerById, AboutUs.EngineeringCulture));
});

test("Check 'Social Responsibility' contains required sections and carousel on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.SocialResponsibility, "07");
    await containerSteps.checkContainerBlockTitle(AboutUs.SR_Charity, "Charity", await containerSteps.getContainer(ContainerById, AboutUs.SocialResponsibility));
    await containerSteps.checkContainerBlockTitle(AboutUs.SR_EnvironmentalSafety, "Environmental Safety", await containerSteps.getContainer(ContainerById, AboutUs.SocialResponsibility));
    await containerSteps.checkContainerBlockTitle(AboutUs.SR_EducationSupport, "Education Support", await containerSteps.getContainer(ContainerById, AboutUs.SocialResponsibility));
    await carouselSteps.checkPhotosAmountInPhotoCarousel(5, AboutUs.SocialResponsibility, AboutUs.EngineeringCultureCarousel);
});

test("Check 'Apply Proposition' block in 'Candidate Path' section on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
    await containerSteps.checkContainerNumber(AboutUs.CandidatePath, "08");
    await containerSteps.checkContainerText(AboutUs.ApplyPositions, "Would you like to be a part of our team?Check out our open positions!", await containerSteps.getContainer(ContainerById, AboutUs.CandidatePath));
    await buttonSteps.clickButton(ButtonByDataId, AboutUs.ApplyNowButton, 1, await containerSteps.getContainer(ContainerById, AboutUs.ApplyPositions));
    await baseDriverSteps.checkUrl(UrlProvider.stagingCareerUrl());
    await buttonSteps.buttonContainsClassProperty(ContainerBySelector, Button.NavigationTab_Jobs, "active-nav-tab");
});

test.afterEach(async () => {
    await driver.closeDrivers();
})