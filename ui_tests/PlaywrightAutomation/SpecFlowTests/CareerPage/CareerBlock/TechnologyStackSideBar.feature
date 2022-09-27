Feature: TechnologyStackSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromStackBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix | Name                             |
		| Stack  | TestingSideStackOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUsSideStackOnlyOne    |
		| TitleUa           | TitleUaSideStackOnlyOne    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsSideStackOnlyOne |
	Given User creates new Career with 'TitleUsSideStackOnlyOne' career description and 'TestingSideStackOnlyOne_Тестовий' tag
		| NameUs                 | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideStackOnlyOne | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag                     |
		| TestingSideStackOnlyOne |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                         |
		| Testing Side Stack Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                         |
		| Testing Side Stack Only One |
	Then Selected tags are displayed in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag                         |
		| Testing Side Stack Only One |
	Then Selected tags from 'Technology stack' filter side bar has correctly color on 'CareerPage' container
		| Tag                         |
		| Testing Side Stack Only One |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromStackBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix | Name                        |
		| Stack  | TestingSideStack1_Тестовий1 |
		| Stack  | TestingSideStack2_Тестовий2 |
	Given User creates and publish new Career Description
		| Field             | Value               |
		| AboutTheProjectUs | AboutTheProjectUs   |
		| AboutTheProjectUa | AboutTheProjectUa   |
		| AboutTheRoleUs    | AboutTheRoleUs      |
		| AboutTheRoleUa    | AboutTheRoleUa      |
		| TitleUs           | TitleUsSideStack    |
		| TitleUa           | TitleUaSideStack    |
		| YouWillUs         | YouWillUs           |
		| YouWillUa         | YouWillUa           |
		| YouAreUs          | YouAreUs            |
		| YouAreUa          | YouAreUa            |
		| WeWillUs          | WeWillUs            |
		| WeWillUa          | WeWillUa            |
		| WeAreUs           | WeAreUs             |
		| WeAreUa           | WeAreUa             |
		| TechnologyStack   | TechnologyStackUs   |
		| SlugUs            | TestSlugUsSideStack |
	Given User creates new Career with 'TitleUsSideStack' career description and 'TestingSideStack1_Тестовий1,TestingSideStack2_Тестовий2' tag
		| NameUs          | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideStack | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag               |
		| TestingSideStack1 |
		| TestingSideStack2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag               |
		| TestingSideStack1 |
		| TestingSideStack2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag               |
		| TestingSideStack1 |
		| TestingSideStack2 |
	Then Selected tags are displayed in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag               |
		| TestingSideStack1 |
		| TestingSideStack2 |
	Then Selected tags from 'Technology stack' filter side bar has correctly color on 'CareerPage' container
		| Tag               |
		| TestingSideStack1 |
		| TestingSideStack2 |
	Then '2' tags are selected in 'Technology stack' sider bar on 'CareerPage' container
	When User clicks on header 'Technology stack' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Technology stack' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromStackSideBarClickingResetButton
	# Precondition
	Given User creates tag
		| Prefix | Name                              |
		| Stack  | TestingResetSideStack1_Тестовий 1 |
		| Stack  | TestingResetSideStack2_Тестовий 2 |
	Given User creates and publish new Career Description
		| Field             | Value                    |
		| AboutTheProjectUs | AboutTheProjectUs        |
		| AboutTheProjectUa | AboutTheProjectUa        |
		| AboutTheRoleUs    | AboutTheRoleUs           |
		| AboutTheRoleUa    | AboutTheRoleUa           |
		| TitleUs           | TitleUsResetSideStack    |
		| TitleUa           | TitleUaResetSideStack    |
		| YouWillUs         | YouWillUs                |
		| YouWillUa         | YouWillUa                |
		| YouAreUs          | YouAreUs                 |
		| YouAreUa          | YouAreUa                 |
		| WeWillUs          | WeWillUs                 |
		| WeWillUa          | WeWillUa                 |
		| WeAreUs           | WeAreUs                  |
		| WeAreUa           | WeAreUa                  |
		| TechnologyStack   | TechnologyStackUs        |
		| SlugUs            | TestSlugUsResetSideStack |
	Given User creates new Career with 'TitleUsResetSideStack' career description and 'TestingResetSideStack1_Тестовий 1,TestingResetSideStack2_Тестовий 2' tag
		| NameUs               | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsResetSideStack | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag                       |
		| Testing Reset Side Stack1 |
		| Testing Reset Side Stack2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel