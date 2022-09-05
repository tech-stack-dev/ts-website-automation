@retry(2)
Feature: JobsBlock

Background:
	Given User is on the career website

@Regression @TSWEB146
Scenario: CheckNavigationHeaderInCareerPage
	Then 'Techstack' logo is displayed in the main page
	Then The page has 'En' language switcher
	Then The page has 'Ua' language switcher
	Then The page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Contact us |
		| Reviews    |

@Regression @TSWEB146 @Cleanup
Scenario: CheckBreadcrumbsHeaderInJobsBlock
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
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                      |
		| TSWEB146TestingDirection |
	When User clicks on 'Tsweb146Testus' card title
	Then Breadcrumbs has 'Jobs / Tsweb146Testus' text