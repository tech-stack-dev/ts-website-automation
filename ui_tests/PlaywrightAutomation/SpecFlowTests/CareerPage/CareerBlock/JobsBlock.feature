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
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                       |
		| Direction | TSWEB146TestingDirectionOne_ТестовийПерший |
	Given User creates and publish new Career Description
		| Field             | Value                  |
		| AboutTheProjectUs | AboutTheProjectUsOne   |
		| AboutTheProjectUa | AboutTheProjectUaOne   |
		| AboutTheRoleUs    | AboutTheRoleUsOne      |
		| AboutTheRoleUa    | AboutTheRoleUaOne      |
		| TitleUs           | TSWEB146_TitleUsOne    |
		| TitleUa           | TSWEB146_TitleUaOne    |
		| YouWillUs         | YouWillUsOne           |
		| YouWillUa         | YouWillUaOne           |
		| YouAreUs          | YouAreUsOne            |
		| YouAreUa          | YouAreUaOne            |
		| WeWillUs          | WeWillUsOne            |
		| WeWillUa          | WeWillUaOne            |
		| WeAreUs           | WeAreUsOne             |
		| WeAreUa           | WeAreUaOne             |
		| TechnologyStack   | TechnologyStackUsOne   |
		| SlugUs            | TestSlugUsDirectionOne |
	Given User creates new Career with 'TSWEB146_TitleUsOne' career description and 'TSWEB146TestingDirectionOne_ТестовийПерший' tag
		| NameUs            | NameUa            | DescriptionUs        | DescriptionUa        | Type | LinkType |
		| Tsweb146TestusOne | TSWEB146TestUaOne | DescriptionTestUsOne | DescriptionTestUaOne | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                         |
		| TSWEB146TestingDirectionOne |
	When User clicks on 'Tsweb146TestusOne' card title
	Then Breadcrumbs has 'Jobs / Tsweb146TestusOne' text
	Then 'Apply now' button is displayed on 'BreadcrumbsHeader' container

@Regression @TSWEB146
Scenario: CheckNavigationHeaderOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                         |
		| Direction | TSWEB146TestingDirectionThree_ТестовийТретій |
	Given User creates and publish new Career Description
		| Field             | Value                    |
		| AboutTheProjectUs | AboutTheProjectUsThree   |
		| AboutTheProjectUa | AboutTheProjectUaThree   |
		| AboutTheRoleUs    | AboutTheRoleUsThree      |
		| AboutTheRoleUa    | AboutTheRoleUaThree      |
		| TitleUs           | TSWEB146_TitleUsThree    |
		| TitleUa           | TSWEB146_TitleUaThree    |
		| YouWillUs         | YouWillUsThree           |
		| YouWillUa         | YouWillUaThree           |
		| YouAreUs          | YouAreUsThree            |
		| YouAreUa          | YouAreUaThree            |
		| WeWillUs          | WeWillUsThree            |
		| WeWillUa          | WeWillUaThree            |
		| WeAreUs           | WeAreUsThree             |
		| WeAreUa           | WeAreUaThree             |
		| TechnologyStack   | TechnologyStackUsThree   |
		| SlugUs            | TestSlugUsDirectionThree |
	Given User creates new Career with 'TSWEB146_TitleUsThree' career description and 'TSWEB146TestingDirectionThree_ТестовийТретій' tag
		| NameUs              | NameUa              | DescriptionUs          | DescriptionUa          | Type | LinkType |
		| Tsweb146TestusThree | TSWEB146TestUaThree | DescriptionTestUsThree | DescriptionTestUaThree | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                           |
		| TSWEB146TestingDirectionThree |
	When User clicks on 'Tsweb146TestusThree' card title