@retry(2)
Feature: SeniorityLevelSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromSeniorityBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix    | Name                                 |
		| Seniority | TestingSideSeniorityOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                          |
		| AboutTheProjectUs | AboutTheProjectUs              |
		| AboutTheProjectUa | AboutTheProjectUa              |
		| AboutTheRoleUs    | AboutTheRoleUs                 |
		| AboutTheRoleUa    | AboutTheRoleUa                 |
		| TitleUs           | TitleUsSideSeniorityOnlyOne    |
		| TitleUa           | TitleUaSideSeniorityOnlyOne    |
		| YouWillUs         | YouWillUs                      |
		| YouWillUa         | YouWillUa                      |
		| YouAreUs          | YouAreUs                       |
		| YouAreUa          | YouAreUa                       |
		| WeWillUs          | WeWillUs                       |
		| WeWillUa          | WeWillUa                       |
		| WeAreUs           | WeAreUs                        |
		| WeAreUa           | WeAreUa                        |
		| TechnologyStack   | TechnologyStackUs              |
		| SlugUs            | TestSlugUsSideSeniorityOnlyOne |
	Given User creates new Career with 'TitleUsSideSeniorityOnlyOne' career description and 'TestingSideSeniorityOnlyOne_Тестовий' tag
		| NameUs                     | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideSeniorityOnlyOne | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                         |
		| TestingSideSeniorityOnlyOne |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                             |
		| Testing Side Seniority Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                             |
		| Testing Side Seniority Only One |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                             |
		| Testing Side Seniority Only One |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                             |
		| Testing Side Seniority Only One |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromSeniorityBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix    | Name                            |
		| Seniority | TestingSideSeniority1_Тестовий1 |
		| Seniority | TestingSideSeniority2_Тестовий2 |
	Given User creates and publish new Career Description
		| Field             | Value                   |
		| AboutTheProjectUs | AboutTheProjectUs       |
		| AboutTheProjectUa | AboutTheProjectUa       |
		| AboutTheRoleUs    | AboutTheRoleUs          |
		| AboutTheRoleUa    | AboutTheRoleUa          |
		| TitleUs           | TitleUsSideSeniority    |
		| TitleUa           | TitleUaSideSeniority    |
		| YouWillUs         | YouWillUs               |
		| YouWillUa         | YouWillUa               |
		| YouAreUs          | YouAreUs                |
		| YouAreUa          | YouAreUa                |
		| WeWillUs          | WeWillUs                |
		| WeWillUa          | WeWillUa                |
		| WeAreUs           | WeAreUs                 |
		| WeAreUa           | WeAreUa                 |
		| TechnologyStack   | TechnologyStackUs       |
		| SlugUs            | TestSlugUsSideSeniority |
	Given User creates new Career with 'TitleUsSideSeniority' career description and 'TestingSideSeniority1_Тестовий1,TestingSideSeniority2_Тестовий2' tag
		| NameUs              | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideSeniority | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                   |
		| TestingSideSeniority1 |
		| TestingSideSeniority2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                   |
		| TestingSideSeniority1 |
		| TestingSideSeniority2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                   |
		| TestingSideSeniority1 |
		| TestingSideSeniority2 |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                   |
		| TestingSideSeniority1 |
		| TestingSideSeniority2 |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                   |
		| TestingSideSeniority1 |
		| TestingSideSeniority2 |
	Then '2' tags are selected in 'Seniority levels' sider bar on 'CareerPage' container
	When User clicks on header 'Seniority levels' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Seniority levels' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromSenioritySideBarClickingResetButton
	# Precondition
	Given User creates tag
		| Prefix    | Name                                  |
		| Seniority | TestingResetSideSeniority1_Тестовий 1 |
		| Seniority | TestingResetSideSeniority2_Тестовий 2 |
	Given User creates and publish new Career Description
		| Field             | Value                        |
		| AboutTheProjectUs | AboutTheProjectUs            |
		| AboutTheProjectUa | AboutTheProjectUa            |
		| AboutTheRoleUs    | AboutTheRoleUs               |
		| AboutTheRoleUa    | AboutTheRoleUa               |
		| TitleUs           | TitleUsResetSideSeniority    |
		| TitleUa           | TitleUaResetSideSeniority    |
		| YouWillUs         | YouWillUs                    |
		| YouWillUa         | YouWillUa                    |
		| YouAreUs          | YouAreUs                     |
		| YouAreUa          | YouAreUa                     |
		| WeWillUs          | WeWillUs                     |
		| WeWillUa          | WeWillUa                     |
		| WeAreUs           | WeAreUs                      |
		| WeAreUa           | WeAreUa                      |
		| TechnologyStack   | TechnologyStackUs            |
		| SlugUs            | TestSlugUsResetSideSeniority |
	Given User creates new Career with 'TitleUsResetSideSeniority' career description and 'TestingResetSideSeniority1_Тестовий 1,TestingResetSideSeniority2_Тестовий 2' tag
		| NameUs                   | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsResetSideSeniority | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                           |
		| Testing Reset Side Seniority1 |
		| Testing Reset Side Seniority2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel