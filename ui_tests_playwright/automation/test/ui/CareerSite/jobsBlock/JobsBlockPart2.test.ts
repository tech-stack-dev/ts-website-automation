import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../../steps/careerPageSteps/CareerSteps';
import Job from '../../../../identifiers/Job';
import {SocialMediaLinksEnum} from '../../../../enum/SocialMediaLinksEnum';
import {driver} from '../../../../base/driver/Driver';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test('Check job description fields @Regression @JobsBlock @TSWEB-146', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	expect(
		await careerSteps.checkSocialMediaButtonRedirect(Job.TwitterShare, SocialMediaLinksEnum.Twitter)
	).toBeTruthy();
	expect(
		await careerSteps.checkSocialMediaButtonRedirect(Job.FacebookShare, SocialMediaLinksEnum.Facebook)
	).toBeTruthy();
	expect(
		await careerSteps.checkSocialMediaButtonRedirect(Job.LinkedInShare, SocialMediaLinksEnum.LinkedId)
	).toBeTruthy();

	expect(await driver.getByTestId(Job.AboutTheProductBlock).textContent()).toEqual('About the product:TypeScript test');
	expect(await driver.getByTestId(Job.TechnologyStackBlock).textContent()).toEqual('Technology stack:TypeScript testTS');
	expect(await driver.getByTestId(Job.AboutTheRoleBlock).textContent()).toEqual('About the role:TypeScript test');
	expect(await driver.getByTestId(Job.YouWillBlock).textContent()).toEqual('You will:TypeScript test');
	expect(await driver.getByTestId(Job.YouBlock).textContent()).toEqual('You:TypeScript test');
	expect(await driver.getByTestId(Job.WeWillBlock).textContent()).toEqual('We will:TypeScript test');
	expect(await driver.getByTestId(Job.WeBlock).textContent()).toEqual('We:TypeScript test');
	const applyJobText = await careerSteps.getApplyJobContent();
	expect(applyJobText).toEqual('Would you like to be a part of our team?Apply now!');
});

test('Check pagination on "Career" page @Regression @JobsBlock @TSWEB-146', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
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
// wtf
	await contentfulSteps.deleteAndUnpublishManyCareersCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`,
		12
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
