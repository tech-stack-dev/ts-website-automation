import randomstring from 'randomstring';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Buttons from '../../../../identifiers/Buttons';
import CareerButtons from '../../../../identifiers/career/CareerButtons';
import ContainersCareer from '../../../../identifiers/career/ContainersCareer';
import Navigation from '../../../../identifiers/career/Navigation';
import Career from '../../../../identifiers/career/pages/Career';
import Input from '../../../../identifiers/Input';
import UrlProvider from '../../../../providers/UrlProvider';
import {careerSteps, containerSteps, expect, test} from '../../../../fixtures/DesktopMobileSetup';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {IContainerOptions} from '../../../../steps/components/container/ContainerSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test.skip(
	qase(
		4773,
		'Check that "First Name" and "Last Name" input fields does not accept only spaces in "Apply for a Job" modal window on job page @desktop @mobile @Regression @JobsBlock @TSWEB-76'
	),
	async () => {
		await driver.getByTestId(/CardWrapper/).click();

		await careerSteps.clickOnApply();

		await driver.getByTestId(Input.FirstName).fill(' ');
		await driver.getByTestId(Input.LastName).fill(' '.repeat(99)); // Field accepts up to 100 characters
		await driver.getByTestId(Buttons.Send).click();

		const actualErrorText_FirstName = driver.getByTestId(Input.FirstName).locator(Input.FieldErrorSelector);
		const actualErrorText_LastName = driver.getByTestId(Input.LastName).locator(Input.FieldErrorSelector);
		await expect(actualErrorText_FirstName).toHaveText('Please enter your name');
		await expect(actualErrorText_LastName).toHaveText('Please enter your last name');
	}
);

test(
	qase(
		4767,
		'Check that Jobs link from breadcrumbs leads the user to the main Jobs page @desktop @mobile @Regression @JobsBlock @TSWEB-142 @TSWEB-82'
	),
	async () => {
		await driver.getByTestId(/CardWrapper/).click();
		await driver.getByTestId(CareerButtons.Breadcrumbs_Jobs).click();

		await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
		await expect(driver.getByTestId(/CardWrapper/)).toBeVisible();
	}
);

test(
	qase(
		4771,
		'Check search field styling after search a long jobname on careers page @desktop @mobile @Regression @JobsBlock @TSWEB-75 @TSWEB-116'
	),
	async () => {
		// Check that input size is not changed after searching
		const textData = randomstring.generate(50);
		const expectedInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
		await driver.getByTestId(Career.SarchCareerField).fill(textData);
		await expect(
			(
				await driver.component(ContainerByClass, ContainersCareer.SearchResultsTextContainer)
			).Element
		).toHaveText(`${textData},0 Jobs`);
		const actualInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
		expect(actualInputBoxProps?.width).toEqual(expectedInputBoxProps?.width);
		expect(actualInputBoxProps?.height).toEqual(expectedInputBoxProps?.height);
		// Check that input is not covered by another element after searching
		await (await driver.component(ContainerByClass, ContainersCareer.SearchResultsTextContainer)).click();
		await driver.getByTestId(Career.SarchCareerField).click();
		await expect(driver.getByTestId(Career.SarchCareerField)).toBeFocused();
	}
);

test(
	qase(
		4769,
		'Check that user can switch language in navigation header in career page @desktop @mobile @Regression @JobsBlock @TSWEB-146'
	),
	async () => {
		const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, {
			desktopLocator: ContainersCareer.NavigationHeaderClass,
		});
		const logoHeader = jobPageHeaderContainer.Element.getByTestId(Buttons.Logo);

		// A footer element is created to navigate to it and make the navigation bar appear.
		const footerContainer = await containerSteps.getContainer(ContainerByClass, {
			desktopLocator: ContainersCareer.FooterWrapper,
		});
		const logoFooter = footerContainer.getByTestId(Buttons.Logo);
		await logoFooter.focus();

		await logoHeader.waitFor({state: 'visible'});
		await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
		await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
		await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
		await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');

		const identifiers: IContainerOptions = {
			desktopLocator: ContainersCareer.LocaleSwitcherBlock,
			mobileLocator: ContainersCareer.MainModalMenuWrapper,
		};
		const localeSwitcherBlock = await containerSteps.getContainer(ContainerByClass, identifiers);

		await expect(localeSwitcherBlock.Element.getByTestId(CareerButtons.EnLanguageSwitcher).first()).toHaveClass(
			/active-locale/
		);

		await careerSteps.switchLanguage('ua');
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
