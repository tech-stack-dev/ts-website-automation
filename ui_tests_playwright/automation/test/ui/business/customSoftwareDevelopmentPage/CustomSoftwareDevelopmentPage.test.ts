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
	const sections = [
		{number: '01', title: `Custom software development for your product`, parent: CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct},
		{number: '02', title: `Custom\ndevelopment\nservices we provide`, parent: CustomSoftwareDevelopent.CustomSoftwareDevelopmentServicesWeProvide},
		{number: '03', title: `Technology\nstack`, parent: CustomSoftwareDevelopent.TechnologyStack},
		{number: '04', title: `Custom software development benefits`, parent: CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits},
		{number: '05', title: `Custom software development process`, parent: CustomSoftwareDevelopent.CustomSoftwareDevelopmentProcess},
		{number: '06', title: `Custom software\ndevelopment experts`, parent: CustomSoftwareDevelopent.CustomSoftwareDevelopmentExperts},
		{number: '07', title: `Case studies`, parent: CustomSoftwareDevelopent.CaseStudies},
		{number: '08', title: `Our approach \nto software\ndevelopment`, parent: CustomSoftwareDevelopent.OurApproachToSoftwareDevelopment},
		{number: '09', title: `FAQ`, parent: CustomSoftwareDevelopent.Faq},
		{number: '10', title: `Related \n	articles`, parent: CustomSoftwareDevelopent.RelatedArticles},
	]
	for (const section of sections){
		const parent = driver.getByTestId(section.parent);
		await expect(parent.getByTestId(Container.ContainerTitle)).toHaveText(section.title);
		await expect(parent.getByTestId(Container.ContainerNumber)).toHaveText(section.number);
	}
});

test(`Check section titles and numbers on the 'Custom software development' page @Regression @CustomSoftwareDevelopent @TSWEB-672`, async () => {
	const sections = [
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct, number: '01', title: 'Product MVP Development'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct, number: '02', title: 'Scaling Software Product Team and Processes'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct, number: '03', title: 'Enterprise Software Development'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentForYourProduct, number: '04', title: 'Industry-Specific Software Development'},
		
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits, number: '01', title: 'Retain clients'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits, number: '02', title: 'Improve performance'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits, number: '03', title: 'Unlock new opportunities'},
		{parentSection:CustomSoftwareDevelopent.CustomSoftwareDevelopmentBenefits, number: '04', title: 'Iterate fast'},
	]
	
	for (const section of sections) {
		const index = parseInt(section.number)-1;
		const item = await driver.getByTestId(section.parentSection).getByTestId(/ContainerSection/).nth(index);
		await expect(item.getByTestId(Container.SectionTitle)).toHaveText(section.title);
		await expect(item.getByTestId(Container.SectionNumber)).toHaveText(section.number);
	}

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
		await section.items?.forEach(async function(value,i){
		const item = await driver.getByTestId(section.parentSection).getByTestId(/ContainerSection/).nth(i);
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
		await section.items?.forEach(async function(value,i){
			const item = await driver.getByTestId(section.parentSection).getByTestId(/SectionItem/).nth(i);
			await expect(item.getByTestId(section.title)).toHaveText(value);
	})
}
}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
