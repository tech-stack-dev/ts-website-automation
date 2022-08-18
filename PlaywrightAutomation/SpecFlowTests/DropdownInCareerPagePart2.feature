Feature: DropdownInCareerPagePart2

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTags
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                  |
		| Software Development |
		| HR                   |
		| Office               |
	When User clicks 'Reset' div button
	Then All selected tags was cancel

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTagsFromSeniorityLevelDropdown
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag          |
		| Professional |
		| Trainee      |
		| Junior       |
	When User clicks 'Reset' div button
	Then All selected tags was cancel