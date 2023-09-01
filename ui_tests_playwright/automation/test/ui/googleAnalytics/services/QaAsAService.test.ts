import {Locator, test} from '@playwright/test';
import {startCase} from 'lodash';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import {googleAnalyticsSteps} from '../../../../steps/api/GoogleAnalyticsSteps';
import SlackProvider from '../../../../providers/SlackProvider';
import {Environment} from '../../../../providers/EnvProvider';
import Buttons from '../../../../identifiers/Buttons';
import CaseStudies from '../../../../identifiers/MainSite/CaseStudies';
import RelatedArticles from '../../../../identifiers/MainSite/RelatedArticles';
import QaAsAService from '../../../../identifiers/MainSite/pages/services/QaAsAService';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.QaAsAServ, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl);
	await SlackProvider.getSlackSecret();
});

test("Check google analytics for 'QA as a Service' page @Regression @GoogleAnalytics @TSWEB-794", async ({}, testInfo) => {
	await driver.Page.waitForTimeout(10000);
	await driver.Page.getByTestId(Buttons.AcceptCookies).nth(1).click();
	await driver.Page.reload();

	const info = driver.getByTestId(QaAsAService.Info);
	const breadcrumbsButton: Locator = info.getByTestId(Container.BreadcrumbsPrev);
	await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, 'QAasAServBreadServices', 'GET', testInfo.title);
	await baseDriverSteps.goToUrl(pageUrl);

	const infoRequestQuoteButton: Locator = info.getByTestId(MainSiteButtons.RequestAQuote);
	await googleAnalyticsSteps.checkGoogleAnalytics(
		infoRequestQuoteButton,
		'QAasAServMainRequestQuote',
		'GET',
		testInfo.title
	);

	const servicesBlockEvents = [
		'QAasAServServiceRegression-testing-on-demand',
		'QAasAServServiceExploratory-and-usability-testing',
		'QAasAServServiceTesting-processes-setup-from-scratch',
		'QAasAServServiceAuditing-existing-company-QA-processes',
		'QAasAServServiceTesting-automation-and-integrating-CI%2FCD',
	];
	const services = driver.getByTestId(QaAsAService.Services);
	const servicesBlocks = await services.getByTestId(Container.ContainerBlock).all();

	for (let index = 0; index < servicesBlocks.length; index++) {
		const arrow = servicesBlocks[index].getByTestId(Container.Arrow);
		await googleAnalyticsSteps.checkGoogleAnalytics(arrow, servicesBlockEvents[index], 'GET', testInfo.title);
	}

	const caseStudies = driver.getByTestId(QaAsAService.CaseStudies);
	const caseCardList = await caseStudies.getByTestId(CaseStudies.CaseCard).all();
	const caseNameList = await caseStudies.getByTestId(CaseStudies.CaseName).allTextContents();
	const baseCaseStudiesEvent = 'QAasAServCase';
	const caseEventsList = caseNameList.map((name) => {
		return `${baseCaseStudiesEvent}${startCase(name).replace(/\s/g, '')}`;
	});

	for (let index = 0; index < 3; index++) {
		const caseCard = caseCardList[index];
		await googleAnalyticsSteps.checkGoogleAnalytics(caseCard, caseEventsList[index], 'GET', testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);
	}

	const ourApproachAndAchievements = driver.getByTestId(QaAsAService.OurApproachAndAchievements);
	const ourApproachRequestQuoteButton: Locator = ourApproachAndAchievements.getByTestId(
		MainSiteButtons.RequestAQuote
	);
	await googleAnalyticsSteps.checkGoogleAnalytics(
		ourApproachRequestQuoteButton,
		'QAasAServAchiveRequestQuote',
		'GET',
		testInfo.title
	);

	const faqBlockEvents = [
		'QAasAServFaq1More',
		'QAasAServFaq2More',
		'QAasAServFaq3More',
		'QAasAServFaq4More',
		'QAasAServFaq5More',
		'QAasAServFaq6More',
	];

	const faq = driver.getByTestId(QaAsAService.Faq);
	const arrowList = await faq.getByTestId(Container.Arrow).all();

	for (let index = 0; index < arrowList.length; index++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(arrowList[index], faqBlockEvents[index], 'GET', testInfo.title);
	}

	// Unstable prod blog

	// const relatedArticles = driver.getByTestId(QaAsAService.RelatedArticles);
	// const ArticleItemList = await relatedArticles.getByTestId(RelatedArticles.ArticleItem).all();
	// const ArticleTitleList = await relatedArticles.getByTestId(RelatedArticles.ArticleTitle).allTextContents();
	// const baseRelatedArticlesEvent = 'QAasAServArticle-';
	// const articlesEventsList = ArticleTitleList.map((name) => {
	// 	return `${baseRelatedArticlesEvent}${name.replace(/\s+/g, '-')}`;
	// });

	// for (let index = 0; index < 3; index++) {
	// 	const articleItem = ArticleItemList[index];
	// 	await googleAnalyticsSteps.checkGoogleAnalytics(articleItem, articlesEventsList[index], 'GET', testInfo.title);
	// }
});
