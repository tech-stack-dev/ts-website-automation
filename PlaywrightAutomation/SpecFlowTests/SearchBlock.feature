@retry(2)
Feature: SearchBlock

Background:
	Given User is on the career website

@Regession @TSWEB133
Scenario: PageHasAMessageRelatedToNoResults
	When User set 'wrongString' text to 'Search' input
	When User clicks on 'Search' button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regression @TSWEB133
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromDirectionDropdown
	When User set 'Back' text to 'Search' input
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                  |
		| Software Development |
	When User clicks on 'Search' button
	Then Search results contain 'Back'
	Then Search results equal to selected tag
		| Tag                  |
		| Software Development |
	Then Selected tags are displayed as active in Filters list
		| Tag                  |
		| Software Development |
	Then Selected tags has correct color
		| Tag                  |
		| Software Development |
	Then Selected tags are displayed in 'Direction' sight bar on 'CareerPage' container
		| Tag                  |
		| Software Development |
	Then Selected tags from 'Direction' sight bar has correctly color on 'CareerPage' container
		| Tag                  |
		| Software Development |

@Regression @TSWEB133
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromSeniorityLevelDropdown
	When User set 'Back' text to 'Search' input
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag     |
		| Trainee |
	When User clicks on 'Search' button
	Then Selected tags are displayed as active in Filters list
		| Tag     |
		| Trainee |
	Then Selected tags has correct color
		| Tag     |
		| Trainee |
	Then Selected tags are displayed in 'Seniority levels' sight bar on 'CareerPage' container
		| Tag     |
		| Trainee |
	Then Selected tags from 'Seniority levels' sight bar has correctly color on 'CareerPage' container
		| Tag     |
		| Trainee |

@Regression @TSWEB133
Scenario: SeackButtonRedirectsToTheSearchResultsFromTheJobsBlock
	When User clicks on 'Search' button
	Then User in on the 'Jobs' block