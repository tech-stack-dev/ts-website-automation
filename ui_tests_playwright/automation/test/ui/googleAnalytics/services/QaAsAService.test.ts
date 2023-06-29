import { Locator, expect, test } from '@playwright/test';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import { driver } from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import QaAsAService from '../../../../identifiers/QaAsAService';
import Container from '../../../../identifiers/Container';
import { googleAnalyticsSteps } from '../../../../steps/api/GoogleAnalyticsSteps';
import Button from '../../../../identifiers/Button';
import SlackProvider from '../../../../providers/SlackProvider';
import { Environment } from '../../../../providers/EnvProvider';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.QaAsAServ, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl);
	await SlackProvider.getSlackSecret();
});

test("Check google analitics for 'QA as a Service' page @Regression @GoogleAnalytics @TSWEB-794", async ({ }, testInfo) => {
	await driver.locator(Button.AcceptCookies).click();
	await driver.Page.reload();
	// const info = driver.getByTestId(QaAsAService.Info);
	// const breadcrumbsButton: Locator = info.locator(Button.BreadcrumbsPrev);
	// await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, "QAasAServBreadServices", "POST", testInfo.title);
	// await baseDriverSteps.goToUrl(pageUrl);

	// const infoRequestQuoteButton: Locator = info.getByTestId(Button.RequestAQuote);
	// await googleAnalyticsSteps.checkGoogleAnalytics(infoRequestQuoteButton, "QAasAServMainRequestQuote", "GET", testInfo.title);

	// const servicesBlockEvents = [
	// 	"QAasAServServiceRegression-testing-on-demand",
	// 	"QAasAServServiceExploratory-and-usability-testing",
	// 	"QAasAServServiceTesting-processes-setup-from-scratch",
	// 	"QAasAServServiceAuditing-existing-company-QA-processes",
	// 	"QAasAServServiceTesting-automation-and-integrating-CI%2FCD"
	// ];
	// const services = driver.getByTestId(QaAsAService.Services);
	// const servicesBlocks = await services.getByTestId(Container.ContainerBlock).all();

	// for (let index = 0; index < servicesBlocks.length; index++) {
	// 	const arrow = servicesBlocks[index].getByTestId(Container.Arrow);
	// 	await googleAnalyticsSteps.checkGoogleAnalytics(arrow, servicesBlockEvents[index], "GET", testInfo.title);
	// }



	// const ourApproachAndAchievements = driver.getByTestId(QaAsAService.OurApproachAndAchievements);
	// const ourApproachRequestQuoteButton: Locator = ourApproachAndAchievements.getByTestId(Button.RequestAQuote);
	// await googleAnalyticsSteps.checkGoogleAnalytics(ourApproachRequestQuoteButton, "QAasAServAchiveRequestQuote", "POST", testInfo.title);

	// const faqBlockEvents = [
	// 	"QAasAServFaq1More",
	// 	"QAasAServFaq2More",
	// 	"QAasAServFaq3More",
	// 	"QAasAServFaq4More",
	// 	"QAasAServFaq5More",
	// 	"QAasAServFaq6More"
	// ];

	// const faq = driver.getByTestId(QaAsAService.Faq);
	// const faqBlocks = await faq.getByTestId(Container.SectionTitle).all();


	// for (let index = 0; index < faqBlocks.length; index++) {
	// 	const arrow = faqBlocks[index].getByTestId(Container.Arrow);
	// 	await googleAnalyticsSteps.checkGoogleAnalytics(arrow, faqBlockEvents[index], "GET", testInfo.title);
	// }

});