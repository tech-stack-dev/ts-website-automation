import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import {CustomDev} from '../../../../../identifiers/MainSite/pages/services/CustomDev';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check the header from the 'Custom Software Development' block", async () => {
	const info = driver.getByTestId(CustomDev.Info);

	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nCustom Software Development');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Custom Software and\nApplication Development\nServices'
	);
});

test("Check container titles and numbers from the 'Custom Software Development' block ", async () => {
	const containers = [
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentForYourProduct),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentServicesWeProvide),
		driver.getByTestId(CustomDev.TechnologyStack),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentBenefits),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess),
		driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts),
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

test("Check section titles and numbers in 'Custom software development for your product' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devForYourProduct = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentForYourProduct);

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

test("Check section titles and redirects by arrows in 'Custom development services we provide' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const servicesWeProvide = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentServicesWeProvide);
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

	const sectionRegex = /.(Front-End and Back-End development)|.(Building software products)/;
	const numberOfSectionsWithoutRedirects = 2;
	const sectionsWithoutRedirects = sections.filter({
		hasText: sectionRegex,
	});

	for (let i = 0; i < numberOfSectionsWithoutRedirects; i++) {
		await sectionsWithoutRedirects.nth(i).click();

		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
	}

	const sectionsWithRedirects = sections.filter({hasNotText: sectionRegex});
	const numberOfSectionsWithRedirects = 8;
	const expectedRedirectUri = [
		UrlProvider.urlBuilder(UrlPath.MobileDev),
		UrlProvider.urlBuilder(UrlPath.CloudAndDev),
		UrlProvider.urlBuilder(UrlPath.BigData),
		UrlProvider.urlBuilder(UrlPath.AiMl),
		UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		UrlProvider.urlBuilder(UrlPath.UiUxDesign),
		UrlProvider.urlBuilder(UrlPath.QaAsAServ),
		UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	];

	for (let i = 0; i < numberOfSectionsWithRedirects; i++) {
		const section = sectionsWithRedirects.nth(i);

		await section.click();
		await baseDriverSteps.checkUrl(expectedRedirectUri[i]);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
	}
});

test("Check section titles in 'Technology stack' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const technologyStack = driver.getByTestId(CustomDev.TechnologyStack);

	const tabButtons = [
		technologyStack.getByTestId(Buttons.Technology_BackEnd),
		technologyStack.getByTestId(Buttons.Technology_FrontEnd),
		technologyStack.getByTestId(Buttons.Technology_Mobile),
		technologyStack.getByTestId(Buttons.Technology_Iot),
		technologyStack.getByTestId(Buttons.Technology_DevopsCloud),
		technologyStack.getByTestId(Buttons.Technology_AiMlDataScience),
	];

	const expectedText: {title: string; sections: string[]}[] = [
		{
			title: 'Back-End',
			sections: [
				//TODO: incorrect test id on '.NET Stack',
				'JVM Stack',
				'Node.js stack',
				'Other',
			],
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
			console.log(await sectionTitles.count());
			await expect(sectionTitles.filter({hasText: expectedValues.sections[j]})).toBeVisible();
		}
	}
});

test("Check section titles and numbers in 'Custom software development benefits' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devBenefits = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentBenefits);

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

test("Check section titles and numbers in 'Custom software development process' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devProcess = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

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

test("Check section titles, member names and roles in 'Custom software development experts' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devExperts = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentExperts);
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

test("Check section titles and award cards in 'Our approach to software development' container from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const devApproach = driver.getByTestId(CustomDev.OurApproachToSoftwareDevelopment);

	const sections = devApproach.getByTestId(Container.ContainerSection);
	const numOfSections = 3;

	await expect(sections).toHaveCount(numOfSections);

	const expectedText = ['Tech community', 'Ownership over\nproducts', 'Proven expertise'];

	for (let i = 0; i < numOfSections; i++) {
		await expect(sections.nth(i).getByTestId(Container.SectionTitle)).toHaveText(expectedText[i]);
	}

	const awardCards = devApproach
		.getByTestId(Container.AwardCard)
		.filter({has: driver.getByTestId(Container.AwardCard)});

	const numOfCards = 6;

	await expect(awardCards).toHaveCount(numOfCards);

	const expectedAwardCardsData: {alt: string; src: string}[] = [
		{alt: 'Award-1', src: 'img/awards-logos-yellow/upwork.webp'},
		{alt: 'Award-2', src: 'img/awards-logos-yellow/clutch.webp'},
		{alt: 'Award-3', src: 'img/awards-logos-yellow/design-rush-1.webp'},
		{alt: 'Award-4', src: 'img/awards-logos-yellow/design-rush-2.webp'},
		{alt: 'Award-5', src: 'img/awards-logos-yellow/top-hybrid-app.webp'},
		{alt: 'Award-6', src: 'img/awards-logos-yellow/software-testing-companies.webp'},
	];

	for (let i = 0; i < numOfCards; i++) {
		const awardCardImage = awardCards.nth(i).getByTestId(Container.AwardCard);

		await expect(awardCardImage).toHaveAttribute('alt', expectedAwardCardsData[i].alt);
		await expect(awardCardImage).toHaveAttribute('src', expectedAwardCardsData[i].src);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
