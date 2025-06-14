import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import CareerButtons from '../../../../identifiers/career/CareerButtons';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {slackSteps} from '../../../../steps/api/SlackSteps';
import {formSteps} from '../../../../steps/ui/FormSteps';
import UrlPath from '../../../../providers/UrlPath';
import SlackProvider from '../../../../providers/SlackProvider';
import {slackDtoVariable} from '../../../../runtimeVariables/dto/SlackDtoVariable';
import Navigation from '../../../../identifiers/career/Navigation';
import {
	companyUrl,
	industryUrl,
	serviceUrlWithoutWebflow,
	webflowPages,
} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import {careerSteps, containerSteps, test} from '../../../../fixtures/DesktopMobileSetup';
import AboutUsCareer from '../../../../identifiers/career/pages/AboutUsCareer';
import {validGetInTouchData} from '../../../../dto/FormDto';

test.beforeEach(async () => {
	await SlackProvider.getSlackSecret();
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(
	qase(
		5461,
		'Check Slack notification from "staging_techstack_hr_notify" channel from Contact Us page @desktop @mobile @Regression @ContactUs @TSWEB-606'
	),
	async () => {
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
	}
);

test(
	qase(
		5460,
		'Check Slack notification from "staging_techstack_hr_notify" channel from Apply for a Job page @desktop @mobile @Regression @ApplyForAJob @TSWEB-606'
	),
	async () => {
		await contentfulSteps.createCareerWithDefaultValue(
			`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
		);
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		(
			await containerSteps.getDynamicLocator({
				desktopLocator: CareerButtons.ApplyNow,
				mobileLocator: AboutUsCareer.ApplyNowButton,
			})
		).click();
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

		await contentfulSteps.deleteAndUnpublishCareer(
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
		);
	}
);

test(
	qase(
		5462,
		'Check Slack notification from "staging_techstack_notify" channel from "Home", "About Us", "How We Work", "Contact Us" and "Pricing" pages @desktop @mobile @Regression @GetInTouchExtended @TSWEB-606'
	),
	async () => {
		const urlList: string[] = [
			UrlProvider.webSiteUrl(),
			companyUrl[CompanyEnum.AboutUs],
			companyUrl[CompanyEnum.HowWeWork],
			UrlProvider.urlBuilder(UrlPath.ContactUs),
			companyUrl[CompanyEnum.Pricing],
		];

		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			await formSteps.sendGetInTouchMessage();
			const message = await slackSteps.getMessageWithValueFromChat(
				slackDtoVariable.value.stagingTechstackNotifyId,
				validGetInTouchData.firstName
			);

			slackSteps.checkMessageFromNotifyChannel(message, validGetInTouchData);
		}
	}
);

test(
	qase(
		5464,
		'Check Slack notification from "staging_techstack_notify" channel from all "Services" pages @desktop @mobile @Regression @GetInTouchShort @TSWEB-606'
	),
	async () => {
		for (const url of Object.values(serviceUrlWithoutWebflow)) {
			if (!webflowPages.includes(url)) {
				await baseDriverSteps.goToUrl(url);
				await formSteps.sendGetInTouchMessage();
				const message = await slackSteps.getMessageWithValueFromChat(
					slackDtoVariable.value.stagingTechstackNotifyId,
					validGetInTouchData.firstName
				);

				slackSteps.checkMessageFromNotifyChannel(message, validGetInTouchData);
			}
		}
	}
);

test(
	qase(
		5463,
		'Check Slack notification from "staging_techstack_notify" channel from all "Industries" pages @desktop @mobile @Regression @GetInTouchShort @TSWEB-606'
	),
	async () => {
		const urlList: string[] = Object.values(industryUrl);

		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			await formSteps.sendGetInTouchMessage();
			const message = await slackSteps.getMessageWithValueFromChat(
				slackDtoVariable.value.stagingTechstackNotifyId,
				validGetInTouchData.firstName
			);

			slackSteps.checkMessageFromNotifyChannel(message, validGetInTouchData);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
