import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import Buttons from '../../../../identifiers/Buttons';
import Pricing from '../../../../identifiers/mainSite/pages/Pricing';
import {
	companyUrl,
	expertiseUrl,
	industryUrl,
	serviceUrl,
	webflowPages,
} from '../../../../preconditionsData/UrlPreconditions';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {formSteps} from '../../../../steps/ui/FormSteps';
import {test, expect} from '../../../../fixtures/DesktopMobileSetup';
import UrlProvider from '../../../../providers/UrlProvider';
import Input from '../../../../identifiers/Input';
import UrlUtils from '../../../../utils/UrlUtils';
import UrlPath from '../../../../providers/UrlPath';
import {invalidGetInTouchData} from '../../../../dto/FormDto';
import GeneralContainersMainSite from '../../../../identifiers/mainSite/GeneralContainersMainSite';
import ContactUs from '../../../../identifiers/mainSite/pages/contactUs/ContactUs';

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlUtils.getRandomUrlFromArray(Object.values(industryUrl)),
	UrlUtils.getRandomUrlFromArray(Object.values(serviceUrl)),
	UrlUtils.getRandomUrlFromArray(Object.values(expertiseUrl)),
	UrlProvider.urlBuilder(UrlUtils.getRandomUrlFromArray([UrlPath.AboutUs, UrlPath.HowWeWork])),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(companyUrl[CompanyEnum.Pricing]);
});

test('Check validation for "Get Our Rate Card" form from "Pricing" page @desktop @mobile @Regression @GetOurRateCard @TSWEB-1768', async () => {
	await baseDriverSteps.goToUrl(companyUrl[CompanyEnum.Pricing]);
	const getOurRateCardContainer = driver.getByTestId(Pricing.GetOurRateCard);
	const invalidEmails = invalidGetInTouchData.map((item) => item.email);
	const nonBusinessEmails = [
		`Test${sessionValue.stringValue}@gmail.com`,
		`Test${sessionValue.stringValue}@yahoo.com`,
		`Test${sessionValue.stringValue}@hotmail.com`,
		`Test${sessionValue.stringValue}@outlook.com`,
		`Test${sessionValue.stringValue}@mail.ru`,
		`Test${sessionValue.stringValue}@yandex.ru`,
		`Test${sessionValue.stringValue}@protonmail.com`,
		`Test${sessionValue.stringValue}@icloud.com`,
		`Test${sessionValue.stringValue}@aol.com`,
		`Test${sessionValue.stringValue}@inbox.com`,
		`Test${sessionValue.stringValue}@list.ru`,
		`Test${sessionValue.stringValue}@rambler.ru`,
	];

	for (const invalidEmail of invalidEmails.concat(nonBusinessEmails)) {
		await formSteps.fillGetOurRateCard(invalidEmail);
		await driver.getByTestId(Buttons.Download).first().click();
		const displayedError = getOurRateCardContainer.locator(Input.FieldErrorSelector);
		nonBusinessEmails.includes(invalidEmail)
			? expect(await displayedError?.textContent()).toContain('Please use your work email address.')
			: expect(await displayedError?.textContent()).toContain('Please enter a valid email');
	}
});

test(`Check validation for required fields in "Get in Touch" form from Business website pages @desktop @mobile @Regression @GetInTouchShort @TSWEB-1767`, async () => {
	for (const url of testDataProvider) {
		if (!webflowPages.includes(url)) {
			await baseDriverSteps.goToUrl(url);
			for (const formData of invalidGetInTouchData) {
				await formSteps.fillGetInTouchForm(formData);
				await driver.Page.waitForTimeout(100);
				await driver.getByTestId(Buttons.Send).last().click();
				const formLocator = (await driver.getByTestId(GeneralContainersMainSite.GetInTouch).isVisible())
					? driver.getByTestId(GeneralContainersMainSite.GetInTouch)
					: driver.getByTestId(ContactUs.ContactUsForm);
				const displayedErrors = formLocator.locator(Input.FieldErrorSelector);
				const expectedMessages = {
					firstName: 'Enter your first name, please',
					lastName: 'Enter your last name, please',
					email: formData.email === '' ? 'Enter your email, please' : 'Please enter a valid email',
				};
				const displayedErrorMsg = await displayedErrors.allTextContents();

				Object.keys(expectedMessages).forEach((field, index) => {
					const expectedError = expectedMessages[field as keyof typeof expectedMessages];
					const displayedError = displayedErrorMsg[index];

					expect(displayedError).toBe(expectedError);
				});

				await driver.Page.reload();
			}
		}
	}
});
