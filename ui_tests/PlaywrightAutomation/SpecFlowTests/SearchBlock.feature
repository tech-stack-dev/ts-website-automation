@retry(2)
Feature: SearchBlock

@Regession @TSWEB133
Scenario: PageHasAMessageRelatedToNoResults
	Given User is on the career website
	When User set 'wrongString' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regression @TSWEB133 @Cleanup
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromDirectionDropdown
	Given User creates tag
		| Prefix    | Name                              |
		| Direction | TestingDirectionWithText_Тестовий |
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
	Given User creates new Career with 'TitleUs' career description and 'TestingDirectionWithText_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User set 'TestUs' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                      |
		| TestingDirectionWithText |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'TestUs'
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
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromSeniorityLevelDropdown
	Given User creates tag
		| Prefix    | Name                              |
		| Seniority | TestingSeniorityWithText_Тестовий |
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
	Given User creates new Career with 'TitleUs' career description and 'TestingSeniorityWithText_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User set 'TestUs' text to 'Search' input on 'HeaderPage' container
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
Scenario: SeackButtonRedirectsToTheSearchResultsFromTheJobsBlock
	Given User is on the career website
	When User clicks on 'Search' button on 'HeaderPage' container
	Then User in on the 'Jobs' tab