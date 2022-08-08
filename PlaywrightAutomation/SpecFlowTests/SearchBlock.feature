Feature: SearchBlock

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set first vacancy from page in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contains to recorded value

@Regresiion @TSWEB133
Scenario: SearchResultsContainsPartOfTheNameVacancy
	When User set part of the name first vacancy from page in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contains to recorded value

@Regession @TSWEB133
Scenario: PageHasAMessageRelatedToNoResults
	When User set 'wrongString' text to 'Search' by role field
	When User clicks on 'Search' button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' by role field
	When User clicks on 'Clear' search field button
	Then 'Search' by role field is empty
	Then The page has not changed after removed terms from search field

@Regression @TSWEB133
Scenario: ThePageDisplaysVacanciesSelectedFromDirectionDropdown
	When User clicks on 'Direction' dropdown
	When User clicks on '1' available tag from 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results equals to selected tags
	Then Tag name displayed in 'Direction' dropdown field
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Direction' sight bar
	Then Selected tags from 'Direction' sight bar has correctly color

@Regression @TSWEB133
Scenario: AllSelectedTagsAreDisplayedOnThePage
	When User clicks on 'Direction' dropdown
	When User clicks on '3' available tag from 'Direction' dropdown
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results equals to selected tags
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Direction' sight bar
	Then Selected tags from 'Direction' sight bar has correctly color
	Then Count of selected tags from 'Direction' is correctly

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTags
	When User clicks on 'Direction' dropdown
	When User clicks on '3' available tag from 'Direction' dropdown
	When User clicks 'Reset' div button
	Then All selected tags was cancel

@Regression @TSWEB133
Scenario: ThePageDisplayedSelectedTagFromSeniorityLevelDropdown
	When User clicks on 'SeniorityLevel' dropdown
	When User clicks on '1' available tag from 'SeniorityLevel' dropdown
	When User clicks on 'Search' button
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Seniority levels' sight bar
	Then Selected tags from 'Seniority levels' sight bar has correctly color

@Regression @TSWEB133
Scenario: AllSelectedTagsDisplayedOnThePageAndTagsCounterIsCorrectly
	When User clicks on 'SeniorityLevel' dropdown
	When User clicks on '3' available tag from 'SeniorityLevel' dropdown
	When User clicks on 'SeniorityLevel' dropdown
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Seniority levels' sight bar
	Then Selected tags from 'Seniority levels' sight bar has correctly color
	Then Count of selected tags from 'SeniorityLevel' is correctly

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTagsFromSeniorityLevelDropdown
	When User clicks on 'SeniorityLevel' dropdown
	When User clicks on '3' available tag from 'SeniorityLevel' dropdown
	When User clicks 'Reset' div button
	Then All selected tags was cancel

@Regression @TSWEB133
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromDirectionDropdown
	When User set part of the name first vacancy from page in 'Search' by role field
	When User clicks on 'Direction' dropdown
	When User clicks on '1' available tag from 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results contains to recorded value
	Then Search results equals to selected tags
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Direction' sight bar
	Then Selected tags from 'Direction' sight bar has correctly color

@Regression @TSWEB133
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromSeniorityLevelDropdown
	When User set part of the name first vacancy from page in 'Search' by role field
	When User clicks on 'SeniorityLevel' dropdown
	When User clicks on '1' available tag from 'SeniorityLevel' dropdown
	When User clicks on 'Search' button
	Then Selected tags are displayed
	Then Selected tags has correctly color
	Then Selected tags are displayed in 'Seniority levels' sight bar
	Then Selected tags from 'Seniority levels' sight bar has correctly color

@Regression @TSWEB133
Scenario: SeackButtonRedirectsToTheSearchResultsFromTheJobsBlock
	When User clicks on 'Search' button
	Then User in on the 'Jobs' block