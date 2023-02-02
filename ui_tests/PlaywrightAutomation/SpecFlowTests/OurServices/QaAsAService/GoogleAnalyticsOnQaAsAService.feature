Feature: GoogleAnalyticsOnQaAsAService

Background:
	Given User is on 'https://tech-stack.com/' page

@Regression @OurServices @TSWEB302
Scenario: CheckThatAllCaseStudiesCardsOnTheQaAsServicePageHasGoogleAnalyticsEvent
	When User clicks menu button
	When User goes to 'QA as a Service' page from 'Services' category
	When User clicks card with 'Existing QA Processes Audit' header text from Case studies section
	Then User sees 'QAasAServPage' event category and 'QAasAServCase' event action
	When User click back button in the browser
	When User clicks arrow wrapper for 'Testing automation and integrating CI/CD' field in Services section
	When User clicks card with 'Building an Automation Testing Solution' header text from Case studies section
	Then User sees 'QAasAServPage' event category and 'QAasAServCase' event action
	When User click back button in the browser
	When User clicks arrow wrapper for 'Testing automation and integrating CI/CD' field in Services section
	When User clicks card with 'On Demand Regression Testing' header text from Case studies section
	Then User sees 'QAasAServPage' event category and 'QAasAServCase' event action
	
@Regression @OurServices @TSWEB302
Scenario: CheckThatAllButtonsOnTheQaAsServicePageHasGoogleAnalyticsEvent
	When User clicks menu button
	When User goes to 'QA as a Service' page from 'Services' category
	When User clicks source breadcrumbs button
	Then User sees 'QAasAServPage' event category and 'QAasAServBreadServices' event action
	When User click back button in the browser
	When User clicks Request A Quote button in the header section
	Then User sees 'QAasAServPage' event category and 'QAasAServMainRequestQuote' event action
	When User clicks Request A Quote button in the 'Our Approach' section
	Then User sees 'QAasAServPage' event category and 'QAasAServAchiveRequestQuote' event action
	When User clicks Open Source arrow
	Then User sees 'QAasAServPage' event category and 'QAasAServAchiveOpenSource' event action
	
@Regression @OurServices @TSWEB302
Scenario: CheckThatAllFAQWrappersOnTheQaAsServicePageHasGoogleAnalyticsEvent
	When User clicks menu button
	When User goes to 'QA as a Service' page from 'Services' category
	When User clicks arrow wrapper for 'Why is integrating QA' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq6More' event action
	When User clicks arrow wrapper for 'Why is integrating QA' field in FAQ section
	When User clicks arrow wrapper for 'What is crowdtesting?' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq5More' event action
	When User clicks arrow wrapper for 'What is crowdtesting?' field in FAQ section
	When User clicks arrow wrapper for 'What is the difference' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq1More' event action
	When User clicks arrow wrapper for 'What is the difference' field in FAQ section
	When User clicks arrow wrapper for 'Is QA as a service better' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq2More' event action
	When User clicks arrow wrapper for 'Is QA as a service better' field in FAQ section
	When User clicks arrow wrapper for 'We have an in-house QA' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq3More' event action
	When User clicks arrow wrapper for 'We have an in-house QA' field in FAQ section
	When User clicks arrow wrapper for 'Should we hire a' field in FAQ section
	Then User sees 'QAasAServPage' event category and 'QAasAServFaq4More' event action
	
@Regression @OurServices @TSWEB302
Scenario: CheckThatAllServicesWrappersOnTheQaAsServicePageHasGoogleAnalyticsEvent
	When User clicks menu button
	When User goes to 'QA as a Service' page from 'Services' category
	When User clicks arrow wrapper for 'Testing processes setup from scratch' field in Services section
	Then User sees 'QAasAServPage' event category and 'QAasAServServiceTesting-processes-setup-from-scratch' event action
	When User clicks arrow wrapper for 'Testing processes setup from scratch' field in Services section
	When User clicks arrow wrapper for 'Regression testing on demand' field in Services section  
	Then User sees 'QAasAServPage' event category and 'QAasAServService' event action
	When User clicks arrow wrapper for 'Regression testing on demand' field in Services section
	When User clicks arrow wrapper for 'Exploratory and usability testing' field in Services section
	Then User sees 'QAasAServPage' event category and 'QAasAServServiceExploratory-and-usability-testing' event action
	When User clicks arrow wrapper for 'Exploratory and usability testing' field in Services section
	When User clicks arrow wrapper for 'Auditing existing company QA processes' field in Services section
	Then User sees 'QAasAServPage' event category and 'QAasAServServiceAuditing-existing-company-QA-processes' event action
	When User clicks arrow wrapper for 'Auditing existing company QA processes' field in Services section
	When User clicks arrow wrapper for 'Testing automation and integrating CI/CD' field in Services section
	Then User sees 'QAasAServPage' event category and 'QAasAServServiceTesting-automation-and-integrating-CI/CD' event action