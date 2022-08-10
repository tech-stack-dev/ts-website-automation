Feature: DropdownInCareerPagePart2

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTags
	When User clicks on 'Direction' dropdown
	When User clicks on '3' available tag from 'Direction' dropdown
	When User clicks 'Reset' div button
	Then All selected tags was cancel

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTagsFromSeniorityLevelDropdown
	When User clicks on 'SeniorityLevel' dropdown
	When User clicks on '3' available tag from 'SeniorityLevel' dropdown
	When User clicks 'Reset' div button
	Then All selected tags was cancel