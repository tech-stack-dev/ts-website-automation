import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import BaseDriverSteps from "../../base/step/BaseDriverSteps";
import ButtonByDataId from "../../components/Button/ButtonByDataId";
import AboutUs from "../../identifiers/AboutUs";
import Button from "../../identifiers/Button";
import UrlProvider from "../../providers/UrlProvider";
import ButtonSteps from "../../steps/components/Button/ButtonSteps";
import ContainerSteps from "../../steps/components/Container/ContainerSteps";
import CarouselSteps from "../../steps/components/Carousel/CarouselSteps";
import InfoBlockSteps from "../../steps/components/StyledComponents/InfoBlockSteps";

test.beforeEach(async () => {
    await BaseDriverSteps.createsNewBrowser();
    await BaseDriverSteps.goToUrl(UrlProvider.webSiteUrl());
    await ButtonSteps.clickButton(ButtonByDataId, Button.NavigationTab_AboutUs);
});

test("Check that all the required sections are displayed on the AboutUs page", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.WeAreTechstackId, "01");
    await ContainerSteps.checkContainerTitle(AboutUs.WeAreTechstackId, "We are Techstack");
    await ContainerSteps.checkContainerNumber(AboutUs.OurHistory, "02");
    await ContainerSteps.checkContainerTitle(AboutUs.OurHistory, "Our History");
    await ContainerSteps.checkContainerNumber(AboutUs.OurAchievements, "03");
    await ContainerSteps.checkContainerTitle(AboutUs.OurAchievements, "Our Achievements");
    await ContainerSteps.checkContainerNumber(AboutUs.TechstackInGrows, "04");
    await ContainerSteps.checkContainerTitle(AboutUs.TechstackInGrows, "Techstack in Growth");
    await ContainerSteps.checkContainerNumber(AboutUs.TechstackRoles, "05");
    await ContainerSteps.checkContainerTitle(AboutUs.TechstackRoles, "Techstack roles");
    await ContainerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    await ContainerSteps.checkContainerTitle(AboutUs.EngineeringCulture, "Engineering Culture");
    await ContainerSteps.checkContainerNumber(AboutUs.SocialResponsibility, "07");
    await ContainerSteps.checkContainerTitle(AboutUs.SocialResponsibility, "Social Responsibility");
    await ContainerSteps.checkContainerNumber(AboutUs.CandidatePath, "08");
    await ContainerSteps.checkContainerTitle(AboutUs.CandidatePath, "Candidate Path");
});

test("Check that 'Our History' info carousel is displayed with content on the AboutUs page", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.OurHistory, "02");
    await ContainerSteps.checkContainerTitle(AboutUs.OurHistory, "Our History");
    await CarouselSteps.checkInfoCarouselItem( "01","2014", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "02","2015", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "03","2016", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "04","2017", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "05","2018", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "06","2019", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "07","2020", AboutUs.OurHistory);
    await CarouselSteps.checkInfoCarouselItem( "08","2021", AboutUs.OurHistory);
});

test("Check that 'Candidate Path' info carousel is displayed with content on the AboutUs page", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.CandidatePath, "08");
    await CarouselSteps.checkInfoCarouselItem( "01", "CV", AboutUs.CandidatePath);
    await CarouselSteps.checkInfoCarouselItem( "02", "Pre-screening", AboutUs.CandidatePath);
    await CarouselSteps.checkInfoCarouselItem( "03", "Test task", AboutUs.CandidatePath);
    await CarouselSteps.checkInfoCarouselItem( "04", "Tech expert review", AboutUs.CandidatePath);
    await CarouselSteps.checkInfoCarouselItem( "05", "Tech expert interview", AboutUs.CandidatePath);
    await CarouselSteps.checkInfoCarouselItem( "06", "Product owner interview", AboutUs.CandidatePath);
});

test("Check 'Engineering Culture' photo carousel on the AboutUs page", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    await CarouselSteps.checkPhotosAmountInPhotoCarousel(5, AboutUs.EngineeringCulture, AboutUs.EngineeringCultureCarousel);
  
    // await CarouselSteps.checkPhotoImageInCarousel(AboutUs.EngineeringCultureCarousel, "AboutUsEC.Photo1.png")
    await ButtonSteps.isDisabled(ButtonByDataId, "CarouselPrevButton-ControlButtonsPrev", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await ButtonSteps.isEnabled(ButtonByDataId,"CarouselNextButton-ControlButtonsNext", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel))
    await ButtonSteps.clickButton(ButtonByDataId,"CarouselNextButton-ControlButtonsNext", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel), 4, true)
   // await CarouselSteps.checkPhotoImageInCarousel(AboutUs.EngineeringCultureCarousel, "AboutUsEC.Photo1.png")
   
    await ButtonSteps.isEnabled(ButtonByDataId, "CarouselPrevButton-ControlButtonsPrev", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await ButtonSteps.isDisabled(ButtonByDataId,"CarouselNextButton-ControlButtonsNext", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel))
    await ButtonSteps.clickButton(ButtonByDataId,"CarouselPrevButton-ControlButtonsPrev", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel), 4, true)
   // await CarouselSteps.checkPhotoImageInCarousel(AboutUs.EngineeringCultureCarousel, "AboutUsEC.Photo1.png")
    await ButtonSteps.isDisabled(ButtonByDataId, "CarouselPrevButton-ControlButtonsPrev", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel));
    await ButtonSteps.isEnabled(ButtonByDataId,"CarouselNextButton-ControlButtonsNext", await CarouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel))
   
});

test("Check 'Techstack roles' contains required points on the AboutUs page", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.EngineeringCulture, "06");
    
// Techstack roles
    //Mentor
//Engineering Culture
    // Tech clubs   
// Social Responsibility
    //Charity
    //CAROUSEL

//Would you like to be a part of our team?
// Check out our open positions! - link    
test.afterEach(async () => {
    await driver.closeDrivers();
})