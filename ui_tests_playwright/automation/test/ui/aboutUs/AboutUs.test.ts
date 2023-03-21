import {expect, test} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import ButtonByDataId from '../../../components/Button/ButtonByDataId';
import AboutUs from '../../../identifiers/AboutUs';
import Button from '../../../identifiers/Button';
import UrlProvider from '../../../providers/UrlProvider';
import {containerSteps} from '../../../steps/components/Container/ContainerSteps';
import {carouselSteps} from '../../../steps/components/Carousel/CarouselSteps';
import ContainerById from '../../../components/Container/ContainerById';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Button.NavigationTab_AboutUs).click();
});

test('Check that all the required sections are displayed on the AboutUs page @Regression @AboutUs @TSWEB-150', async () => {
	let sectionList = [
		{
			parent: AboutUs.WeAreTechstackId,
			title: AboutUs.WeAreTechstackTitle,
			expectedText: 'We are \nTechstack',
		},
		{
			parent: AboutUs.WeAreTechstackId,
			title: AboutUs.WeAreTechstackNumber,
			expectedText: '01',
		},
		{
			parent: AboutUs.OurHistoryId,
			title: AboutUs.OurHistoryTitle,
			expectedText: 'Our History',
		},
		{
			parent: AboutUs.OurHistoryId,
			title: AboutUs.OurHistoryNumber,
			expectedText: '02',
		},
		{
			parent: AboutUs.OurAchievementsId,
			title: AboutUs.OurAchievementsTitle,
			expectedText: 'Our \nAchievements',
		},
		{
			parent: AboutUs.OurAchievementsId,
			title: AboutUs.OurAchievementsNumber,
			expectedText: '03',
		},
		{
			parent: AboutUs.TechstackInGrowsId,
			title: AboutUs.TechstackInGrowsTitle,
			expectedText: 'Techstack \nin Growth',
		},
		{
			parent: AboutUs.TechstackInGrowsId,
			title: AboutUs.TechstackInGrowsNumber,
			expectedText: '04',
		},
		{
			parent: AboutUs.TechstackRolesId,
			title: AboutUs.TechstackRolesTitle,
			expectedText: 'Techstack roles',
		},
		{
			parent: AboutUs.TechstackRolesId,
			title: AboutUs.TechstackRolesNumber,
			expectedText: '05',
		},
		{
			parent: AboutUs.EngineeringCultureId,
			title: AboutUs.EngineeringCultureTitle,
			expectedText: 'Engineering Culture',
		},
		{
			parent: AboutUs.EngineeringCultureId,
			title: AboutUs.EngineeringCultureNumber,
			expectedText: '06',
		},
		{
			parent: AboutUs.SocialResponsibilityId,
			title: AboutUs.SocialResponsibilityTitle,
			expectedText: 'Social Responsibility',
		},
		{
			parent: AboutUs.SocialResponsibilityId,
			title: AboutUs.SocialResponsibilityNumber,
			expectedText: '07',
		},
		{
			parent: AboutUs.CandidatePathId,
			title: AboutUs.CandidatePathTitle,
			expectedText: 'Candidate Path',
		},
		{
			parent: AboutUs.CandidatePathId,
			title: AboutUs.CandidatePathNumber,
			expectedText: '08',
		},
	];

	for (let section of sectionList) {
		await expect(
			await driver.getByTestId(
				section.title,
			//	await driver.getByTestId(section.parent)
			)
		).toHaveText(section.expectedText);
	}
});

test('Check the content is info carousels on the AboutUs page @Regression @AboutUs @TSWEB-150', async () => {
	await containerSteps.checkContainerNumber(AboutUs.OurHistoryId, '02');

	let carouselItemList = [
		{counter: '01', title: '2014', parent: AboutUs.OurHistoryId},
		{counter: '02', title: '2015', parent: AboutUs.OurHistoryId},
		{counter: '03', title: '2016', parent: AboutUs.OurHistoryId},
		{counter: '04', title: '2017', parent: AboutUs.OurHistoryId},
		{counter: '05', title: '2018', parent: AboutUs.OurHistoryId},
		{counter: '06', title: '2019', parent: AboutUs.OurHistoryId},
		{counter: '07', title: '2020', parent: AboutUs.OurHistoryId},
		{counter: '08', title: '2021', parent: AboutUs.OurHistoryId},

		{counter: '01', title: 'CV', parent: AboutUs.CandidatePathId},
		{counter: '02',	title: 'Pre-screening',	parent: AboutUs.CandidatePathId},
		{counter: '03', title: 'Test task', parent: AboutUs.CandidatePathId},
		{counter: '04',	title: 'Tech expert review', parent: AboutUs.CandidatePathId},
		{counter: '05',	title: 'Tech expert interview',	parent: AboutUs.CandidatePathId},
		{counter: '06',	title: 'Product owner interview',parent: AboutUs.CandidatePathId,}
	];

	for (let item of carouselItemList) {
		await carouselSteps.checkInfoCarouselItem(
			item.counter,
			item.title,
			item.parent
		);
	}
});

