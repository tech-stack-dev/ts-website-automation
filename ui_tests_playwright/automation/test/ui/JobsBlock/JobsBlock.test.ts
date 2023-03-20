import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import {contentfulSteps} from '../../../steps/contentful/ContentfulSteps';
import {careerSteps} from '../../../steps/careerPageSteps/CareerSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		'CheckBreadcrumbsTest',
		'defaultTestCareer',
		'defaultTestDescription'
	);
});

test('Check that breadcrumbs displays correctly on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated('CheckBreadcrumbsTest');
	await careerSteps.clickOnCareerCard('CheckBreadcrumbsTest');
	expect(await careerSteps.getBreadcrumbsText()).toBe(
		'Jobs / CheckBreadcrumbsTest'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		'defaultTestCareer',
		'defaultTestDescription'
	);
});
