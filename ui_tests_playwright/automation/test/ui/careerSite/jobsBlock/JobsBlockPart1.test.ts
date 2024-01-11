import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import { sessionValue } from '../../../../runtimeVariables/SessionValue';
import { careerSteps, expect, test } from '../../../../fixtures/DesktopMobileSetup';
import { contentfulSteps } from '../../../../steps/contentful/ContentfulSteps';
import ContainersCareer from '../../../../identifiers/career/ContainersCareer';
import Career from '../../../../identifiers/career/pages/Career';
import { driver } from '../../../../base/driver/Driver';
import { containerSteps } from '../../../../steps/components/container/ContainerSteps';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Navigation from '../../../../identifiers/career/Navigation';
import JobPagePreconditions from '../../../../preconditionsData/JobPagePreconditions';
import { descriptionSteps } from '../../../../steps/components/job/DescriptionSteps';
import CareerButtons from '../../../../identifiers/career/CareerButtons';
import { formSteps } from '../../../../steps/ui/FormSteps';
import ApplyForAJobForm from '../../../../identifiers/forms/ApplyForAJobForm';
import Buttons from '../../../../identifiers/Buttons';
import Job from '../../../../identifiers/Job';
import { qase } from 'playwright-qase-reporter/dist/playwright';
import AboutUsCareer from '../../../../identifiers/career/pages/AboutUsCareer';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test(
	qase(4775, 'Check that breadcrumbs displays correctly on job page @desktop @mobile @Regression @JobsBlock @TSWEB-560'),
	async () => {
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		expect(await careerSteps.getBreadcrumbsText()).toBe(
			`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
		);
	}
);

test(qase(4778, 'Check localization on job page @desktop @mobile @Regression @JobsBlock @TSWEB-560'), async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await expect(driver.getByTestId(Job.AboutTheProductBlock)).toBeVisible();
	await careerSteps.switchLanguageViaHeader('ua');
	const applyPropositionWrapper = await containerSteps.getContainer(
		ContainerByClass,
		ContainersCareer.JobPageApplyProposition
	);

	await expect((await driver.component(ContainerByClass, Career.JobHeaderTitle)).Element).toHaveText(
		'Тестова Вакансія'
	);
	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Вакансії');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('Про компанію');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Відгуки');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Зв’язатись з нами');

	for (const header of JobPagePreconditions.descriptionBlocksIdentifiersAndUaHeaders) {
		await descriptionSteps.checkDescriptionBlockHeader(header[0], header[1]);
	}

	await expect(applyPropositionWrapper.Element).toHaveText(
		'Хочеш зробити свій внесок?Ти у правильному місці.Подавай заявку на вакансію!'
	);
});

test(
	qase(
		4790,
		'Check that user can switch language in navigation header in job page @mobile @Regression @JobsBlock @TSWEB-146'
	),
	async ({ isMobile }) => {
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		const jobPageHeaderContainer = isMobile ? await containerSteps.getContainer(ContainerByClass, ContainersCareer.JobPageMobileHeaderWrapper)
			: await containerSteps.getContainer(ContainerByClass, ContainersCareer.JobPageHeaderWrapper);

		expect(await careerSteps.getBreadcrumbsText()).toBe(
			`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
		);

		const logo = isMobile ? jobPageHeaderContainer.Element.locator("//img[contains(@class,'globalStyles__Logo')]")
			: jobPageHeaderContainer.Element.getByTestId(Buttons.Logo);
		await logo.waitFor({ state: 'visible' });

		await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
		await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
		await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
		await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');

		if (isMobile) {
			await driver.Page.locator("//div[contains(@class,'styledComponents__BurgerMenuWrapper')]").first().click();
		}
		await expect(driver.getByTestId(CareerButtons.EnLanguageSwitcher)).toHaveClass(
			/active-locale/
		);

		const uaButtonSwitcher = driver.getByTestId(CareerButtons.UaLanguageSwitcher);
		await uaButtonSwitcher.click();
		await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
	}
);

test(
	qase(
		4784,
		'Check error messages related to empty fields in "Apply for a job" form @desktop @mobile @Regression @JobsBlock @TSWEB-145'
	),
	async ({ isMobile }) => {
		const testData: Record<string, string> = {
			PleaseEntryFirstName: 'Please enter your name',
			PleaseEntryLastName: 'Please enter your last name',
			PleaseEntryPhone: 'Please enter your phone number',
			PleaseEntryEmail: 'Please enter your email',
		};

		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		if (isMobile) {
			await driver.getByTestId(AboutUsCareer.ApplyNowButton).click();
		} else {
			await driver.getByTestId(CareerButtons.ApplyNow).click();
		}

		await driver.getByTestId(Buttons.Send).click();
		const listOfMessages = await formSteps.getErrorMessagesFromFields([
			ApplyForAJobForm.FirstName,
			ApplyForAJobForm.LastName,
			ApplyForAJobForm.Email,
			ApplyForAJobForm.Phone,
		]);
		const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
		expect(messagesExistState).toBeTruthy();
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
