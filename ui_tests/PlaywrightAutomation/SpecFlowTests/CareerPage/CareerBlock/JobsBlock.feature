@retry(2)
Feature: JobsBlock

@Regression @TSWEB146
Scenario: CheckNavigationHeaderInCareerPage
	Given User is on the career website
	Then 'Techstack' logo is displayed in the main page
	Then Jobs block on Career page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Reviews    |
		| Contact us |
	Then 'En' language is selected 'HeaderPage' on container
	When User selects 'Ua' language on 'HeaderPage' container
	Then 'Ua' language is selected 'HeaderPage' on container

@Regression @TSWEB146 @Cleanup
Scenario: CheckBreadcrumbsHeaderInJobsBlock
	# Precondition
	Given User creates tag
		| Prefix    | Name                              |
		| Direction | TSWEB146TestingDirection_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TSWEB146_TitleUs           |
		| TitleUa           | TSWEB146_TitleUa           |
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
	Given User creates new Career with 'TSWEB146_TitleUs' career description and 'TSWEB146TestingDirection_Тестовий' tag
		| NameUs         | NameUa          | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| Tsweb146Testus | TSWEB146_TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                      |
		| TSWEB146TestingDirection |
	When User clicks on 'Tsweb146Testus' card title
	Then Breadcrumbs has 'Jobs / Tsweb146Testus' text
	Then 'Apply now' button is displayed on 'Breadcrumbs' container