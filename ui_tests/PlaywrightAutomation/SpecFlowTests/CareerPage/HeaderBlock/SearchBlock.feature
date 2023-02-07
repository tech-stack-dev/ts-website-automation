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
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1Career{SRND}' text to 'Search' input on 'Head rPage' container
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test1Career{SRND}'
	Then Search results equal to selected tag
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyNameAndSelectedTagFromSeniorityLevelDropdown
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1Career{SRND}' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Seniority Level' dropdown
	When User selects tag from 'Seniority Level' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |

@Regression @TSWEB133
Scenario: CheckThatUserRedirectsToJobsBlockWhenClickingSearchButton
	Given User is on career website
	When User clicks on 'Search' button on 'HeaderPage' container
	Then User in on the 'Jobs' tab on 'NavigationHeader' container