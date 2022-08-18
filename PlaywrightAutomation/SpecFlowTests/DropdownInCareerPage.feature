@retry(2)
Feature: DropdownInCareerPage

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: ThePageDisplaysVacanciesSelectedFromDirectionDropdown
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                  |
		| Software Development |
	When User clicks on 'Search' button
	Then Search results equal to selected tag
		| Tag                  |
		| Software Development |
	Then 'Software Development' tag name displayed in 'Direction' dropdown field
	Then Selected tags are displayed
		| Tag                  |
		| Software Development |
	Then Selected tags has correctly color
		| Tag                  |
		| Software Development |
	Then Selected tags are displayed in 'Direction' sight bar
		| Tag                  |
		| Software Development |
	Then Selected tags from 'Direction' sight bar has correctly color
		| Tag                  |
		| Software Development |

@Regression @TSWEB133
Scenario: AllSelectedTagsAreDisplayedOnThePage
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                  |
		| Software Development |
		| Office               |
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results equal to selected tag
		| Tag                  |
		| Software Development |
		| Office               |
	Then Selected tags are displayed
		| Tag                  |
		| Software Development |
		| Office               |
	Then Selected tags has correctly color
		| Tag                  |
		| Software Development |
		| Office               |
	Then Selected tags are displayed in 'Direction' sight bar
		| Tag                  |
		| Software Development |
		| Office               |
	Then Selected tags from 'Direction' sight bar has correctly color
		| Tag                  |
		| Software Development |
		| Office               |
	Then Count of selected tags from 'Direction' dropdown is correctly

@Regression @TSWEB133
Scenario: ThePageDisplayedSelectedTagFromSeniorityLevelDropdown
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag          |
		| Professional |
	When User clicks on 'Search' button
	Then Selected tags are displayed
		| Tag          |
		| Professional |
	Then Selected tags has correctly color
		| Tag          |
		| Professional |
	Then Selected tags are displayed in 'Seniority levels' sight bar
		| Tag          |
		| Professional |
	Then Selected tags from 'Seniority levels' sight bar has correctly color
		| Tag          |
		| Professional |

@Regression @TSWEB133
Scenario: AllSelectedTagsDisplayedOnThePageAndTagsCounterIsCorrectly
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	When User clicks on 'SeniorityLevel' dropdown
	Then Selected tags are displayed
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	Then Selected tags has correctly color
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	Then Selected tags are displayed in 'Seniority levels' sight bar
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	Then Selected tags from 'Seniority levels' sight bar has correctly color
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	Then Count of selected tags from 'SeniorityLevel' dropdown is correctly