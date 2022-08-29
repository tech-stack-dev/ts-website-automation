@retry(2)
Feature: DropdownInCareerPagePart2

@Regression @TSWEB133 @Cleanup
Scenario: ResetButtonCancelAllSelectedTags
	When User creates tag
		| Prefix    | Name                             |
		| Direction | 1TestingResetDirection_Тестовий  |
		| Direction | 2TestingResetDirection_2Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                   |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsResetDirection |
	When User creates new Career with 'TitleUs' career description and '1TestingResetDirection_Тестовий,2TestingResetDirection_2Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                    |
		| 1TestingResetDirection |
		| 2TestingResetDirection |
	When User clicks on 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel

@Regression @TSWEB133 @Cleanup
Scenario: ResetButtonCancelAllSelectedTagsFromSeniorityLevelDropdown
	When User creates tag
		| Prefix    | Name                             |
		| Seniority | 1TestingResetSeniority_Тестовий  |
		| Seniority | 2TestingResetSeniority_2Тестовий |
		| Seniority | 3TestingResetSeniority_3Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                   |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsResetSeniority |
	When User creates new Career with 'TitleUs' career description and '1TestingResetSeniority_Тестовий,2TestingResetSeniority_2Тестовий,3TestingResetSeniority_3Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                    |
		| 1TestingResetSeniority |
		| 2TestingResetSeniority |
		| 3TestingResetSeniority |
	When User clicks on 'Reset' button on 'HeaderPage' container
	Then All selected tags was cancel