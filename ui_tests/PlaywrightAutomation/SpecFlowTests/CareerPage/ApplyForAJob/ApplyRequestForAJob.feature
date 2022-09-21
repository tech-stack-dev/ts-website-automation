@retry(2)
Feature: ApplyRequestForAJob

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesErrorMessagesUnderRequiredFieldsWhenClickingSendAMessageButton
	# Precondition
	Given User creates tag
		| Prefix    | Name                         |
		| Direction | TestingAppleForAJob_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingAppleForAJob_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'TestUs' card title
	When User clicks on 'Apply now' button on 'BreadcrumbsHeader' container
	When User clicks on 'Submit' button on 'ApplyForAJobPage' container
	Then Error messages are displayed under fields
		| Input    | ErrorMessage                   |
		| Name     | Please enter your name         |
		| LastName | Please enter your last name    |
		| Email    | Please enter your email        |
		| Tel      | Please enter your phone number |