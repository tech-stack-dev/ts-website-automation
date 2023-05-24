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

test("Check the section title and number from the 'Custom software development' block @Regression @CustomSoftwareDevelopent @TSWEB-672", async () => {
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('01');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Custom software development for your product');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentServicesWeProvide).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('02');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentServicesWeProvide).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Custom\ndevelopment\nservices we provide');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.TechnologyStack).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('03');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.TechnologyStack).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Technology\nstack');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('04');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Custom software development benefits');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('05');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Custom software development process');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('06');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Custom software\ndevelopment experts');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CaseStudies).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('07');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.CaseStudies).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Case studies');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('08');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Our approach \nto software \ndevelopment');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.Faq).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('09');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.Faq).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('FAQ');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.RelatedArticles).getByTestId(Container.ContainerNumber).nth(0)).toHaveText('10');
	await expect(driver.getByTestId(CustomSoftwareDevelopent.RelatedArticles).getByTestId(Container.ContainerTitle).nth(0)).toHaveText('Related \narticles');
	
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

test(`Check section titles in table on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{
			parentSection: CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts,
			items: ['Tech Experts Team', 'Development Team', 'Management Team'],
			title: Container.SectionTitle,
		},
		{
			parentSection: CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment,
			items: ['Tech community', 'Ownership over products', 'Proven expertise'],
			// // will be removed after fix on UI
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
	await expect(cards).toHaveCount(10);
	await expect(cards.nth(1)).not.toHaveAttribute('href',/(.*)/)
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('02')
	await expect(cards.nth(1).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Front-End and Back-End development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardTitle)).toHaveText('Mobile development')
	await expect(cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardNumber)).toHaveText('01')
	await expect(cards.nth(0)).toHaveAttribute('href','/services/mobile-development');
	const script = `window.getComputedStyle(document.querySelector("a[data-id='MobileDevelopmentCard'].full-bordered-card"),'::after').getPropertyValue('opacity');`
	let pseudoArrowButtonState = parseInt(await cards.nth(0).evaluate(script));
	expect(pseudoArrowButtonState).toEqual(0);
	await cards.nth(0).getByTestId(CustomSoftwareDevelopent.CardTitle).hover();
	await new Promise(resolve => setTimeout(resolve, 1000)); // delay for element property rendering
	pseudoArrowButtonState = parseInt(await cards.nth(0).evaluate(script));
	expect(pseudoArrowButtonState).toEqual(1);

	await cards.nth(0).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.MobileDev));
});

test(`Check the content switcher on the 'Technology stack' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const parent = driver.getByTestId(CustomSoftwareDevelopent.TechnologyStack);
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_BackEnd)).toHaveClass(/active/);
	let activeContentSection = parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent_BackEnd);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSection)).toHaveCount(4);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(0)).toBeVisible();
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(3)).toBeVisible();

	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(0)).toHaveText('.NET Stack');
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem)).toHaveCount(11);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem).nth(0)).toHaveText('C#');
	
	// Check the AI&ML/Data science section
	await parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience).click();
	await expect(activeContentSection).toBeHidden();
	activeContentSection = parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent_AiMlDataScience);
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience)).toHaveClass(/active/);
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_BackEnd)).not.toHaveClass(/active/);
	
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSection)).toHaveCount(5);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionTitle).nth(4)).toHaveText('Development environment');
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem)).toHaveCount(2);
	await expect(activeContentSection.getByTestId(CustomSoftwareDevelopent.ContentSectionList).nth(0).getByTestId(CustomSoftwareDevelopent.ContentSectionItem).nth(0)).toHaveText('OpenCV');
	
	await parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_FrontEnd).click();
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherButton_AiMlDataScience)).not.toHaveClass(/active/);
	await expect(activeContentSection).toBeHidden();
	await expect(parent.getByTestId(CustomSoftwareDevelopent.ContentSwitcherContent_FrontEnd)).toBeVisible();
});


