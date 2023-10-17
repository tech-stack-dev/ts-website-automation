import { test } from '@playwright/test';
import { driver } from '../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import RelatedArticles from '../../../../identifiers/MainSite/RelatedArticles';
import IoTEngineeringServices from '../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import { ExpertNames } from '../../../../preconditionsData/ExpertNames';
import { Environment } from '../../../../providers/EnvProvider';
import SlackProvider from '../../../../providers/SlackProvider';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import { googleAnalyticsSteps } from '../../../../steps/api/GoogleAnalyticsSteps';
import { stringUtils } from '../../../../utils/StringUtils';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.InternetOfThings, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl, true);
	await SlackProvider.getSlackSecret();
	await driver.Page.reload();
});

test.skip('Check google analytics for "InternetOfThings" page @Regression @GoogleAnalytics @TSWEB-1069', async ({ }, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.Info);
	const breadcrumbsButton = info.getByTestId(Container.BreadcrumbsPrev);

	await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, 'IoTServBreadServices', testInfo.title);

	let requestQuoteButton = info.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServMainRequestQuote', testInfo.title);

	const technologyStackByLayers = driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers);
	requestQuoteButton = technologyStackByLayers.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServTechStackRequestQuote', testInfo.title);

	const engineeringProcess = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	requestQuoteButton = engineeringProcess.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServNewIoTRequestQuote', testInfo.title);

	const carouselNextButton = engineeringProcess.getByTestId(Container.CarouselButtonNext);
	const carouselPrevButton = engineeringProcess.getByTestId(Container.CarouselButtonPrev);

	await googleAnalyticsSteps.checkGoogleAnalytics(carouselNextButton, 'IoTServProcNext', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(carouselPrevButton, 'IoTServProcPrev', testInfo.title);

	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	let events = [
		`${ExpertNames.IvanIeremenko}`,
		`${ExpertNames.OleksiiSvystun}`,
		`${ExpertNames.YevheniiKarachevtsev}`,
	].map((name) => `IoTServTeamBlog-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < expertCards.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(
			expertCards[i].getByTestId(Buttons.Blog),
			events[i],
			testInfo.title
		);
	}

	events = [
		`${ExpertNames.IvanIeremenko}`,
		`${ExpertNames.OleksiiSvystun}`,
		`${ExpertNames.YevheniiKarachevtsev}`,
	].map((name) => `IoTServTeamIn-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < expertCards.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(
			expertCards[i].getByTestId(Buttons.LinkedIn),
			events[i],
			testInfo.title
		);
	}

	const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
	const serviceArrows = await relatedServicesContainer.getByTestId(Container.Arrow).all();
	const serviceNames = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	events = serviceNames.map((name) => `IoTServRelServices-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < serviceArrows.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(serviceArrows[i], events[i], testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);
	}

	const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
	const arrows = await faqContainer.getByTestId(Container.Arrow).all();
	events = ['IoTServFaq1More', 'IoTServFaq2More', 'IoTServFaq3More'];

	for (let i = 0; i < arrows.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(arrows[i], events[i], testInfo.title);
	}

	const relatedArticlesContainer = driver.getByTestId(IoTEngineeringServices.RelatedArticles);
	const articles = await relatedArticlesContainer.getByTestId(RelatedArticles.ArticleItem).all();
	const articleNames = await relatedArticlesContainer.getByTestId(RelatedArticles.ArticleTitle).allInnerTexts();
	events = articleNames.map((name) => `IoTServArticle-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < articles.length - 1; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(articles[i], events[i], testInfo.title);
	}

	const sendRequestButton = driver.Page.getByTestId(Buttons.Send);
	const attachFilesButton = driver.getByTestId(Buttons.AttachFiles);

	await googleAnalyticsSteps.checkGoogleAnalytics(sendRequestButton, 'IoTServSendMessageClick%20', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(attachFilesButton, 'IoTServSendMessageAddFile', testInfo.title);

	await attachFilesButton.setInputFiles('automation/resources/test.pdf');
	const cancelButton = driver.getByTestId(Buttons.Cancel);

	await googleAnalyticsSteps.checkGoogleAnalytics(cancelButton, 'IoTServSendMessageDelFile', testInfo.title);

	/* TODO: Update checkGoogleAnalytics to accept multiple events to uncomment
	formSteps.fillGetInTouchForm();

	await googleAnalyticsSteps.checkGoogleAnalytics(
		sendRequestButton,
		['IoTServSendMessageClick%20', 'IoTServSendMessageCompl'],
		testInfo.title
	);
	*/
});
