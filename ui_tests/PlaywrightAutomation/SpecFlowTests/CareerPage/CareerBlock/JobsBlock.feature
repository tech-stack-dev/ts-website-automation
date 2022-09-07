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
		| Prefix    | Name                                |
		| Direction | TSWEB146TestingDirection1_Тестовий1 |
	Given User creates and publish new Career Description
		| Field             | Value                       |
		| AboutTheProjectUs | AboutTheProjectUs1          |
		| AboutTheProjectUa | AboutTheProjectUa1          |
		| AboutTheRoleUs    | AboutTheRoleUs1             |
		| AboutTheRoleUa    | AboutTheRoleUa1             |
		| TitleUs           | TSWEB146_TitleUs1           |
		| TitleUa           | TSWEB146_TitleUa1           |
		| YouWillUs         | YouWillUs1                  |
		| YouWillUa         | YouWillUa1                  |
		| YouAreUs          | YouAreUs1                   |
		| YouAreUa          | YouAreUa1                   |
		| WeWillUs          | WeWillUs1                   |
		| WeWillUa          | WeWillUa1                   |
		| WeAreUs           | WeAreUs1                    |
		| WeAreUa           | WeAreUa1                    |
		| TechnologyStack   | TechnologyStackUs1          |
		| SlugUs            | TestSlugUsDirectionOnlyOne1 |
	Given User creates new Career with 'TSWEB146_TitleUs1' career description and 'TSWEB146TestingDirection1_Тестовий1' tag
		| NameUs          | NameUa          | DescriptionUs      | DescriptionUa      | Type | LinkType |
		| Tsweb146Testus1 | TSWEB146TestUa1 | DescriptionTestUs1 | DescriptionTestUa1 | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                       |
		| TSWEB146TestingDirection1 |
	When User clicks on 'Tsweb146Testus1' card title
	Then Breadcrumbs has 'Jobs / Tsweb146Testus1' text
	Then 'Apply now' button is displayed on 'Breadcrumbs' container