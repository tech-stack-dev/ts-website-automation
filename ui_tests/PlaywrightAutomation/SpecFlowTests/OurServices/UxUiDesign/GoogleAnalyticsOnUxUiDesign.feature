Feature: GoogleAnalyticsOnUxUiDesign

Background:
	Given User is on 'https://tech-stack.io/services/ui-ux-design' page

@TSWEB302
Scenario: CheckThatBreadcrumpsOnTopInUxUiDesignPageHasGoogleAnalyticsEvent
	When User clicks on 'prev' breadcrumbs in 'DesignTopPage' container and sees 'DesignPage' event category and 'DesignBreadServices' event action

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonOnDesignPageHasGoogleAnalyticsEvent
	When User clicks on RequestAQuote button in 'DesignTopPage' container and sees 'DesignPage' event category and 'DesignMainRequestQuote' event action

@TSWEB302
Scenario: CheckThatCaseStudiesOnDesignPageHasGoogleAnalyticsEvent
	When User clicks case studies in 'DesignCaseStudiesPage' container and sees 'Design' event category and 'DesignCase' event action

@TSWEB302
Scenario: CheckThatTimelineInWorkFlowSectionOnDesignPageHasGoogleAnalyticsEvent
	When User clicks on 'right' timeline in 'DesignWorkFlowPage' container and sees 'DesignPage' event category and 'DesignWorkflow' event action
	When User clicks on 'left' timeline in 'DesignWorkFlowPage' container and sees 'DesignPage' event category and 'DesignWorkflow' event action

@TSWEB302
Scenario Outline: CheckThatDesignExpertsHasGoogleAnalyticsEventOnAllLinks
	When User clicks on '<Link>' link and sees '<EventCatagory>' event category and '<EventAction>' event action

Examples:
	| Link   | EventCatagory | EventAction            |
	| foto-1 | DesignPage    | DesignTeamDytyuk       |
	| name-1 | DesignPage    | DesignTeamDytyuk       |
	| link-1 | DesignPage    | DesignTeamDytyuk       |
	| foto-2 | DesignPage    | DesignTeamSeliverstova |
	| name-2 | DesignPage    | DesignTeamSeliverstova |
	| link-2 | DesignPage    | DesignTeamSeliverstova |

@TSWEB302
Scenario: CheckThatRequestAQuoteButtonOnDesignExpertsSectionHasGoogleAnalyticsEvent
	When User clicks on RequestAQuote button in 'DesignExpertsPage' container and sees 'DesignPage' event category and 'DesignTeamRequestQuote' event action

@TSWEB302
Scenario: CheckThaRelatedServicesLinksInDesignPageHasGoogleAnalyticsEvent
	When User clicks on 'arrow' img in 'DesignRelatedServicesPage' container and sees 'DesignPage' event category and 'DesignRelServices' event action