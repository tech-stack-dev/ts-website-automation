import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import {CustomDev} from '../../../../../identifiers/mainSite/pages/services/CustomDev';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test(
	qase(
		5285,
		'Check the Info container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const info = driver.getByTestId(CustomDev.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCustom Software Development');
		await expect(info.getByTestId(Container.Title)).toHaveText('Custom Software Development Services');
		await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a Quote');
	}
);

test(
	qase(
		5289,
		'Check container titles and numbers from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
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
			['Techstack’s Strengths in Custom Software Development', '01'],
			['Custom Software Development for Your Product', '02'],
			['Custom Development Services We Provide', '03'],
			['Technology Stack', '04'],
			['Our Featured Case Study', '05'],
			['Industries We Develop Software For', '06'],
			['Why Choose Techstack', '07'],
			['Custom Software Development Experts', '08'],
			['Our Tailored Collaboration and Pricing Models', '09'],
			['Custom Software Development Process', '10'],
			['Get in Touch', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedText);
	}
);

test(
	qase(
		5293,
		'Check section titles in "Techstack’s Strengths in Custom Software Development" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const techstackStrengthContainer = driver.getByTestId(CustomDev.TechstacksStrengthsInCustomSoftDev);
		const sections = techstackStrengthContainer.getByTestId(Container.ContainerSection);
		const numOfSections = 3;
		await expect(sections).toHaveCount(numOfSections);

		const sectionTitles = sections.getByTestId(Container.SectionTitle);
		const testData = ['From MVP to unicorn product', 'Five-star reviews', 'First-hand cross-domain expertise'];

		await expect(sectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5296,
		'Check section titles and numbers, and CTA button in "Custom Software Development for Your Product" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
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

		await expect(devForYourProduct.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		5298,
		'Check section titles and numbers, and CTA button in "Custom Development Services We Provide" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);
		const sections = servicesWeProvide.getByTestId(Container.ContainerSection);

		const numOfSections = 12;
		await expect(sections).toHaveCount(numOfSections);

		const expectedText: [string, string][] = [
			['Mobile\nDevelopment', '01'],
			['Back-End Development\nServices', '02'],
			['Front-End Development\nServices', '03'],
			['Cloud App\nDevelopment', '04'],
			['Big Data & Analytics', '05'],
			['UX/UI Design', '06'],
			['AI & ML', '07'],
			['Internet\nof Things', '08'],
			['Building Software Products\nfrom Scratch', '09'],
			['QA as a Service', '10'],
			['Custom Software\nDevelopment Consulting', '11'],
			['Digital\nTransformation', '12'],
		];

		for (let i = 0; i < numOfSections; i++) {
			const section = sections.nth(i);

			await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
			await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
		}

		await expect(servicesWeProvide.getByTestId(MainSiteButtons.SendUsYourQueries)).toHaveText(
			'Send Us Your Queries'
		);
	}
);

test(
	qase(
		5306,
		'Check section titles and navigation bar in "Technology stack" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(CustomDev.TechnologyStack);

		const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
		const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
		const testDataSectionTitles = await TechnologyStackData.getAllTechnologyStackTabsData();

		await baseDriverSteps.checkTabsAndSectionTitles(navigationTabs, containerBlocks, testDataSectionTitles);
	}
);

test(
	qase(
		5302,
		'Check section titles, image and CTA button in "Our Featured Case Study" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const ourFeaturedCaseStudyContainer = driver.getByTestId(CustomDev.OurFeaturedCaseStudy);

		const allSectionTitles = ourFeaturedCaseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Improve user location',
			'Streamlining the user entry process',
			'Delivering robust data security across all system components',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(ourFeaturedCaseStudyContainer.getByTestId(MainSiteImages.OurFeaturedCaseStudy)).toBeVisible();
		await expect(ourFeaturedCaseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5312,
		'Check section numbers, titles and button in "Industries We Develop Software For" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
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
		await expect(industriesWeDevelopContainer.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote)).toHaveText(
			'Get your industry-specific quote'
		);
	}
);

test(
	qase(
		4867,
		'Check section titles in "Why Choose Techstack" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const whyChooseTechstackContainer = driver.getByTestId(CustomDev.WhyChooseTechstack);

		const sections = whyChooseTechstackContainer.getByTestId(Container.ContainerSection);
		const numOfSections = 3;
		await expect(sections).toHaveCount(numOfSections);

		const sectionTitles = whyChooseTechstackContainer.getByTestId(Container.SectionTitle);
		const expectedText = ['Tech community', 'Ownership over\nproducts', 'Proven expertise'];

		await expect(sectionTitles).toHaveText(expectedText);
	}
);

test(
	qase(
		4782,
		'Check award cards in "Why Choose Techstack" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const whyChooseTechstackContainer = driver.getByTestId(CustomDev.WhyChooseTechstack);
		const awardCards = whyChooseTechstackContainer.getByTestId(Container.AwardCard);
		await baseDriverSteps.checkImagesVisibility(awardCards, 8);
	}
);

test(
	qase(
		4789,
		'Check section titles, member names and roles, and CTA button in "Custom Software Development Experts" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const devExpertsContainer = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
		const sections = devExpertsContainer.getByTestId(Container.ContainerSection);
		const numOfSections = 3;

		await expect(sections).toHaveCount(numOfSections);

		const sectionTitles = devExpertsContainer.getByTestId(Container.SectionTitle);
		const expectedText = ['Tech Experts Team', 'Development Team', 'Management Team'];

		await expect(sectionTitles).toHaveText(expectedText);

		const memberCards = devExpertsContainer.getByTestId(Container.MemberCard);

		const numOfMembers = 6;

		await expect(memberCards).toHaveCount(numOfMembers);

		const expectedMemberCardsText: {name: string; role: string}[] = [
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
			{
				name: ExpertNames.DmytroDytiuk,
				role: 'Chief Creative Officer,\nAligns UX with users’ needs / business goals',
			},
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

		await expect(devExpertsContainer.getByTestId(MainSiteButtons.ContactOurExperts)).toHaveText(
			'Contact Our Experts'
		);
	}
);

test(
	qase(
		4793,
		'Check section titles and CTA button in "Our Tailored Collaboration and Pricing Models" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
		const ourTailoredCollaborationContainer = driver.getByTestId(
			CustomDev.OurTailoredCollaborationAndPricingModels
		);

		const sectionTitles = ourTailoredCollaborationContainer.getByTestId(Container.SectionTitle);
		const expectedText = ['Full-cycle software development', 'Dedicated team', 'R&D partnership'];

		await expect(sectionTitles).toHaveText(expectedText);
		await expect(ourTailoredCollaborationContainer.getByTestId(MainSiteButtons.ClaimYourCustomQuote)).toHaveText(
			'Claim Your Custom Quote'
		);
	}
);

test(
	qase(
		4802,
		'Check carousel section titles and numbers in "Custom Software Development Process" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
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
	}
);

test(
	qase(
		4810,
		'Check section titles in "FAQ" container from the "Custom Software Development" page @desktop @mobile @Regression @CustomDev @TSWEB-672'
	),
	async () => {
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
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
