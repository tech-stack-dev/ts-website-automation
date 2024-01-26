import { Locator, expect, test } from '@playwright/test';
import { driver } from '../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import { ColorsEnum } from '../../../../enum/ColorsEnum';
import Header from '../../../../identifiers/mainSite/Header';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import Buttons from '../../../../identifiers/Buttons';
import { qase } from 'playwright-qase-reporter/dist/playwright';

let buttonHeaderslist: Locator[];
let industriesDropdownButton: Locator;
let servicesDropdownButton: Locator;
let companyDropdownButton: Locator;
let header: Locator;


const testDataProvider: string[] = [
    UrlProvider.webSiteUrl(),
    UrlProvider.urlBuilder(UrlPath.Healthcare),
    UrlProvider.urlBuilder(UrlPath.QaAsAServ),
    UrlProvider.urlBuilder(UrlPath.CaseStudies),
    UrlProvider.urlBuilder(UrlPath.Pricing),
    UrlProvider.urlBuilder(UrlPath.ContactUs),
    UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
    UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
];

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();

    header = driver.locator(Header.ContainerMenu);
	industriesDropdownButton = header.getByTestId(Header.Industries);
	servicesDropdownButton = header.getByTestId(Header.Services);
	companyDropdownButton = header.getByTestId(Header.Company);
	buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

});

test(
    qase(
        5505,
        `Check buttons background color after clicking on it in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
    ),
    async () => {
        // const industriesDropdownButton = driver.locator('//label[@for="industries-menu-min"]');
        // const servicesDropdownButton = driver.locator('//label[@for="servicesMenu"]');
        // const companyDropdownButton = driver.locator('//label[@for="companyMenu"]');
        
        for (const url of testDataProvider) {
            await baseDriverSteps.goToUrl(url);
            // const buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

            // const buttons = driver.locator('//label[@class="tab-label"]');
            const elemetColor = driver.locator('//preceding-sibling::div//div');
            
            await driver.getByTestId(Header.Menu).click();

            for (const button of buttonHeaderslist) {
				await button.click();
				await driver.getByTestId(Buttons.Close).hover();
				await driver.Page.waitForTimeout(1000); // Wait for changing color

				const actualColor = await button.locator(elemetColor).evaluate(async (el) => {
					return getComputedStyle(el).color;
				});

				expect(actualColor).toBe(ColorsEnum.Yellow_FFC600);
			}

            // for (const button of await buttons.all()) {
            //     await button.click();
            //     await driver.getByTestId(Buttons.Close).hover();

            //     await driver.Page.waitForTimeout(1000);

            //     const actualColor = await button.locator(elemetColor).evaluate(async (el) => {
            //         return getComputedStyle(el).color;
            //     });

            //     expect(actualColor).toBe(ColorsEnum.Yellow_FFC600);
            // }
        }
    }
);

test.afterEach(async () => {
    await driver.closeDrivers();
});
