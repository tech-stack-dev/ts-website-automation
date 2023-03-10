Feature: DropdownInCareerPagePart2

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @FilterBlock @TSWEB133 @Cleanup @NotRun
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionDropdownClickingResetButton
	# Precondition
	Given User creates '2' Tags
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	When User clicks 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @FilterBlock @TSWEB133 @Cleanup @NotRun
Scenario: CheckThatUserDeleteSelectedTagsFromSeniorityLevelDropdownClickingResetButton
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
		| Seniority | Test2Tag{SRND} |
		| Seniority | Test3Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Seniority Level' dropdown
	When User selects tag from 'Seniority Level' dropdown
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	When User clicks 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel