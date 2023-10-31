import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import {CustomDev} from '../../../../../identifiers/MainSite/pages/services/CustomDev';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import TechnologyStackData from '../../../../../preconditionsData/TechnologyStack/TechnologyStackData';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test('Check the Info container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const info = driver.getByTestId(CustomDev.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCustom Software Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('Custom Software\nDevelopment Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a Quote');
});

test('Check container titles and numbers from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const containers = [
		driver.getByTestId(CustomDev.TechstacksStrengthsInCustomSoftDev),
		driver.getByTestId(CustomDev.CustomDevelopmentForYourProduct),
		driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide),
		driver.getByTestId(CustomDev.TechnologyStack),
		driver.getByTestId(CustomDev.OurFeaturedCaseStudy),
		driver.getByTestId(CustomDev.IndustriesWeDevelopSoftwareFor),
		driver.getByTestId(CustomDev.WhyChooseTechstack),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts),
		driver.getByTestId(CustomDev.OurTailoredCollaborationAndPricingModels),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess),
		driver.getByTestId(CustomDev.GetInTouch),
		driver.getByTestId(CustomDev.RelatedArticles),
		driver.getByTestId(CustomDev.Faq),
	];

	const expectedText: [string, string][] = [
		['Techstack’s Strengths\nin Custom Software\nDevelopment', '01'],
		['Custom Software Development for\nYour Product', '02'],
		['Custom Development\nServices We Provide', '03'],
		['Technology Stack', '04'],
		['Our Featured\nCase Study', '05'],
		['Industries We Develop\nSoftware For', '06'],
		['Why Choose\nTechstack', '07'],
		['Custom Software\nDevelopment Experts', '08'],
		['Our Tailored Collaboration and Pricing Models', '09'],
		['Custom Software Development Process', '10'],
		['Get in Touch', '11'],
		['Related Articles', '12'],
		['FAQ', '13'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedText);
});

test('Check section titles in "Techstack’s Strengths in Custom Software Development" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const techstackStrengthContainer = driver.getByTestId(CustomDev.TechstacksStrengthsInCustomSoftDev);
	const sections = techstackStrengthContainer.getByTestId(Container.ContainerSection);
	const numOfSections = 3;
	await expect(sections).toHaveCount(numOfSections);

	const sectionTitles = sections.getByTestId(Container.SectionTitle);
	const testData = ['From MVP to unicorn product', 'Five-star reviews', 'First-hand cross-domain expertise'];

	await expect(sectionTitles).toHaveText(testData);
});

test('Check section titles and numbers in "Custom Software Development for Your Product" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const devForYourProduct = driver.getByTestId(CustomDev.CustomDevelopmentForYourProduct);

	const sections = devForYourProduct.getByTestId(Container.ContainerSection);

	const numOfSections = 4;
	await expect(sections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Product MVP Development', '01'],
		['Scaling Software Product Team and Processes', '02'],
		['Enterprise Software Development', '03'],
		['Industry-Specific Software Development', '04'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = sections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}
});

test('Check section titles and numbers, and CTA button in "Custom Development Services We Provide" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);
	const sections = servicesWeProvide.getByTestId(Container.ContainerSection);

	const numOfSections = 11;
	await expect(sections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Mobile\nDevelopment', '01'],
		['Front-End and Back-End Development', '02'],
		['Cloud App\nDevelopment', '03'],
		['Big Data & Analytics', '04'],
		['UX/UI Design', '05'],
		['AI & ML', '06'],
		['Internet\nof Things', '07'],
		['Building Software Products\nfrom Scratch', '08'],
		['QA as a Service', '09'],
		['Custom Software\nDevelopment Consulting', '10'],
		['Digital\nTransformation', '11'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = sections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}

	await expect(servicesWeProvide.getByTestId(MainSiteButtons.SendUsYourQueries)).toHaveText('Send Us Your Queries');
});

test('Check section titles and navigation bar in "Technology stack" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const technologyStackContainer = driver.getByTestId(CustomDev.TechnologyStack);

	const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
	const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = await TechnologyStackData.getAllTechnologyStackTabsData();

	await baseDriverSteps.checkTechnologyStackTabsAndSectionTitles(
		navigationTabs,
		containerBlocks,
		testDataSectionTitles
	);
});

test('Check section titles, image and CTA button in "Our Featured Case Study" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const ourFeaturedCaseStudyContainer = driver.getByTestId(CustomDev.OurFeaturedCaseStudy);

	const allSectionTitles = ourFeaturedCaseStudyContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Improve user location',
		'Streamlining the user entry process',
		'Delivering robust data security across all system components',
	];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(ourFeaturedCaseStudyContainer.getByTestId(MainSiteImages.OurFeaturedCaseStudy)).toBeVisible();
	await expect(ourFeaturedCaseStudyContainer.getByTestId(MainSiteButtons.ReadMore)).toHaveText('Read More');
});

test('Check section numbers and titles in "Industries We Develop Software For" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const industriesWeDevelopContainer = driver.getByTestId(CustomDev.IndustriesWeDevelopSoftwareFor);
	await expect(industriesWeDevelopContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
	]);

	const allSectionTitles = industriesWeDevelopContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Healthcare',
		'Transportation and Logistics',
		'Renewable Energy',
		'Agriculture and Farming',
		'Manufacturing',
		'Hospitality',
		'Entertainment',
		'Fintech',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check section titles in "Why Choose Techstack" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const whyChooseTechstackContainer = driver.getByTestId(CustomDev.WhyChooseTechstack);

	const sections = whyChooseTechstackContainer.getByTestId(Container.ContainerSection);
	const numOfSections = 3;
	await expect(sections).toHaveCount(numOfSections);

	const sectionTitles = whyChooseTechstackContainer.getByTestId(Container.SectionTitle);
	const expectedText = ['Tech community', 'Ownership over\nproducts', 'Proven expertise'];

	await expect(sectionTitles).toHaveText(expectedText);
});

test('Check award cards in "Why Choose Techstack" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const whyChooseTechstackContainer = driver.getByTestId(CustomDev.WhyChooseTechstack);
	const awardCards = whyChooseTechstackContainer.getByTestId(Container.AwardCard);
	await baseDriverSteps.checkImagesVisibility(awardCards, 8);
});

test('Check section titles, member names and roles, and CTA button in "Custom Software Development Experts" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const devExpertsContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
	const sections = devExpertsContainer.getByTestId(Container.ContainerSection);
	const numOfSections = 3;

	await expect(sections).toHaveCount(numOfSections);

	const sectionTitles = devExpertsContainer.getByTestId(Container.SectionTitle);
	const expectedText = ['Tech Experts Team', 'Development Team', 'Management Team'];

	await expect(sectionTitles).toHaveText(expectedText);

	const memberCards = devExpertsContainer.getByTestId(Container.MemberCard);

	const numOfMembers = 7;

	await expect(memberCards).toHaveCount(numOfMembers);

	const expectedMemberCardsText: {name: string; role: string}[] = [
		{
			name: ExpertNames.IvanIeremenko,
			role: 'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		},
		{name: ExpertNames.OleksiiSvystun, role: 'CTO, Software Architect,\nElaborates on the technology strategy'},
		{
			name: ExpertNames.VitaliiDolotov,
			role: 'Sr. Director of Quality Engineering,\nOversees technology-related initiatives',
		},
		{name: ExpertNames.IvanYeremenko, role: 'VP of Engineering,\nLeads the Tech Experts Program and team'},
		{
			name: ExpertNames.YevheniiKarachevtsev,
			role: 'R&D Engineer, Software Engineering Lead,\nAdvises the best custom solution',
		},
		{name: ExpertNames.DmytroDytiuk, role: 'Chief Creative Officer,\nAligns UX with users’ needs / business goals'},
		{
			name: ExpertNames.DmytroShtapauk,
			role: 'Head of Account Management,\nDrives cross-functional process transformation',
		},
	];

	for (let i = 0; i < numOfMembers; i++) {
		const memberCard = memberCards.nth(i);

		await expect(memberCard.getByTestId(Container.MemberRole)).toHaveText(expectedMemberCardsText[i].role);
		await expect(memberCard.getByTestId(Container.MemberName)).toHaveText(expectedMemberCardsText[i].name);
	}

	await expect(devExpertsContainer.getByTestId(MainSiteButtons.ContactOurExperts)).toHaveText('Contact Our Experts');
});

test('Check section titles and CTA button in "Our Tailored Collaboration and Pricing Models" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const ourTailoredCollaborationContainer = driver.getByTestId(CustomDev.OurTailoredCollaborationAndPricingModels);

	const sectionTitles = ourTailoredCollaborationContainer.getByTestId(Container.SectionTitle);
	const expectedText = ['Full-cycle software development', 'Dedicated team', 'R&D partnership'];

	await expect(sectionTitles).toHaveText(expectedText);
	await expect(ourTailoredCollaborationContainer.getByTestId(MainSiteButtons.ClaimYourCustomQuote)).toHaveText(
		'Claim Your Custom Quote'
	);
});

test('Check carousel section titles and numbers in "Custom Software Development Process" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const customSoftDevProcessContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

	await expect(customSoftDevProcessContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
	]);
	const sectionTitles = customSoftDevProcessContainer.getByTestId(Container.SectionTitle);
	const expectedText = ['Investigation', 'Execution', 'Performance', 'Analysis'];

	await expect(sectionTitles).toHaveText(expectedText);
});

test('Check section titles in "FAQ" container from the "Custom Software Development" page @Regression @CustomDev @TSWEB-672', async () => {
	const faqContainer = driver.getByTestId(CustomDev.Faq);

	const sections = faqContainer.getByTestId(Container.ContainerSection);
	const numOfSections = 5;

	await expect(sections).toHaveCount(numOfSections);

	const expectedText = [
		'Why choose Techstack for custom software development?',
		'How does Techstack enhance the professional development of engineers?',
		'How do you ensure IP protection during custom product development?',
		'Why choose Techstack for enterprise custom development?',
		'What are the main steps of our custom software design and development process?',
	];

	for (let i = 0; i < numOfSections; i++) {
		await expect(sections.nth(i).getByTestId(Container.SectionTitle)).toHaveText(expectedText[i]);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
