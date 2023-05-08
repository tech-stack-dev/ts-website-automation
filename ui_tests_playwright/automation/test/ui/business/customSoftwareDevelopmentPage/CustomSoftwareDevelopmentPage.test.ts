import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import Button from '../../../../identifiers/Button';
import CustomSoftwareDevelopent from '../../../../identifiers/CustomSoftwareDevelopment';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test(`Check page title and 'Request a quote' buttons on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	await expect(driver.getByTestId(Container.Title)).toHaveText(
		'We are experts in the custom software development services'
	);
	const sections = [
		CustomSoftwareDevelopent.TopSection,
		CustomSoftwareDevelopent.TechnologyStack,
		CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess,
	];
	for (const section of sections) {
		expect(driver.getByTestId(section).getByTestId(Button.RequestAQuoteButton)).toBeVisible();
	}
});

test(`Check container titles and numbers on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{
			parentSection: CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct,
			items: [
				{number: '01', title: 'Product MVP Development'},
				{number: '02', title: 'Scaling Software Product Team and Processes'},
				{number: '03', title: 'Enterprise Software Development'},
				{number: '04', title: 'Industry-Specific Software Development'},
			],
		},
		{
			parentSection: CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits,
			items: [
				{number: '01', title: 'Retain clients'},
				{number: '02', title: 'Improve performance'},
				{number: '03', title: 'Unlock new opportunities'},
				{number: '04', title: 'Iterate fast'},
			],
		},
	];

	for (const section of testData) {
		section.items?.forEach(async function (value, i) {
			const item = driver
				.getByTestId(section.parentSection)
				.getByTestId(/ContainerSection/)
				.nth(i);
			await expect(item.getByTestId(Container.SectionTitle)).toHaveText(value.title);
			await expect(item.getByTestId(Container.SectionNumber)).toHaveText(value.number);
		});
	}
});

test(`Check section titles on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{
			parentSection: CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts,
			items: ['Tech Experts Team', 'Development Team', 'Management Team'],
			title: Container.SectionTitle,
		},
		{
			parentSection: CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment,
			items: ['Tech community', 'Ownership over products', 'Proven expertise'],
			// will be removed after fix on UI
			title: Container.SectionName,
		},
	];

	for (const section of testData) {
		section.items?.forEach(async function (value, i) {
			const item = driver
				.getByTestId(section.parentSection)
				.getByTestId(/SectionItem/)
				.nth(i);
			await expect(item.getByTestId(section.title)).toHaveText(value);
		});
	}
});

test(`Check cards in 'Custom development services we provide' section on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const cards = driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentServicesWeProvide).locator('.full-bordered-card');
	//.getByTestId(/ItemCard/);
	await expect(cards).toHaveCount(10);
	await expect(cards.nth(1)).not.toHaveAttribute('href',/(.*)/)
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('02')
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Front-End and Back-End development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Mobile development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('01')
	await expect(cards.nth(0)).toHaveAttribute('href','/services/mobile-development');
	await cards.nth(0).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.MobileDev));
});

test(`Check cards in 'Custocm development services we provide' section on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const cards = driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentServicesWeProvide).locator('.full-bordered-card');
	//.getByTestId(/ItemCard/);
	await expect(cards).toHaveCount(10);
	await expect(cards.nth(1)).not.toHaveAttribute('href',/(.*)/)
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('02')
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Front-End and Back-End development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Mobile development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('01')
	await expect(cards.nth(0)).toHaveAttribute('href','/services/mobile-development');
	// let pseudoArrowButtonState = parseInt(await cards.nth(0).evaluate("window.getComputedStyle(document.querySelector(\"a[data-id='MobileDevelopmentCard'].full-bordered-card\"),'::after').getPropertyValue('opacity');"));
	// await expect(pseudoArrowButtonState).toEqual(0);
	// await cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardTitle).hover({force:true});
	// pseudoArrowButtonState = parseInt(await cards.nth(0).evaluate("window.getComputedStyle(document.querySelector(\"a[data-id='MobileDevelopmentCard'].full-bordered-card\"),'::after').getPropertyValue('opacity');"));
	// await expect(pseudoArrowButtonState).toEqual(1);

	await cards.nth(0).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.MobileDev));
});

test(`Check the content switcher on the 'Technology stack' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const parent = await driver.getByTestId(CustomSoftwareDevelopent.TechnologyStack);
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_BackEnd)).toHaveClass(/active/);
	let activeContentSection = parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent).nth(0); // replce data-id on UI to readable
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSection)).toHaveCount(4);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(0)).toBeVisible();
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(3)).toBeVisible();

	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(0)).toHaveText('.NET Stack');
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem)).toHaveCount(11);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem).nth(0)).toHaveText('C#');
	
	// Check the AI&ML/Data science section
	await parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience).click();
	await expect(activeContentSection).toBeHidden();
	activeContentSection = parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent).nth(5); // AI&ML/Data science section
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience)).toHaveClass(/active/);
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_BackEnd)).not.toHaveClass(/active/);

	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSection)).toHaveCount(5);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(4)).toHaveText('Development environment');
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem)).toHaveCount(2);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem).nth(0)).toHaveText('OpenCV');
	
	await parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_FrontEnd).click();
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience)).not.toHaveClass(/active/);
	await expect(activeContentSection).toBeHidden();
	activeContentSection = parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent).nth(1); // AI&ML/Data science section
	await expect(activeContentSection).toBeVisible();
});


