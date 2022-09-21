@retry(2)
Feature: SearchBlock

@Regression @TSWEB133
Scenario: CheckThatUserSeesMessageAboutFailSearchResults
	Given User is on career website
	When User set 'wrongString' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyNameAndSelectedTagFromDirectionDropdown
	# Precondition
	Given User creates tag
		| Prefix    | Name                              |
		| Direction | TestingDirectionWithText_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                       |
		| AboutTheProjectUs | AboutTheProjectUs           |
		| AboutTheProjectUa | AboutTheProjectUa           |
		| AboutTheRoleUs    | AboutTheRoleUs              |
		| AboutTheRoleUa    | AboutTheRoleUa              |
		| TitleUs           | TitleUsDirectionWithText    |
		| TitleUa           | TitleUaDirectionWithText    |
		| YouWillUs         | YouWillUs                   |
		| YouWillUa         | YouWillUa                   |
		| YouAreUs          | YouAreUs                    |
		| YouAreUa          | YouAreUa                    |
		| WeWillUs          | WeWillUs                    |
		| WeWillUa          | WeWillUa                    |
		| WeAreUs           | WeAreUs                     |
		| WeAreUa           | WeAreUa                     |
		| TechnologyStack   | TechnologyStackUs           |
		| SlugUs            | TestSlugUsDirectionWithText |
	Given User creates new Career with 'TitleUsDirectionWithText' career description and 'TestingDirectionWithText_Тестовий' tag
		| NameUs                  | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsDirectionWithText | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'TestUsDirectionWithText' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                      |
		| TestingDirectionWithText |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'TestUsDirectionWithText'
	Then Search results equal to selected tag
		| Tag                      |
		| TestingDirectionWithText |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                      |
		| TestingDirectionWithText |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                      |
		| TestingDirectionWithText |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag                      |
		| TestingDirectionWithText |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag                      |
		| TestingDirectionWithText |

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyNameAndSelectedTagFromSeniorityLevelDropdown
	# Precondition
	Given User creates tag
		| Prefix    | Name                              |
		| Seniority | TestingSeniorityWithText_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                       |
		| AboutTheProjectUs | AboutTheProjectUs           |
		| AboutTheProjectUa | AboutTheProjectUa           |
		| AboutTheRoleUs    | AboutTheRoleUs              |
		| AboutTheRoleUa    | AboutTheRoleUa              |
		| TitleUs           | TitleUsSeniorityWithText    |
		| TitleUa           | TitleUaSeniorityWithText    |
		| YouWillUs         | YouWillUs                   |
		| YouWillUa         | YouWillUa                   |
		| YouAreUs          | YouAreUs                    |
		| YouAreUa          | YouAreUa                    |
		| WeWillUs          | WeWillUs                    |
		| WeWillUa          | WeWillUa                    |
		| WeAreUs           | WeAreUs                     |
		| WeAreUa           | WeAreUa                     |
		| TechnologyStack   | TechnologyStackUs           |
		| SlugUs            | TestSlugUsSeniorityWithText |
	Given User creates new Career with 'TitleUsSeniorityWithText' career description and 'TestingSeniorityWithText_Тестовий' tag
		| NameUs                  | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSeniorityWithText | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'TestUsSeniorityWithText' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                      |
		| TestingSeniorityWithText |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                      |
		| TestingSeniorityWithText |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                      |
		| TestingSeniorityWithText |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                      |
		| TestingSeniorityWithText |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                      |
		| TestingSeniorityWithText |

@Regression @TSWEB133
Scenario: CheckThatUserRedirectsToJobsBlockWhenClickingSearchButton
	Given User is on career website
	When User clicks on 'Search' button on 'HeaderPage' container
	Then User in on the 'Jobs' tab