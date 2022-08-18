@retry(2)
Feature: DropdownInCareerPage

Background:
	Given User is on the career website

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