test(`Check the carousel in the 'Custom software development process' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{number: '01', title: 'Investigation'},
		{number: '02', title: 'Execution'},
		{number: '03', title: 'Performance'},
		{number: '04', title: 'Analysis'}
	]
	const parent = driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess);
	const infoItems = parent.getByTestId(CustomSoftwareDevelopent.InfoBlock);
	// Check content
	expect(infoItems).toHaveCount(4);

	testData?.forEach(async function (value, i) {
		const item = infoItems.nth(i)
		await expect(item).toBeVisible();
		await expect(item.getByTestId(CustomSoftwareDevelopent.InfoBlockItemTitle)).toHaveText(value.title);
		await expect(item.getByTestId(CustomSoftwareDevelopent.InfoBlockNumber)).toHaveText(value.number);
	});

	// Check buttons logic
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlLeftButton)).toHaveAttribute('data-disabled', 'true');
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlRightButton)).toHaveAttribute('data-disabled', 'false');
	// await parent.getByTestId(CustomSoftwareDevelopent.ControlRightButton).click({clickCount:3});
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlRightButton)).toHaveAttribute('data-disabled', 'true');
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlLeftButton)).toHaveAttribute('data-disabled', 'false');
	// await parent.getByTestId(CustomSoftwareDevelopent.ControlLeftButton).click({clickCount:3});
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlLeftButton)).toHaveAttribute('data-disabled', 'true');
	// await expect(parent.getByTestId(CustomSoftwareDevelopent.ControlRightButton)).toHaveAttribute('data-disabled', 'false');
	
});

test(`Check the member cards in the 'Custom software development experts' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{id:0,memberPhoto: 'img/servicesExperts/ivan-ieremenko.jpg', memberDescription: 'CEO, Software Architect,\nRuns critical initiatives that make products grow',memberName:'Ivan Ieremenko',memberLinkLinkedin:'https://www.linkedin.com/in/ivan-ieremenko/', memberLinkBlog: 'https://tech-stack.io/blog/author/ivan_ieremenko/', expectedBlogUrl: 'https://tech-stack.com/blog/author/ivan_ieremenko/',},
		{id:6,memberPhoto: 'img/servicesExperts/dmytro-shtapauk.jpg', memberDescription: 'Head of Account Management,\nDrives cross-functional process transformation',memberName:'Dmytro Shtapauk',memberLinkLinkedin:'https://www.linkedin.com/in/shtapauk/', memberLinkBlog: 'https://tech-stack.io/blog/author/dmytro_shtapauk/', expectedBlogUrl: 'https://tech-stack.com/blog/author/dmytro_shtapauk/',},
	]
	const cards = driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts).getByTestId(CustomSoftwareDevelopent.MemberItem);
	await expect(cards).toHaveCount(7);

	for(const member of testData){
		
		await expect(cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberPhoto)).toHaveAttribute('src',member.memberPhoto)
		await expect(cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberDescription)).toHaveText(member.memberDescription);
		await expect(cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberName)).toHaveText(member.memberName);
		await expect(cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberLinkLinkedin)).toHaveAttribute('href',member.memberLinkLinkedin);
		await expect(cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberLinkBlog)).toHaveAttribute('href',member.memberLinkBlog);

		const [newLIPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberLinkLinkedin).click(),
		]);
		expect(newLIPage.url()).toContain(member.memberLinkLinkedin);
		newLIPage.close();

		const [newBlogPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await cards.nth(member.id).getByTestId(CustomSoftwareDevelopent.MemberLinkBlog).click(),
		]);
		expect(newBlogPage.url()).toContain(member.expectedBlogUrl);
		newBlogPage.close();
	}
	});

test.afterEach(async () => {
	await driver.closeDrivers();
});
