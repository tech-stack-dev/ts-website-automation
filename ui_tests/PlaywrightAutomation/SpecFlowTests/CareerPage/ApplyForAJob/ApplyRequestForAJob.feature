Feature: ApplyRequestForAJob

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesErrorMessagesUnderRequiredFieldsWhenClickingSendAMessageButton
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Test1CareerSRND' card title
	When User clicks on 'ApplyNow' button on 'BreadcrumbsHeader' container
	When User clicks on 'Submit' button on 'ApplyForAJobPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                   |
		| name     | Please enter your name         |
		| lastName | Please enter your last name    |
		| email    | Please enter your email        |
		| tel      | Please enter your phone number |