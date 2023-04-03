import {test} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import Button from '../../../identifiers/Button';
import {sessionValue} from '../../../runtimeVariables/SessionValue';
import {slackSteps} from '../../../steps/api/SlackSteps';
import {formSteps} from '../../../steps/ui/FormSteps';
import UrlPath from '../../../providers/UrlPath';
import ContactUsPreconditions from '../../../preconditionsData/uiPreconditions/ContactUsPreconditions';
import SlackProvider from '../../../providers/SlackProvider';
import {slackDtoVariable} from '../../../runtimeVariables/dto/SlackDtoVariable';

test.beforeEach(async () => {
	await SlackProvider.getSlackSecret();
	await baseDriverSteps.createsNewBrowser();
});

test("Check Slack notification from 'staging_techstack_hr_notify' channel from Contact Us page @Regression @ContactUs @TSWEB-606", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Button.NavigationTab_ContactUs).click();
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
		messge: `TestMessage${sessionValue.stringValue}`,
	});
});

test("Check Slack notification from 'staging_techstack_hr_notify' channel from Apply for a Job page @Regression @ContactUs @TSWEB-606", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(Button.ApplyNow).click();
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
		messge: `TestMessage${sessionValue.stringValue}`,
	});
});

test("Check Slack notification from 'staging_techstack_notify' channel from 'About Us', 'How We Work' and 'Contact Us' pages @Regression @ContactUs @TSWEB-606", async () => {
	const urlList: Array<string> = [
		UrlProvider.urlBuilder(UrlPath.AboutUs),
		UrlProvider.urlBuilder(UrlPath.HowWeWork),
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
			messge: `TestMessage${sessionValue.stringValue}`,
		});
	}
});

test("Check Slack notification from 'staging_techstack_notify' channel from all 'Services' pages @Regression @ContactUs @TSWEB-606", async () => {
	for (const url of ContactUsPreconditions.servicesUrlList) {
		await baseDriverSteps.goToUrl(url);
		await formSteps.sendGetInTouchMessage();
		const message = await slackSteps.getMessageWithValueFromChat(
			slackDtoVariable.value.stagingTechstackNotifyId,
			`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`
		);

		slackSteps.checkMessageFromNotifyChannel(message, {
			fullName: `Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`,
			email: `test${sessionValue.stringValue}@test.com`,
			messge: `TestMessage${sessionValue.stringValue}`,
		});
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
