Feature: GoogleAnalyticsOnQaAsAService

Background:
	Given User is on 'https://tech-stack.io/services/qa-as-a-service' page

@TSWEB302
Scenario: CheckThatBreadcrumpsOnTopPageHasGoogleAnalyticsEvent
	When User clicks on 'prev' breadcrumbs in 'QaAsAServiceTopPage' container and sees 'QAasAServPage' event category and 'QAasAServBreadServices' event action

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on RequestAQuote button in 'QaAsAServiceTopPage' container and sees 'QAasAServPage' event category and 'QAasAServMainRequestQuote' event action

@TSWEB302
Scenario: CheckThatCollapseArrowsOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on 'collapse-arrow' img in 'QaServicesPage' container and sees 'QAasAServPage' event category and 'QAasAServService' event action

@TSWEB302
Scenario: CheckThatCaseStudiesOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks case studies in 'QaCaseStudiesPage' container and sees 'QAasAServ' event category and 'QAasAServCase' event action

@TSWEB302
Scenario: CheckThatAchiveOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on 'arrow' img in 'QaOurApproachPage' container and sees 'QAasAServPage' event category and 'QAasAServAchiveOpenSource' event action

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonInOurApproachSectionOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on RequestAQuote button in 'QaOurApproachPage' container and sees 'QAasAServPage' event category and 'QAasAServAchiveRequestQuote' event action

@TSWEB302
Scenario: CheckThatCollapseArrowsInFaqSectionOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on 'collapse-arrow' img in 'QaFaqPage' container and sees 'QAasAServPage' event category and 'QAasAServFaq' event action

@TSWEB302
Scenario: CheckThatRelatedAcrticlesOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on img card in 'QaRelatedArticlesPage' container and sees 'QAasAServPage' event category and 'QAasAServArticle' event action

@TSWEB302
Scenario: CheckThatGetInTouchSectionOnQaAsAServicePageHasGoogleAnalyticsEvent
	When User clicks on link with id in 'QaGetInTouchPage' container and sees 'QAasAServPage' event category and 'QAasAServSendMessageClick' event action
	When User attach 'test.pdf' file in label in 'QaGetInTouchPage' container
	When User clicks on label in 'QaGetInTouchPage' container and sees 'QAasAServPage' event category and 'QAasAServSendMessageAddFile' event action
	When User clicks on img with id in 'QaGetInTouchPage' container and sees 'QAasAServPage' event category and 'QAasAServSendMessageDelFile' event action

@TSWEB302
Scenario: CheckThatSuccessfulSendMessageInQaAsAServicePageReturnGoogleEvent
	When User enters 'test name' text in input with 'first_name' name in 'QaGetInTouchPage' container
	When User enters 'test last name' text in input with 'last_name' name in 'QaGetInTouchPage' container
	When User enters 'testemail@test.test' text in input with 'email' name in 'QaGetInTouchPage' container
	When User clicks on link with id in 'QaGetInTouchPage' container and wait response with 'QAasAServPage' event category and 'QAasAServSendMessageCompl' event action