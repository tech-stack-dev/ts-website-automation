import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import { careerSteps, expect, test } from '../../../../fixtures/DesktopMobileSetup';
import Job from '../../../../identifiers/Job';
import {SocialMediaLinksEnum} from '../../../../enum/SocialMediaLinksEnum';
import {driver} from '../../../../base/driver/Driver';
import {ColorsEnum} from '../../../../enum/ColorsEnum';
import {locatorUtils} from '../../../../utils/LocatorUtils';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.describe('With one precondition vacancy', () => {
	test.beforeEach(async () => {
		await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
		await contentfulSteps.createCareerWithDefaultValue(
			`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
		);
	});

	test(qase(5480, 'Check job description fields @Regression @JobsBlock @TSWEB-146'), async () => {
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
		const twitter = await careerSteps.checkSocialMediaButtonRedirect(
			Job.TwitterShare,
			SocialMediaLinksEnum.Twitter
		);
		const facebook = await careerSteps.checkSocialMediaButtonRedirect(
			Job.FacebookShare,
			SocialMediaLinksEnum.Facebook
		);
		const linked = await careerSteps.checkSocialMediaButtonRedirect(
			Job.LinkedInShare,
			SocialMediaLinksEnum.LinkedId
		);
		expect(twitter).toBeTruthy();
		expect(facebook).toBeTruthy();
		expect(linked).toBeTruthy();
		expect(await driver.getByTestId(Job.AboutTheProductBlock).textContent()).toEqual(
			'About the productIntroTypeScript test_1'
		);
		expect(await driver.getByTestId(Job.YourTeam).textContent()).toEqual('Your teamTypeScript test_1');
		expect(await driver.getByTestId(Job.Culture).textContent()).toEqual('CultureTypeScript test_1');
		expect(await driver.getByTestId(Job.YourResponsibilities).textContent()).toEqual(
			'Your responsibilitiesTypeScript test'
		);
		expect(await driver.getByTestId(Job.ItsAboutYou).textContent()).toEqual("It's about youTypeScript test_1");
		expect(await driver.getByTestId(Job.WhatWeHaveForYou).textContent()).toEqual(
			'What we have\nfor youTypeScript test_1'
		);
		expect(await driver.getByTestId(Job.HowToJoinTechstack).textContent()).toEqual(
			'How to join\nTechstackTypeScript test_1'
		);
		expect(await driver.getByTestId(Job.AboutUs).textContent()).toEqual('About usTypeScript test_1');
		const applyJobText = await careerSteps.getApplyJobContent();
		expect(applyJobText).toEqual("Want to make an impact?You're in the right place. Apply for a position!");
	});

	test.afterEach(async () => {
		await driver.closeDrivers();
		await contentfulSteps.deleteAndUnpublishCareer(
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
		);
	});
});

test.describe('with many precondition vacancy', () => {
	test.beforeEach(async () => {
		await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
		await contentfulSteps.createManyCareersWithDefaultValue(
			`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`,
			12
		);
		await careerSteps.verifyThatManyCareersWasCreated(
			`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
			12
		);
	});

	test(qase(5260, 'Check pagination on "Career" page @desktop @mobile @Regression @JobsBlock @TSWEB-146'), async () => {
		await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
		const nextButton = await careerSteps.getPaginationNavigationArrowButton('Next');
		expect(await nextButton.isVisible()).toBeTruthy();
		const firstPageButton = await careerSteps.getPaginationNumberButton(1);
		expect(await locatorUtils.checkBackgroundColor(firstPageButton, ColorsEnum.Yellow_FFC600)).toBeTruthy();
		await nextButton.click();
		const secondPageButton = await careerSteps.getPaginationNumberButton(2);
		await driver.Page.waitForTimeout(1000); // Timeout for page reloading and getting correct button background
		expect(await locatorUtils.checkBackgroundColor(secondPageButton, ColorsEnum.Yellow_FFC600)).toBeTruthy();
		const prevButton = await careerSteps.getPaginationNavigationArrowButton('Prev');
		expect(await prevButton.isVisible()).toBeTruthy();
	});

	test.afterEach(async () => {
		await driver.closeDrivers();
		await contentfulSteps.deleteAndUnpublishManyCareersCareer(
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`,
			12
		);
	});
});
