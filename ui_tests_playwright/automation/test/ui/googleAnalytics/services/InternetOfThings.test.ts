import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import RelatedArticles from '../../../../identifiers/MainSite/RelatedArticles';
import IoTEngineeringServices from '../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import {ExpertNames} from '../../../../preconditionsData/ExpertNames';
import {Environment} from '../../../../providers/EnvProvider';
import SlackProvider from '../../../../providers/SlackProvider';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {googleAnalyticsSteps} from '../../../../steps/api/GoogleAnalyticsSteps';
import {stringUtils} from '../../../../utils/StringUtils';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.InternetOfThings, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl, true);
	await SlackProvider.getSlackSecret();
	await driver.Page.reload();
});

test.skip('Check google analytics in breadcrumbs. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.Info);
	const breadcrumbsButton = info.getByTestId(Container.BreadcrumbsPrev);

	await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, 'IoTServBreadServices', testInfo.title);
});

test.skip('Check google analytics by "Request a quote" button in "Info" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.Info);
	const requestQuoteButton = info.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServMainRequestQuote', testInfo.title);
});

test.skip('Check google analytics by "Request a quote" button in "IoT Technology Stack by Layers" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers);
	const requestQuoteButton = info.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServTechStackRequestQuote', testInfo.title);
});

test.skip('Check google analytics by "Request a quote" button in "IoT Engineering Process" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	const requestQuoteButton = info.getByTestId(MainSiteButtons.RequestAQuote);

	await googleAnalyticsSteps.checkGoogleAnalytics(requestQuoteButton, 'IoTServNewIoTRequestQuote', testInfo.title);
});

test.skip('Check google analytics by carousel buttons in "IoT Engineering Process" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const info = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	const carouselNextButton = info.getByTestId(Container.CarouselButtonNext);
	const carouselPrevButton = info.getByTestId(Container.CarouselButtonPrev);

	await googleAnalyticsSteps.checkGoogleAnalytics(carouselNextButton, 'IoTServProcNext', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(carouselPrevButton, 'IoTServProcPrev', testInfo.title);
});

test.skip('Check google analytics by Blog buttons in "Our Internet of Things Engineering Experts" container. @Regression @GoogleAnalytics @TSWEB-1069, @TSWEB-1061', async ({}, testInfo) => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const events = [
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
});

test.skip('Check google analytics by LinkedIn buttons in "Our Internet of Things Engineering Experts" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const events = [
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
});

test.skip('Check google analytics by arrows in "Related Services" container. @Regression @GoogleAnalytics @TSWEB-1069, @TSWEB-1061, @TSWEB-1083', async ({}, testInfo) => {
	const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
	const serviceArrows = await relatedServicesContainer.getByTestId(Container.Arrow).all();
	const serviceNames = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const events = serviceNames.map((name) => `IoTServRelServices-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < serviceArrows.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(serviceArrows[i], events[i], testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);
	}
});

test.skip('Check google analytics by arrows in "FAQ" container. @Regression @GoogleAnalytics @TSWEB-1069', async ({}, testInfo) => {
	const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
	const arrows = await faqContainer.getByTestId(Container.Arrow).all();
	const events = ['IoTServFaq1More', 'IoTServFaq2More', 'IoTServFaq3More'];

	for (let i = 0; i < arrows.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(arrows[i], events[i], testInfo.title);
	}
});

test.skip('Check google analytics by cards in "Related Articles" container. @Regression @GoogleAnalytics @TSWEB-1069, @TSWEB-1061', async ({}, testInfo) => {
	const relatedArticlesContainer = driver.getByTestId(IoTEngineeringServices.RelatedArticles);
	const articles = await relatedArticlesContainer.getByTestId(RelatedArticles.ArticleItem).all();
	const articleNames = await relatedArticlesContainer.getByTestId(RelatedArticles.ArticleTitle).allInnerTexts();
	const events = articleNames.map((name) => `IoTServArticle-${stringUtils.encodeForUrl(name)}`);

	for (let i = 0; i < articles.length - 1; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(articles[i], events[i], testInfo.title);
	}
});

test.skip('Check google analytics in "Get in Touch" form. @Regression @GoogleAnalytics @TSWEB-1069, @TSWEB-1090', async ({}, testInfo) => {
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
