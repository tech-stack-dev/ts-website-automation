import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {slackSteps} from '../../../../steps/api/SlackSteps';
import {formSteps} from '../../../../steps/ui/FormSteps';
import UrlPath from '../../../../providers/UrlPath';
import SlackProvider from '../../../../providers/SlackProvider';
import {slackDtoVariable} from '../../../../runtimeVariables/dto/SlackDtoVariable';
import Navigation from '../../../../identifiers/Career/Navigation';
import {companyUrl, serviceUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';

test.beforeEach(async () => {
	await SlackProvider.getSlackSecret();
	await baseDriverSteps.createsNewBrowser();
});

test("Check Slack notification from 'staging_techstack_hr_notify' channel from Contact Us page @Regression @ContactUs @TSWEB-606", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
	await formSteps.sendContactUsMessage();
	const message = await slackSteps.getMessageWithValueFromChat(
		slackDtoVariable.value.stagingTechstackHrNotifyId,
		`Test${sessionValue.stringValue}`
	);

	slackSteps.checkMessageFromHrNotifyChannel(message, {
		name: `Test${sessionValue.stringValue}`,
		lastName: `Automation${sessionValue.stringValue}`,
		email: `Test${sessionValue.stringValue}@test.com`,
		tel: sessionValue.numberValue,
		message: `TestMessage${sessionValue.stringValue}`,
	});
});

// Unskip after https://ts-website.atlassian.net/browse/TSWEB-847
test.skip("Check Slack notification from 'staging_techstack_hr_notify' channel from Apply for a Job page @Regression @ContactUs @TSWEB-606", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(CareerButtons.ApplyNow).click();
	await formSteps.sendApplyForAJob();
	const message = await slackSteps.getMessageWithValueFromChat(
		slackDtoVariable.value.stagingTechstackHrNotifyId,
		`Test${sessionValue.stringValue}`
	);

	slackSteps.checkMessageFromHrNotifyChannel(message, {
		name: `Test${sessionValue.stringValue}`,
		lastName: `Automation${sessionValue.stringValue}`,
		email: `Test${sessionValue.stringValue}@test.com`,
		tel: sessionValue.numberValue,
		message: `TestMessage${sessionValue.stringValue}`,
	});
});

test("Check Slack notification from 'staging_techstack_notify' channel from 'About Us', 'How We Work' and 'Contact Us' pages @Regression @ContactUs @TSWEB-606", async () => {
	const urlList: string[] = [
		companyUrl[CompanyEnum.AboutUs],
		companyUrl[CompanyEnum.HowWeWork],
		UrlProvider.urlBuilder(UrlPath.ContactUs),
	];

	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await formSteps.sendGetInTouchMessage();
		const message = await slackSteps.getMessageWithValueFromChat(
			slackDtoVariable.value.stagingTechstackNotifyId,
			`Test${sessionValue.stringValue}`
		);

		slackSteps.checkMessageFromNotifyChannel(message, {
			firstName: `Test${sessionValue.stringValue}`,
			lastName: `Automation${sessionValue.stringValue}`,
			email: `test${sessionValue.stringValue}@test.com`,
			message: `TestMessage${sessionValue.stringValue}`,
		});
	}
});

test("Check Slack notification from 'staging_techstack_notify' channel from all 'Services' pages @Regression @ContactUs @TSWEB-606", async () => {
	for (const url of Object.values(serviceUrl)) {
		await baseDriverSteps.goToUrl(url);
		await formSteps.sendGetInTouchMessage();
		const message = await slackSteps.getMessageWithValueFromChat(
			slackDtoVariable.value.stagingTechstackNotifyId,
			`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`
		);

		slackSteps.checkMessageFromNotifyChannel(message, {
			fullName: `Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`,
			email: `test${sessionValue.stringValue}@test.com`,
			message: `TestMessage${sessionValue.stringValue}`,
		});
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
