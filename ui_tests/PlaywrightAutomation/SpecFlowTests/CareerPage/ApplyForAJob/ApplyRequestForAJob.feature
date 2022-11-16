Feature: ApplyRequestForAJob

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesErrorMessagesUnderRequiredFieldsWhenClickingSendAMessageButton
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                         |
		| Direction | TestingAppleForAJob_ТестовийПодатисьНаРоботу |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestFieldApplyForAJob |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'TestFieldApplyForAJob' card title
	When User clicks on 'Apply now' button on 'BreadcrumbsHeader' container
	When User clicks on 'Submit' button on 'ApplyForAJobPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                   |
		| Name     | Please enter your name         |
		| LastName | Please enter your last name    |
		| Email    | Please enter your email        |
		| Tel      | Please enter your phone number |