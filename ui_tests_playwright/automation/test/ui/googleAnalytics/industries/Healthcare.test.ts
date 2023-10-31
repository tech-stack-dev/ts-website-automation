import {Locator, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSites/MainSiteButtons';
import Healthcare from '../../../../identifiers/MainSites/pages/industries/Healthcare';
import {Environment} from '../../../../providers/EnvProvider';
import SlackProvider from '../../../../providers/SlackProvider';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {googleAnalyticsSteps} from '../../../../steps/api/GoogleAnalyticsSteps';
import RelatedArticles from '../../../../identifiers/MainSites/RelatedArticles';
import {stringUtils} from '../../../../utils/StringUtils';

const pageUrl: string = UrlProvider.urlBuilder(UrlPath.Healthcare, Environment.Production);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(pageUrl);
	await SlackProvider.getSlackSecret();
	await driver.Page.reload();
});

test('Check google analytics for "Healthcare" page @Regression @GoogleAnalytics @TSWEB-1137', async ({}, testInfo) => {
	const info = driver.getByTestId(Healthcare.Info);
	const breadcrumbsButton: Locator = info.getByTestId(Container.BreadcrumbsPrev);
	const infoGetInTouchButton: Locator = info.getByTestId(MainSiteButtons.GetInTouch);

	await googleAnalyticsSteps.checkGoogleAnalytics(breadcrumbsButton, 'HeatlhIndBreadHome', testInfo.title);
	await baseDriverSteps.goToUrl(pageUrl);
	await googleAnalyticsSteps.checkGoogleAnalytics(infoGetInTouchButton, 'HealthIndMainRequestQuote', testInfo.title);

	const ourExpertiseContainer = driver.getByTestId(Healthcare.OurExpertise);
	const scheduleAMeetingNowButton: Locator = ourExpertiseContainer.getByTestId(MainSiteButtons.ScheduleAMeetingNow);

	await googleAnalyticsSteps.checkGoogleAnalytics(
		scheduleAMeetingNowButton,
		'HealthIndExpertiseMeeting',
		testInfo.title
	);

	const beatsScreeningModuleContainer = driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack);
	const clutchButton: Locator = beatsScreeningModuleContainer.getByTestId(Buttons.Clutch);
	const readTheFullCaseStudyutton: Locator = beatsScreeningModuleContainer.getByTestId(
		MainSiteButtons.ReadTheFullCaseStudy
	);

	await googleAnalyticsSteps.checkGoogleAnalytics(clutchButton, 'HealthIndReviewClutch', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(
		readTheFullCaseStudyutton,
		'HealthIndReadCaseStudy',
		testInfo.title
	);

	const mostRecentIndustryFactsContainer = driver.getByTestId(Healthcare.MostRecentIndustryFacts);
	const pwcButton: Locator = mostRecentIndustryFactsContainer.getByTestId(MainSiteButtons.Pwc);
	const mcKinseyButton: Locator = mostRecentIndustryFactsContainer.getByTestId(MainSiteButtons.McKinsey);

	await googleAnalyticsSteps.checkGoogleAnalytics(pwcButton, 'HealthIndFactsPwC', testInfo.title);
	await baseDriverSteps.goToUrl(pageUrl);
	await googleAnalyticsSteps.checkGoogleAnalytics(mcKinseyButton, 'HealthIndFactsMcKinsey', testInfo.title);
	await baseDriverSteps.goToUrl(pageUrl);

	const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);
	const carousel: Locator = howWeOperateContainer.getByTestId(Container.ContainerCarousel);
	const carouselButtonNext: Locator = carousel.getByTestId(Container.CarouselButtonNext);
	const carouselButtonPrev: Locator = carousel.getByTestId(Container.CarouselButtonPrev);
	const scheduleAMeetingButton: Locator = howWeOperateContainer.getByTestId(MainSiteButtons.ScheduleAMeeting);

	await googleAnalyticsSteps.checkGoogleAnalytics(carouselButtonNext, 'HealthIndOperateNext', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(carouselButtonPrev, 'HealthIndOperatePrev', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(scheduleAMeetingButton, 'HealthIndOperateMeeting', testInfo.title);

	const corePracticesEvents = [
		'HealthIndServiceCustomDev',
		'HealthIndServiceCloud',
		'HealthIndServiceBigData',
		'HealthIndServiceIoT',
		'HealthIndServiceAIML',
		'HealthIndServiceMobileApp',
		'HealthIndServiceUIUX',
	];
	const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);
	const arrows = corePracticesContainer.getByTestId(Container.ContainerSection).getByTestId(Container.Arrow);

	for (let index = 0; index < corePracticesEvents.length; index++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(arrows.nth(index), corePracticesEvents[index], testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);
	}

	const faqBlockEvents = ['HealthIndFaq1More', 'HealthIndFaq2More', 'HealthIndFaq3More'];
	const faqContainer = driver.getByTestId(Healthcare.Faq);
	const arrowList = await faqContainer.getByTestId(Container.Arrow).all();

	for (let index = 0; index < arrowList.length; index++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(arrowList[index], faqBlockEvents[index], testInfo.title);
	}

	const relatedArticlesContainer = driver.getByTestId(Healthcare.RelatedArticles);
	const articleItemsList = await relatedArticlesContainer.getByTestId(RelatedArticles.ArticleItem).all();
	const articleTitlesList = await relatedArticlesContainer
		.getByTestId(RelatedArticles.ArticleTitle)
		.allTextContents();
	const events = articleTitlesList.map((title) => `HealthIndArticle${stringUtils.encodeForUrl(title)}`);

	for (let i = 0; i < articleItemsList.length; i++) {
		await googleAnalyticsSteps.checkGoogleAnalytics(articleItemsList[i], events[i], testInfo.title);
		await baseDriverSteps.goToUrl(pageUrl);
	}

	const sendRequestButton = driver.Page.getByTestId(Buttons.Send);
	const attachFilesButton = driver.getByTestId(Buttons.AttachFiles);
	const cancelButton = driver.getByTestId(Buttons.Cancel);

	await googleAnalyticsSteps.checkGoogleAnalytics(sendRequestButton, 'HealthIndSendMessageClick', testInfo.title);
	await googleAnalyticsSteps.checkGoogleAnalytics(attachFilesButton, 'HealthIndSendMessageAddFile', testInfo.title);
	await attachFilesButton.setInputFiles('automation/resources/test.pdf');
	await googleAnalyticsSteps.checkGoogleAnalytics(cancelButton, 'HealthIndSendMessageDelFile', testInfo.title);

	/* TODO: Update checkGoogleAnalytics to accept multiple events to uncomment
	formSteps.fillGetInTouchForm();

	await googleAnalyticsSteps.checkGoogleAnalytics(
		sendRequestButton,
		['IoTServSendMessageClick%20', 'IoTServSendMessageCompl'],
		testInfo.title
	);
	*/
});
