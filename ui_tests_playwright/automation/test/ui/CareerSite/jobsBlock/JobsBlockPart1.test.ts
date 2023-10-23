import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../../steps/careerPageSteps/CareerSteps';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import ContainersCareer from '../../../../identifiers/Career/ContainersCareer';
import Career from '../../../../identifiers/Career/pages/Career';
import {driver} from '../../../../base/driver/Driver';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Navigation from '../../../../identifiers/Career/Navigation';
import JobPagePreconditions from '../../../../preconditionsData/JobPagePreconditions';
import {descriptionSteps} from '../../../../steps/components/job/DescriptionSteps';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';
import {formSteps} from '../../../../steps/ui/FormSteps';
import ApplyForAJobForm from '../../../../identifiers/forms/ApplyForAJobForm';
import Buttons from '../../../../identifiers/Buttons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl(), true);
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test('Check that breadcrumbs displays correctly on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	expect(await careerSteps.getBreadcrumbsText()).toBe(
		`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test('Check localization on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
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

test('Check that user can switch language in navigation header in job page @Regression @JobsBlock @TSWEB-146', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	const jobPageHeaderContainer = await containerSteps.getContainer(
		ContainerByClass,
		ContainersCareer.JobPageHeaderWrapper
	);

	expect(await careerSteps.getBreadcrumbsText()).toBe(
		`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
	);

	const logo = jobPageHeaderContainer.Element.getByTestId(Buttons.Logo);
	await logo.waitFor({state: 'visible'});

	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');
	await expect(jobPageHeaderContainer.Element.getByTestId(CareerButtons.EnLanguageSwitcher)).toHaveClass(
		/active-locale/
	);

	const uaButtonSwitcher = jobPageHeaderContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test('Check error messages related to empty fields in "Apply for a job" form @Regression @JobsBlock @TSWEB-145', async () => {
	const testData: Record<string, string> = {
		PleaseEntryFirstName: 'Please enter your name',
		PleaseEntryLastName: 'Please enter your last name',
		PleaseEntryEmail: 'Please enter your phone number',
		PleaseEntryPhone: 'Please enter your email',
	};

	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await driver.getByTestId(Career.ApplyNowButton).click();
	await driver.getByTestId(Buttons.Send).click();
	const listOfMessages = await formSteps.getErrorMessagesFromFields([
		ApplyForAJobForm.FirstName,
		ApplyForAJobForm.LastName,
		ApplyForAJobForm.Email,
		ApplyForAJobForm.Phone,
	]);
	const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
	expect(messagesExistState).toBeTruthy();
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
