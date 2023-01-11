Feature: GoogleAnalytiscsOnConsultingService

Background:
	Given User is on 'https://tech-stack.io/services/consulting-service' page


@TSWEB302
Scenario: CheckThatBreadCrumbsPageHasCorrectGoogleAnalyticsEvents
	When User clicks on 'BreadCrumbsPrev' element in '' container and sees 'ConsultingPage' event category and 'ConsultingBreadServices' event action are correct

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonInTopPageHasGoogleAnalyticsEvents
	When User clicks on 'RequestAQuoteButton' element in 'ConsultingServiceTopPage' container and sees 'ConsultingPage' event category and 'ConsultingMainRequestQuote' event action are correct

@TSWEB302
Scenario: CheckThatTimelineHasCorrectGoogleAnalyticsEvents
	When User clicks on 'RightTimelineControl' element in '' container and sees 'ConsultingPage' event category and 'ConsultingProcNext' event action are correct
	When User clicks on 'LeftTimelineControl' element in '' container and sees 'ConsultingPage' event category and 'ConsultingProcPrev' event action are correct

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonInConsultingProcessHasGoogleAnalyticsEvents
	When User clicks on 'RequestAQuoteButton' element in 'ConsultingProcessSectionPage' container and sees 'ConsultingPage' event category and 'ConsultingProcRequestQuote' event action are correct

@TSWEB302
Scenario: CheckThatAllMembersHasEventsInLinkedInLink
	When User clicks on members 'LinkedIn' link and sees 'ConsultingPage' event category and 'ConsultingTeamIn' event action are correct

@TSWEB302
Scenario: CheckThatAllMembersHasEventsInBlogLink
	When User clicks on members 'Blog' link and sees 'ConsultingPage' event category and 'ConsultingTeamBlog' event action are correct

@TSWEB302
Scenario: CheckThatArrowLinkInOurApproachSectionHasEvent
	When User clicks on 'Arrow' element in 'OurApproachPage' container and sees 'ConsultingPage' event category and 'ConsultingApproachOSContributions' event action are correct

@TSWEB302
Scenario: CheckThatArrowLinkInRelatedServicesSectionHasEvent
	When User clicks on 'Arrow' link in 'UX/UI Design' container and sees 'ConsultingPage' event category and 'ConsultingRelServices' event action are correct
	When User clicks on 'Arrow' link in 'QA as a Service' container and sees 'ConsultingPage' event category and 'ConsultingRelServices' event action are correct
	When User clicks on 'Arrow' link in 'Mobile' container and sees 'ConsultingPage' event category and 'ConsultingRelServices' event action are correct

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonInRelatedServicesSectionHasGoogleAnalyticsEvents
	When User clicks on 'RequestAQuoteButton' element in 'RelatedServicesSection' container and sees 'ConsultingPage' event category and 'ConsultingRelServicesRequestQuote' event action are correct

@TSWEB302
Scenario: CheckThatCollapseArrowsInFaqSectionHasGoogleAnalyticsEvents
	When User clicks on collapse arrows and sees 'ConsultingPage' event category and 'ConsultingFaq' event action are correct

@TSWEB302
Scenario: CheckThatGetInTouchHasGoogleAnalyticsEvents
	When User clicks on 'SendMessage' element in '' container and sees 'ConsultingPage' event category and 'ConsultingSendMessageClick' event action are correct
	When User attach 'test.pdf' file in Get In Touch form
	When User clicks on 'AttachFile' element in '' container and sees 'ConsultingPage' event category and 'ConsultingSendMessageAddFile' event action are correct
	When User clicks on 'DeleteAttachedFile' element in '' container and sees 'ConsultingPage' event category and 'ConsultingSendMessageDelFile' event action are correct

	@TSWEB302
Scenario: CheckThatSuccessfulSendMessageReturnGoogleEvent
	When User enters 'Test name' in 'First name' input in Get In Touch form
	When User enters 'Test last name' in 'Last name' input in Get In Touch form
	When User enters 'testemail@test.test' in 'Email' input in Get In Touch form
	When User clicks on SendMessage element and sees 'ConsultingPage' event category and 'ConsultingSendMessageCompl' event action are correct