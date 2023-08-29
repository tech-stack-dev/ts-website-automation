import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {CustomDev} from '../../../../../identifiers/MainSite/pages/services/CustomDev';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check the header from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const info = driver.getByTestId(CustomDev.Info);

	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCustom Software Development');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Custom Software and\nApplication Development\nServices'
	);
});

test("Check container titles and numbers from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const containers = [
		driver.getByTestId(CustomDev.CustomDevelopmentForYourProduct),
		driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide),
		driver.getByTestId(CustomDev.TechnologyStack),
		driver.getByTestId(CustomDev.CustomDevelopmentBenefits),
		driver.getByTestId(CustomDev.CustomDevelopmentProcess),
		driver.getByTestId(CustomDev.CustomDevelopmentExperts),
		driver.getByTestId(CustomDev.CaseStudies),
		driver.getByTestId(CustomDev.OurApproachToSoftwareDevelopment),
		driver.getByTestId(CustomDev.Faq),
		driver.getByTestId(CustomDev.RelatedArticles),
	];

	const expectedText: [string, string][] = [
		['Custom software development for your product', '01'],
		['Custom\ndevelopment\nservices we provide', '02'],
		['Technology stack', '03'],
		['Custom software development benefits', '04'],
		['Custom software development process', '05'],
		['Custom software\ndevelopment experts', '06'],
		['Case studies', '07'],
		['Our approach\nto software\ndevelopment', '08'],
		['FAQ', '09'],
		['Related Articles', '10'],
	];

	for (let i = 0; i < containers.length; i++) {
		const container = containers[i];

		await expect(container.getByTestId(Container.ContainerTitle)).toHaveText(expectedText[i][0]);
		await expect(container.getByTestId(Container.ContainerNumber)).toHaveText(expectedText[i][1]);
	}
});

test("Check section titles and numbers in 'Custom software development for your product' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
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

test("Check section titles in 'Custom development services we provide' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomDevelopmentServicesWeProvide);
	const sections = servicesWeProvide.getByTestId(Container.ContainerSection);

	const numOfSections = 10;
	await expect(sections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Mobile development', '01'],
		['Front-End and Back-End development', '02'],
		['Cloud app development', '03'],
		['Big Data & Analytics', '04'],
		['AI & ML', '05'],
		['IoT', '06'],
		['UX/UI Design', '07'],
		['Building software products\nfrom scratch', '08'],
		['QA as a Service', '09'],
		['Software development\nconsulting', '10'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = sections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}
});

test("Check section titles in 'Technology stack' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const technologyStack = driver.getByTestId(CustomDev.TechnologyStack);

	const tabButtons = [
		technologyStack.getByTestId(MainSiteButtons.Technology_BackEnd),
		technologyStack.getByTestId(MainSiteButtons.Technology_FrontEnd),
		technologyStack.getByTestId(MainSiteButtons.Mobile),
		technologyStack.getByTestId(MainSiteButtons.Technology_Iot),
		technologyStack.getByTestId(MainSiteButtons.Technology_DevopsCloud),
		technologyStack.getByTestId(MainSiteButtons.Technology_AiMlDataScience),
	];

	const expectedText: {title: string; sections: string[]}[] = [
		{
			title: 'Back-End',
			sections: ['.NET Stack', 'JVM Stack', 'Node.js stack', 'Other'],
		},
		{
			title: 'Front-End',
			sections: ['Languages', 'Frameworks', 'State\nmanagement', 'Build tools', 'Markup', 'Rich content'],
		},
		{title: 'Mobile', sections: ['React Native', 'Cordova', 'Flutter', 'Android', 'iOS']},
		{title: 'IoT', sections: ['Devices', 'Gateways']},
		{title: 'DevOps/Cloud', sections: ['Cloud', 'DevOps', 'CI/CD', 'Monitoring']},
		{
			title: 'AI&ML/Data science',
			sections: [
				'Computer vision',
				'Deep learning and machine learning',
				'Data visualization',
				'Data storage & manipulation',
				'Development environment',
			],
		},
	];
	const sectionTitles = technologyStack.getByTestId(Container.BlockTitle);

	for (let i = 0; i < tabButtons.length; i++) {
		const expectedValues = expectedText[i];
		await expect(tabButtons[i]).toHaveText(expectedValues.title);
		await tabButtons[i].click();

		for (let j = 0; j < expectedValues.sections.length; j++) {
			await expect(sectionTitles.filter({hasText: expectedValues.sections[j]})).toBeVisible();
		}
	}
});

test("Check section titles and numbers in 'Custom software development benefits' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devBenefits = driver.getByTestId(CustomDev.CustomDevelopmentBenefits);

	const sections = devBenefits.getByTestId(Container.ContainerSection);

	const numOfSections = 4;
	await expect(sections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Retain clients', '01'],
		['Improve performance', '02'],
		['Unlock new opportunities', '03'],
		['Iterate fast', '04'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = sections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}
});

test("Check section titles and numbers in 'Custom software development process' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devProcess = driver.getByTestId(CustomDev.CustomDevelopmentProcess);

	const carouselSections = devProcess.getByTestId(Container.CarouselSection);

	const numOfSections = 4;
	await expect(carouselSections).toHaveCount(numOfSections);

	const expectedText: [string, string][] = [
		['Investigation', '01'],
		['Execution', '02'],
		['Performance', '03'],
		['Analysis', '04'],
	];

	for (let i = 0; i < numOfSections; i++) {
		const section = carouselSections.nth(i);

		await expect(section.getByTestId(Container.SectionTitle)).toHaveText(expectedText[i][0]);
		await expect(section.getByTestId(Container.SectionNumber)).toHaveText(expectedText[i][1]);
	}
});

test("Check section titles, member names and roles in 'Custom software development experts' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devExperts = driver.getByTestId(CustomDev.CustomDevelopmentExperts);
	const sections = devExperts.getByTestId(Container.ContainerSection);
	const numOfSections = 3;

	await expect(sections).toHaveCount(numOfSections);

	const expectedText = ['Tech Experts Team', 'Development Team', 'Management Team'];

	for (let i = 0; i < numOfSections; i++) {
		await expect(sections.nth(i).getByTestId(Container.SectionTitle)).toHaveText(expectedText[i]);
	}

	const memberCards = devExperts.getByTestId(Container.MemberCard);

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
});

test("Check section titles and award cards in 'Our approach to software development' container from the 'Custom Software Development' block @Regression @CustomDev @TSWEB-672", async () => {
	const devApproach = driver.getByTestId(CustomDev.OurApproachToSoftwareDevelopment);

	const sections = devApproach.getByTestId(Container.ContainerSection);
	const numOfSections = 3;

	await expect(sections).toHaveCount(numOfSections);

	const expectedText = ['Tech community', 'Ownership over\nproducts', 'Proven expertise'];

	for (let i = 0; i < numOfSections; i++) {
		await expect(sections.nth(i).getByTestId(Container.SectionTitle)).toHaveText(expectedText[i]);
	}

	const numOfCards = 6;
	const filteredLocator = 'img';

	await baseDriverSteps.checkAwardCardsVisibility(devApproach, numOfCards, filteredLocator);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
