Feature: ApplyRequestForAJob

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesErrorMessagesUnderRequiredFieldsWhenClickingSendAMessageButton
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Test1CareerSRND' card title
	When User clicks on 'Apply now' button on 'BreadcrumbsHeader' container
	When User clicks on 'Submit' button on 'ApplyForAJobPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                   |
		| Name     | Please enter your name         |
		| LastName | Please enter your last name    |
		| Email    | Please enter your email        |
		| Tel      | Please enter your phone number |