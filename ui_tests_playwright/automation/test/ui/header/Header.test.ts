import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import UrlPath from '../../../providers/UrlPath';
import ContactUsPreconditions from '../../../preconditionsData/uiPreconditions/ContactUsPreconditions';
import Link from '../../../identifiers/Link';
import {Environment} from '../../../providers/EnvProvider';
import Button from '../../../identifiers/Button';
import Colors from '../../../preconditionsData/uiPreconditions/Colors';

const testDataProvider = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.OpenCase),
	UrlProvider.urlBuilder(UrlPath.ArticlePageDescription),
	UrlProvider.urlBuilder(UrlPath.AuthorPage),
]
	.concat(ContactUsPreconditions.servicesUrlList)
	.concat(ContactUsPreconditions.companyUrlList);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

for (const url of testDataProvider) {
	test(`Check the redirect to the main page by clicking on the TS logo in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Link.HeaderLogo).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	});

	test(`Hovering the mouse over the menu buttons highlights the buttons text in #FFC600 color in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.Menu).click();
		const menuHeaderslist = [
			driver.getByTestId(Button.Menu_Services),
			driver.getByTestId(Button.Menu_Company),
			driver.getByTestId(Button.Menu_ContactUs).getByText('Contact Us'),
		];

		for (const header of menuHeaderslist) {
			await driver.executeFunc(async () => {
				await header.hover();
				const color = await header.evaluate((node) => {
					return window.getComputedStyle(node).getPropertyValue('color');
				});
				expect(color).toBe(Colors.FFC600);
			}, 5);
		}
	});

	test(`Check the redirection for the Services block in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const servicesList = [
			Button.Services_OurServices,
			Button.Services_CustomDev,
			Button.Services_CloudAndDev,
			Button.Services_BigData,
			Button.Services_AiMl,
			Button.Services_InternetOfThings,
			Button.Services_MobileDev,
			Button.Services_UiUxDesign,
			Button.Services_QaAsAServ,
			Button.Services_ConsultingServ,
		];

		for (let index = 0; index < servicesList.length; index++) {
			await driver.getByTestId(Button.Menu).click();
			await driver.getByTestId(Button.Menu_Services).click();
			await driver.getByTestId(servicesList[index]).click();
			await baseDriverSteps.checkUrl(ContactUsPreconditions.servicesUrlList[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Company block in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const companyUrlList: Array<string> = [
			UrlProvider.urlBuilder(UrlPath.AboutUs),
			UrlProvider.urlBuilder(UrlPath.HowWeWork),
			UrlProvider.careerUrl(Environment.Production),
			UrlProvider.urlBuilder(UrlPath.CaseStudies),
			UrlProvider.urlBuilder(UrlPath.Blog),
		];

		const companyList = [
			Button.Company_AboutUs,
			Button.Company_HowWeWork,
			Button.Company_Career,
			Button.Company_CaseStudies,
			Button.Company_Blog,
		];

		for (let index = 0; index < companyList.length; index++) {
			await driver.getByTestId(Button.Menu).click();
			await driver.getByTestId(Button.Menu_Company).click();
			await driver.getByTestId(companyList[index]).click();
			await baseDriverSteps.checkUrl(companyUrlList[index]);
			await baseDriverSteps.goToUrl(url);
		}
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