test(`Check the carousel in the 'Custom software development process' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{number: '01', title: 'Investigation'},
		{number: '02', title: 'Execution'},
		{number: '03', title: 'Performance'},
		{number: '04', title: 'Analysis'}
	]
	const parent = driver.getByTestId(CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess);
	const infoItems = await parent.getByTestId(CustomSoftwareDevelopent.InfoBlock);
	// Check content
	expect(infoItems).toHaveCount(4);

	testData?.forEach(async function (value, i) {
		const item = infoItems.nth(i)
		await expect(item).toBeVisible();
		await expect(item.getByTestId(CustomSoftwareDevelopent.InfoBlockItemTitle)).toHaveText(value.title);
		await expect(item.getByTestId(CustomSoftwareDevelopent.InfoBlockNumber)).toHaveText(value.number);
	});

	const leftButton = parent.getByTestId(CustomSoftwareDevelopent.ControlLeftButton);
	const rightButton = parent.getByTestId(CustomSoftwareDevelopent.ControlRightButton);
	// Check buttons logic
	await expect(leftButton).toHaveAttribute('data-disabled', 'true');
	await expect(rightButton).toHaveAttribute('data-disabled', 'false');

	// ######some trouble with carousel button click.####### 

	// await driver.getByTestId(CustomSoftwareDevelopent.ControlRightButton).click({clickCount:3, timeout:3000, force:true});
	

	// // await expect(rightButton).toHaveAttribute('data-disabled', 'false');
	// // await expect(leftButton).toHaveAttribute('data-disabled', 'false');
	
	// await expect(rightButton).toHaveAttribute('data-disabled', 'true');
	// await expect(leftButton).toHaveAttribute('data-disabled', 'false');
	
	// await leftButton.click({clickCount:3});
	// await expect(leftButton).toHaveAttribute('data-disabled', 'true');
	// await expect(rightButton).toHaveAttribute('data-disabled', 'false');
	
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

	test(`Check the 'Case Studies' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
		const testData = [
			{id:0, сaseDomainName:'Application software', сaseName:' Consulting test 1 (1) '},
			{id:1, сaseDomainName:'Business automation', сaseName:' Some case study (1) '},
			{id:2, сaseDomainName:'Application software', сaseName:' Consulting test 1 '},
		];
		const caseCards = driver.getByTestId(CustomSoftwareDevelopent.CaseStudies).getByTestId(CustomSoftwareDevelopent.CaseCard);

		for(const caseStudy of testData){
			const actualCard = caseCards.nth(caseStudy.id);
			await expect(actualCard.getByTestId(CustomSoftwareDevelopent.CaseDomainName)).toHaveText(caseStudy.сaseDomainName);
			await expect(actualCard.getByTestId(CustomSoftwareDevelopent.CaseName)).toHaveText(caseStudy.сaseName);
		}
	});

	test(`Check the award cards in 'Our approach to software development' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
		const testData = [
			{id:0, alt:'Award-1', src:'img/awards-logos-yellow/upwork.png'},
			{id:5, alt:'Award-6', src:'img/awards-logos-yellow/software-testing-companies.png'},
		];
		const actualAwardCardImages = driver.getByTestId(CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment).getByTestId(CustomSoftwareDevelopent.AwardCardImage);

		for(const awardCardImage of testData){
			const actualCard = actualAwardCardImages.nth(awardCardImage.id);
			await expect(actualCard).toHaveAttribute('alt',awardCardImage.alt);
			await expect(actualCard).toHaveAttribute('src',awardCardImage.src);
		}
	});
	
	test(`Check the award cards and reviews in 'Our approach to software development' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
		const expectedAwards = [
			{id:0, alt:'Award-1', src:'img/awards-logos-yellow/upwork.png'},
			{id:5, alt:'Award-6', src:'img/awards-logos-yellow/software-testing-companies.png'},
		];
		const parent = driver.getByTestId(CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment);
		const actualAwardCardImages = parent.getByTestId(CustomSoftwareDevelopent.AwardCardImage);
		
		await expect(actualAwardCardImages).toHaveCount(6);
		for(const awardCardImage of expectedAwards){
			const actualCard = actualAwardCardImages.nth(awardCardImage.id);
			await expect(actualCard).toHaveAttribute('alt',awardCardImage.alt);
			await expect(actualCard).toHaveAttribute('src',awardCardImage.src);
		}

		const reviewContainer = parent.getByTestId(CustomSoftwareDevelopent.ReviewContainer)
		await expect(reviewContainer).toHaveCount(2);
		await expect(reviewContainer.nth(0).getByTestId(CustomSoftwareDevelopent.ReviewAuthorName)).toHaveText('CPO');
		await expect(reviewContainer.nth(0).getByTestId(CustomSoftwareDevelopent.ReviewAuthorPosition)).toHaveText('Bunking');
		await expect(reviewContainer.nth(0).getByTestId(CustomSoftwareDevelopent.ReviewText)).toHaveText('Techstack Ltd\'s efforts have helped streamline the development process, allowing them to launch the project earlier than projected.')
		
		await expect(reviewContainer.nth(1).getByTestId(CustomSoftwareDevelopent.ReviewAuthorName)).toHaveText('Executive');
		await expect(reviewContainer.nth(1).getByTestId(CustomSoftwareDevelopent.ReviewAuthorPosition)).toHaveText('Peer-to-Peer Rental Marketplace');
		await expect(reviewContainer.nth(1).getByTestId(CustomSoftwareDevelopent.ReviewText)).toHaveText('Their willingness to help and involvement in the project were also key features to the project\'s success.')
		
		await expect(reviewContainer.nth(0).getByTestId(CustomSoftwareDevelopent.ReviewLink)).toHaveText('Clutch Review');
		const [newLIPage] = await Promise.all([
			driver.DriverContext.waitForEvent('page'),
			await reviewContainer.nth(0).getByTestId(CustomSoftwareDevelopent.ReviewLink).click(),
		]);
		expect(newLIPage.url()).toContain('https://clutch.co/profile/techstack#reviews');
		newLIPage.close();

	});

	test(`Check the 'Related artiles' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
		const expectedAwards = [
			{id:0,articleLeftInfo:'Internet of Things',articleRightInfo:'May 24', articleTitle:'The Benefits & Challenges of Integrating Digital Twins with IoT'},
			{id:1,articleLeftInfo:'Software Development',articleRightInfo:'Mar 20', articleTitle:'Using GraalVM in a Real-world Scenario: Techstack’s Experience'},
			{id:2,articleLeftInfo:'Processes Architecture',articleRightInfo:'Feb 22', articleTitle:'The Best Practices and Impact of Code Review on Productivity and Timelines'},
			
		];
		const actualArticles =  driver.getByTestId(CustomSoftwareDevelopent.RelatedArticles).getByTestId(CustomSoftwareDevelopent.ArticleItem);
		for(const award of expectedAwards){
			await expect(actualArticles.nth(award.id).getByTestId(CustomSoftwareDevelopent.ArticleLeftInfo)).toContainText(award.articleLeftInfo);
			await expect(actualArticles.nth(award.id).getByTestId(CustomSoftwareDevelopent.ArticleRightInfo)).toContainText(award.articleRightInfo);
			await expect(actualArticles.nth(award.id).getByTestId(CustomSoftwareDevelopent.ArticleTitle)).toHaveText(award.articleTitle);
		}
	});

	test(`Check the 'FAQ' section of the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
		const sections = driver.getByTestId(CustomSoftwareDevelopent.Faq).getByTestId(Container.SectionContainer);
		await expect(sections).toHaveCount(5);
		await expect(sections.nth(0).getByTestId(Container.SectionTitle)).toHaveText('Why choose Techstack for custom software development?');
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).toHaveText(' Our developers, QA engineers, and managers work closely with your team to ensure that the software solution meets your specific business needs...');
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).toBeVisible();
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).toHaveText(' Our developers, QA engineers, and managers work closely with your team to ensure that the software solution meets your specific business needs. They are committed to delivering quality code that is well-tested and scalable. In addition, our developers are always up-to-date on the latest technology trends, so you can be confident that your solution will be built using the best possible tools and techniques. As a result, you can focus on running your business, while we handle the development process.');
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).not.toBeVisible();

		await sections.nth(0).getByTestId(Button.ArrowButton).click();
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).not.toBeVisible();
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).toBeVisible();
		
		await sections.nth(4).getByTestId(Button.ArrowButton).click();
		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).toHaveText(' Software development is a process of creating, testing, and maintaining software. The custom software development process is a bit different from the traditional one as it is tailored according...');
		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).toHaveText(" Software development is a process of creating, testing, and maintaining software. The custom software development process is a bit different from the traditional one as it is tailored according to the client's specific needs. In this type of development, a team of experts works closely with the client to understand their requirements and develop a solution that fits their needs. Then, we set up a team and processes to deliver the custom solution. We seamlessly monitor the product and team’s health weekly within a unique framework and analyze problem zones to drive a constant improvement process.");

		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).not.toBeVisible();
		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).toBeVisible();

		await sections.nth(0).getByTestId(Button.ArrowButton).click();
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).toBeVisible();
		await expect(sections.nth(0).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).not.toBeVisible();
		
		await sections.nth(4).getByTestId(Button.ArrowButton).click();
		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionShortAnswer)).toBeVisible();
		await expect(sections.nth(4).getByTestId(CustomSoftwareDevelopent.SectionFullAnswer)).not.toBeVisible();
	});
	
test.afterEach(async () => {
	await driver.closeDrivers();
});