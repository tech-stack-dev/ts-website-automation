import {Locator, expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import Button from '../../../../identifiers/Button';
import CustomSoftwareDevelopent from '../../../../identifiers/CustomSoftwareDevelopment';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test(`Check page title and 'Request a quote' buttons on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	await expect(driver.getByTestId(Container.Title)).toHaveText(
		'We are experts in the custom software development services'
	);
	const sections = [
		CustomSoftwareDevelopent.TopSection,
		CustomSoftwareDevelopent.TechnologyStack,
		CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess,
	];
	for (const section of sections) {
		expect(driver.getByTestId(section).getByTestId(Button.RequestAQuoteButton)).toBeVisible();
	}
});

test(`Check container titles and numbers on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
			{ parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct,  
				items: [
					{number:'01',title:'Product MVP Development'}, 
					{number:'02',title:'Scaling Software Product Team and Processes'}, 
					{number:'03',title:'Enterprise Software Development'},
					{number:'04',title:'Industry-Specific Software Development'}]
			},
			{ parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits,  
				items: [
					{number:'01',title:'Retain clients'},
					{number:'02',title:'Improve performance'}, 
					{number:'03',title:'Unlock new opportunities'}, 
					{number:'04',title:'Iterate fast'}]
			}
		]

	for (const section of testData) {
		section.items?.forEach(async function(value,i){
		const item = driver.getByTestId(section.parentSection).getByTestId(/ContainerSection/).nth(i);
		await expect(item.getByTestId(Container.SectionTitle)).toHaveText(value.title);
		await expect(item.getByTestId(Container.SectionNumber)).toHaveText(value.number);
	});
}});

test(`Check section titles on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const testData = [
		{ parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts, 
			items: ['Tech Experts Team', 'Development Team', 'Management Team'],
			title: Container.SectionTitle
		},
		{ parentSection: CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment,
			items: ['Tech community', 'Ownership over products', 'Proven expertise'],
			// will be removed after fix on UI
			title: Container.SectionName
		}
	]

	for (const section of testData) {
		section.items?.forEach(async function(value,i){
			const item = driver.getByTestId(section.parentSection).getByTestId(/SectionItem/).nth(i);
			await expect(item.getByTestId(section.title)).toHaveText(value);
	})
}
}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
