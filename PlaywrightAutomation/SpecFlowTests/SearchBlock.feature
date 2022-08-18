@retry(2)
Feature: SearchBlock

Background:
	Given User is on the career website

@Regession @TSWEB133
Scenario: PageHasAMessageRelatedToNoResults
	When User set 'wrongString' text to 'Search' by role field
	When User clicks on 'Search' button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regression @TSWEB133
Scenario: ThePageIsDisplayedInfoCorrectlyAfterEnteringThePartOfTheNameExistingVacancyAndSelectingTagFromDirectionDropdown
	When User set part of the name first vacancy from page in 'Search' by role field
	When User clicks on 'Direction' dropdown
	When User clicks on '1' available tag from 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results contain desired value
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