test("Check 'Engineering Culture' photo carousel on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
	await carouselSteps.checkPhotosAmountInPhotoCarousel(
		5,
		AboutUs.EngineeringCultureCarousel
	);

	await containerSteps.isDisabled(
		ButtonByDataId,
		Button.Carousel_Prev,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
	await containerSteps.isEnabled(
		ButtonByDataId,
		Button.Carousel_Next,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
	await containerSteps.clickContainer(
		ButtonByDataId,
		Button.Carousel_Next,
		4,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);

	await containerSteps.isEnabled(
		ButtonByDataId,
		Button.Carousel_Prev,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
	await containerSteps.isDisabled(
		ButtonByDataId,
		Button.Carousel_Next,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
	await containerSteps.clickContainer(
		ButtonByDataId,
		Button.Carousel_Prev,
		4,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);

	await containerSteps.isDisabled(
		ButtonByDataId,
		Button.Carousel_Prev,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
	await containerSteps.isEnabled(
		ButtonByDataId,
		Button.Carousel_Next,
		await carouselSteps.getCarousel(AboutUs.EngineeringCultureCarousel)
	);
});

test("Check 'Techstack roles' contains required sections on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
	
	let expectedItems = [
		{id: AboutUs.Roles_Mentor,name:'Mentor',parent: AboutUs.TechstackRolesId},
		{id: AboutUs.Roles_TechExpert,name:'Tech Expert',parent: AboutUs.TechstackRolesId},
		{id: AboutUs.Roles_PreSaleExpert,name:'Pre-Sale Expert',parent: AboutUs.TechstackRolesId},
		{id: AboutUs.Roles_TeamLead,name:'Team Lead',parent: AboutUs.TechstackRolesId},
		{id: AboutUs.Roles_VPofFunction,name:'VP of Function',parent: AboutUs.TechstackRolesId},
 
		{id: AboutUs.EC_TechClubs,name:'Tech clubs', parent: AboutUs.EngineeringCultureId},
		{id: AboutUs.EC_Meetups,name:'Meetups', parent: AboutUs.EngineeringCultureId},
		{id: AboutUs.EC_TechCompetitions,name:'Tech Competitions', parent: AboutUs.EngineeringCultureId},
		{id: AboutUs.EC_Library,name:'Library', parent: AboutUs.EngineeringCultureId},
		{id: AboutUs.EC_TraineeCamps,name:'Trainee Camps', parent: AboutUs.EngineeringCultureId},
		{id: AboutUs.EC_LoyaltyProgram,name:'Loyalty Program', parent: AboutUs.EngineeringCultureId},
 
		{id: AboutUs.SR_Charity,name:'Charity', parent: AboutUs.SocialResponsibilityId},
		{id: AboutUs.SR_EnvironmentalSafety,name:'Environmental Safety', parent: AboutUs.SocialResponsibilityId},
		{id: AboutUs.SR_EducationSupport,name:'Education Support', parent: AboutUs.SocialResponsibilityId},
	];

	for(let item of expectedItems){

	await containerSteps.checkContainerBlockTitle(
		item.id,
		item.name,
		await containerSteps.getContainer(
			ContainerById,
			item.parent))
	}
});

test("Check 'Apply Proposition' block in 'Candidate Path' section on the AboutUs page @Regression @AboutUs @TSWEB-150", async () => {
	
	await containerSteps.checkContainerText(
		AboutUs.ApplyPositions,
		'Would you like to be a part of our team?Check out our open positions!',
		await containerSteps.getContainer(
			ContainerById,
			AboutUs.CandidatePathId
		)
	);
	await driver.getByTestId(AboutUs.ApplyNowButton).click();
	await driver.Page.waitForNavigation({url: UrlProvider.careerUrl()});
	let classValue = await (
		await driver.getByTestId(Button.NavigationTab_Jobs).getAttribute('class'));
	expect(classValue).toContain("active-nav-tab");
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
