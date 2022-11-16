Feature: DropdownInCareerPagePart2

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionDropdownClickingResetButton
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                               |
		| Direction | TestingResetDirection 1_ТестовийВидалитиНапрямок 1 |
		| Direction | TestingResetDirection 2_ТестовийВидалитиНапрямок 2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs               | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetDirection |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                     |
		| TestingResetDirection 1 |
		| TestingResetDirection 2 |
	When User clicks on 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromSeniorityLevelDropdownClickingResetButton
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                             |
		| Seniority | TestingResetSeniority 1_ТестовийВидалитиРівень 1 |
		| Seniority | TestingResetSeniority 2_ТестовийВидалитиРівень 2 |
		| Seniority | TestingResetSeniority 3_ТестовийВидалитиРівень 3 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs               | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetSeniority |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                     |
		| TestingResetSeniority 1 |
		| TestingResetSeniority 2 |
		| TestingResetSeniority 3 |
	When User clicks on 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel