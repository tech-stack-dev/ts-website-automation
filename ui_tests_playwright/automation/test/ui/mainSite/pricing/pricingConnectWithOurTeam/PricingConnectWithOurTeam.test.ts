import {test} from '@playwright/test';
import UrlPath from '../../../../../providers/UrlPath';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../../providers/UrlProvider';
import {driver} from '../../../../../base/driver/Driver';
import {formSteps} from '../../../../../steps/ui/FormSteps';
import {slackSteps} from '../../../../../steps/api/SlackSteps';
import {slackDtoVariable} from '../../../../../runtimeVariables/dto/SlackDtoVariable';
import {sessionValue} from '../../../../../runtimeVariables/SessionValue';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Pricing));
	await driver.getByTestId(MainSiteButtons.ChooseThisModel).click();
});

test('Check Slack notification from "staging_techstack_notify" channel from the "Pricing" page @Regression @Pricing @TSWEB-1297', async () => {
	await formSteps.sendConnectWithOurTeamMessage();
	const message = await slackSteps.getMessageWithValueFromChat(
		slackDtoVariable.value.stagingTechstackNotifyId,
		`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`
	);

	slackSteps.checkMessageFromNotifyChannel(message, {
		fullName: `Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`,
		email: `test${sessionValue.stringValue}@test.com`,
		message: `TestMessage${sessionValue.stringValue}`,
	});
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
