import {Locator, test} from '@playwright/test';
import {startCase} from 'lodash';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import CaseStudies from '../../../../identifiers/mainSite/CaseStudies';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import QaAsAService from '../../../../identifiers/mainSite/pages/services/QaAsAService';
import {Environment} from '../../../../providers/EnvProvider';
import SlackProvider from '../../../../providers/SlackProvider';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {googleAnalyticsSteps} from '../../../../steps/api/GoogleAnalyticsSteps';
import {qase} from 'playwright-qase-reporter/dist/playwright';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.QaAsAServ, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl);
	await SlackProvider.getSlackSecret();
});

// Need to check why checks related to case study failed
test.skip(
	qase(5331, 'Check google analytics for "QA as a Service" page @desktop @Regression @GoogleAnalytics @TSWEB-794'),
	async ({}, testInfo) => {
		await driver.Page.waitForTimeout(10000);
		await driver.Page.reload();

		const info = driver.getByTestId(QaAsAService.Info);
		const breadcrumbsButton: Locator = info.getByTestId(Container.BreadcrumbsPrev);
		await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, 'QAasAServBreadServices', testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);

		const infoRequestQuoteButton: Locator = info.getByTestId(MainSiteButtons.RequestAQuote);
		await googleAnalyticsSteps.checkGoogleAnalytics(
			infoRequestQuoteButton,
			'QAasAServMainRequestQuote',
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
			await googleAnalyticsSteps.checkGoogleAnalytics(arrow, servicesBlockEvents[index], testInfo.title);
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
			await googleAnalyticsSteps.checkGoogleAnalytics(caseCard, caseEventsList[index], testInfo.title);
			await baseDriverSteps.goToUrl(pageUrl);
		}

		const ourApproachAndAchievements = driver.getByTestId(QaAsAService.OurApproachAndAchievements);
		const ourApproachRequestQuoteButton: Locator = ourApproachAndAchievements.getByTestId(
			MainSiteButtons.RequestAQuote
		);
		await googleAnalyticsSteps.checkGoogleAnalytics(
			ourApproachRequestQuoteButton,
			'QAasAServAchiveRequestQuote',
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
			await googleAnalyticsSteps.checkGoogleAnalytics(arrowList[index], faqBlockEvents[index], testInfo.title);
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
		// 	await googleAnalyticsSteps.checkGoogleAnalytics(articleItem, articlesEventsList[index], testInfo.title);
		// }
	}
);
