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
	When User expects objects to be created
		| Type    | Name                      |
		| Vacancy | TestUsResetDirection      |
		| Tag     | Testing Reset Direction 1 |
		| Tag     | Testing Reset Direction 2 |
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                       |
		| Testing Reset Direction 1 |
		| Testing Reset Direction 2 |
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
	When User expects objects to be created
		| Type    | Name                      |
		| Vacancy | TestUsResetSeniority      |
		| Tag     | Testing Reset Seniority 1 |
		| Tag     | Testing Reset Seniority 2 |
		| Tag     | Testing Reset Seniority 3 |
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                       |
		| Testing Reset Seniority 1 |
		| Testing Reset Seniority 2 |
		| Testing Reset Seniority 3 |
	When User clicks on 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel