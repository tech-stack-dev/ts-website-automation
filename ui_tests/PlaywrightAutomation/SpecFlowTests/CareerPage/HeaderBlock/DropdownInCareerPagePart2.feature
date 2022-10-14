Feature: DropdownInCareerPagePart2

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionDropdownClickingResetButton
	# Precondition
	Given User creates tag
		| Prefix    | Name                               |
		| Direction | TestingResetDirection 1_Тестовий 1 |
		| Direction | TestingResetDirection 2_Тестовий 2 |
	Given User creates and publish new Career Description
		| Field             | Value                    |
		| AboutTheProjectUs | AboutTheProjectUs        |
		| AboutTheProjectUa | AboutTheProjectUa        |
		| AboutTheRoleUs    | AboutTheRoleUs           |
		| AboutTheRoleUa    | AboutTheRoleUa           |
		| TitleUs           | TitleUsResetDirection    |
		| TitleUa           | TitleUaResetDirection    |
		| YouWillUs         | YouWillUs                |
		| YouWillUa         | YouWillUa                |
		| YouAreUs          | YouAreUs                 |
		| YouAreUa          | YouAreUa                 |
		| WeWillUs          | WeWillUs                 |
		| WeWillUa          | WeWillUa                 |
		| WeAreUs           | WeAreUs                  |
		| WeAreUa           | WeAreUa                  |
		| TechnologyStack   | TechnologyStackUs        |
		| SlugUs            | TestSlugUsResetDirection |
	Given User creates new Career with 'TitleUsResetDirection' career description and 'TestingResetDirection 1_Тестовий 1,TestingResetDirection 2_Тестовий 2' tag
		| NameUs               | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsResetDirection | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
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
	Given User creates tag
		| Prefix    | Name                               |
		| Seniority | TestingResetSeniority 1_Тестовий 1 |
		| Seniority | TestingResetSeniority 2_Тестовий 2 |
		| Seniority | TestingResetSeniority 3_Тестовий 3 |
	Given User creates and publish new Career Description
		| Field             | Value                    |
		| AboutTheProjectUs | AboutTheProjectUs        |
		| AboutTheProjectUa | AboutTheProjectUa        |
		| AboutTheRoleUs    | AboutTheRoleUs           |
		| AboutTheRoleUa    | AboutTheRoleUa           |
		| TitleUs           | TitleUsResetSeniority    |
		| TitleUa           | TitleUaResetSeniority    |
		| YouWillUs         | YouWillUs                |
		| YouWillUa         | YouWillUa                |
		| YouAreUs          | YouAreUs                 |
		| YouAreUa          | YouAreUa                 |
		| WeWillUs          | WeWillUs                 |
		| WeWillUa          | WeWillUa                 |
		| WeAreUs           | WeAreUs                  |
		| WeAreUa           | WeAreUa                  |
		| TechnologyStack   | TechnologyStackUs        |
		| SlugUs            | TestSlugUsResetSeniority |
	Given User creates new Career with 'TitleUsResetSeniority' career description and 'TestingResetSeniority 1_Тестовий 1,TestingResetSeniority 2_Тестовий 2,TestingResetSeniority 3_Тестовий 3' tag
		| NameUs               | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsResetSeniority | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
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