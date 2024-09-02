import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {careerSteps, containerSteps, expect, test} from '../../../../fixtures/DesktopMobileSetup';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import ContainersCareer from '../../../../identifiers/career/ContainersCareer';
import Career from '../../../../identifiers/career/pages/Career';
import {driver} from '../../../../base/driver/Driver';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Navigation from '../../../../identifiers/career/Navigation';
import JobPagePreconditions from '../../../../preconditionsData/JobPagePreconditions';
import {descriptionSteps} from '../../../../steps/components/job/DescriptionSteps';
import {formSteps} from '../../../../steps/ui/FormSteps';
import Buttons from '../../../../identifiers/Buttons';
import Job from '../../../../identifiers/Job';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {IContainerOptions} from '../../../../steps/components/container/ContainerSteps';
import Input from '../../../../identifiers/Input';
import CareerButtons from '../../../../identifiers/career/CareerButtons';
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
	qase(
		4775,
		'Check that breadcrumbs displays correctly on job page @desktop @mobile @Regression @JobsBlock @TSWEB-560'
	),
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
	await careerSteps.switchLanguage('ua');
	const applyPropositionWrapper = await containerSteps.getContainer(ContainerByClass, {
		desktopLocator: ContainersCareer.JobPageApplyProposition,
	});

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
		'Check that user can switch language in navigation header in job page @desktop @mobile @Regression @JobsBlock @TSWEB-146'
	),
	async () => {
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		const identifiers: IContainerOptions = {
			desktopLocator: ContainersCareer.JobPageHeaderWrapper,
			mobileLocator: ContainersCareer.JobPageMobileHeaderWrapper,
		};
		const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, identifiers);

		expect(await careerSteps.getBreadcrumbsText()).toBe(
			`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
		);

		const logo = jobPageHeaderContainer.Element.getByTestId(Buttons.Logo);
		await logo.waitFor({state: 'visible'});

		await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
		await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
		await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
		await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');

		await careerSteps.switchLanguage('ua');
	}
);

test.skip(
	qase(
		4784,
		'Check error messages related to empty fields in "Apply for a job" form @desktop @mobile @Regression @JobsBlock @TSWEB-145'
	),
	async () => {
		const testData: Record<string, string> = {
			PleaseEntryFirstName: 'Please enter your name',
			PleaseEntryLastName: 'Please enter your last name',
			PleaseEntryPhone: 'Please enter your phone number',
			PleaseEntryEmail: 'Please enter your email',
		};

		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		(
			await containerSteps.getDynamicLocator({
				desktopLocator: CareerButtons.ApplyNow,
				mobileLocator: AboutUsCareer.ApplyNowButton,
			})
		).click();

		await driver.getByTestId(Buttons.Send).click();
		const listOfMessages = await formSteps.getErrorMessagesFromFields([
			Input.FirstName,
			Input.LastName,
			Input.Email,
			Input.PhoneNumber,
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
