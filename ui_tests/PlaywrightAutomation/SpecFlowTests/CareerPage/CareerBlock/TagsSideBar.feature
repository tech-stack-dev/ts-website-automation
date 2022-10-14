Feature: TagsSideSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromTagBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix | Name                           |
		| Tag    | TestingSideTagOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                    |
		| AboutTheProjectUs | AboutTheProjectUs        |
		| AboutTheProjectUa | AboutTheProjectUa        |
		| AboutTheRoleUs    | AboutTheRoleUs           |
		| AboutTheRoleUa    | AboutTheRoleUa           |
		| TitleUs           | TitleUsSideTagOnlyOne    |
		| TitleUa           | TitleUaSideTagOnlyOne    |
		| YouWillUs         | YouWillUs                |
		| YouWillUa         | YouWillUa                |
		| YouAreUs          | YouAreUs                 |
		| YouAreUa          | YouAreUa                 |
		| WeWillUs          | WeWillUs                 |
		| WeWillUa          | WeWillUa                 |
		| WeAreUs           | WeAreUs                  |
		| WeAreUa           | WeAreUa                  |
		| TechnologyStack   | TechnologyStackUs        |
		| SlugUs            | TestSlugUsSideTagOnlyOne |
	Given User creates new Career with 'TitleUsSideTagOnlyOne' career description and 'TestingSideTagOnlyOne_Тестовий' tag
		| NameUs               | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideTagOnlyOne | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag                   |
		| TestingSideTagOnlyOne |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                       |
		| Testing Side Tag Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                       |
		| Testing Side Tag Only One |
	Then Selected tags are displayed in 'Tags' filter side bar on 'CareerPage' container
		| Tag                       |
		| Testing Side Tag Only One |
	Then Selected tags from 'Tags' filter side bar has correctly color on 'CareerPage' container
		| Tag                       |
		| Testing Side Tag Only One |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromTagBlockInSideBar
	# Precondition
	Given User creates tag
		| Prefix | Name                      |
		| Tag    | TestingSideTag1_Тестовий1 |
		| Tag    | TestingSideTag2_Тестовий2 |
	Given User creates and publish new Career Description
		| Field             | Value             |
		| AboutTheProjectUs | AboutTheProjectUs |
		| AboutTheProjectUa | AboutTheProjectUa |
		| AboutTheRoleUs    | AboutTheRoleUs    |
		| AboutTheRoleUa    | AboutTheRoleUa    |
		| TitleUs           | TitleUsSideTag    |
		| TitleUa           | TitleUaSideTag    |
		| YouWillUs         | YouWillUs         |
		| YouWillUa         | YouWillUa         |
		| YouAreUs          | YouAreUs          |
		| YouAreUa          | YouAreUa          |
		| WeWillUs          | WeWillUs          |
		| WeWillUa          | WeWillUa          |
		| WeAreUs           | WeAreUs           |
		| WeAreUa           | WeAreUa           |
		| TechnologyStack   | TechnologyStackUs |
		| SlugUs            | TestSlugUsSideTag |
	Given User creates new Career with 'TitleUsSideTag' career description and 'TestingSideTag1_Тестовий1,TestingSideTag2_Тестовий2' tag
		| NameUs        | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideTag | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag             |
		| TestingSideTag1 |
		| TestingSideTag2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag             |
		| TestingSideTag1 |
		| TestingSideTag2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag             |
		| TestingSideTag1 |
		| TestingSideTag2 |
	Then Selected tags are displayed in 'Tags' filter side bar on 'CareerPage' container
		| Tag             |
		| TestingSideTag1 |
		| TestingSideTag2 |
	Then Selected tags from 'Tags' filter side bar has correctly color on 'CareerPage' container
		| Tag             |
		| TestingSideTag1 |
		| TestingSideTag2 |
	Then '2' tags are selected in 'Tags' sider bar on 'CareerPage' container
	When User clicks on header 'Tags' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Tags' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromTagSideBarClickingResetButton
	# Precondition
	Given User creates tag
		| Prefix | Name                            |
		| Tag    | TestingResetSideTag1_Тестовий 1 |
		| Tag    | TestingResetSideTag2_Тестовий 2 |
	Given User creates and publish new Career Description
		| Field             | Value                  |
		| AboutTheProjectUs | AboutTheProjectUs      |
		| AboutTheProjectUa | AboutTheProjectUa      |
		| AboutTheRoleUs    | AboutTheRoleUs         |
		| AboutTheRoleUa    | AboutTheRoleUa         |
		| TitleUs           | TitleUsResetSideTag    |
		| TitleUa           | TitleUaResetSideTag    |
		| YouWillUs         | YouWillUs              |
		| YouWillUa         | YouWillUa              |
		| YouAreUs          | YouAreUs               |
		| YouAreUa          | YouAreUa               |
		| WeWillUs          | WeWillUs               |
		| WeWillUa          | WeWillUa               |
		| WeAreUs           | WeAreUs                |
		| WeAreUa           | WeAreUa                |
		| TechnologyStack   | TechnologyStackUs      |
		| SlugUs            | TestSlugUsResetSideTag |
	Given User creates new Career with 'TitleUsResetSideTag' career description and 'TestingResetSideTag1_Тестовий 1,TestingResetSideTag2_Тестовий 2' tag
		| NameUs             | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsResetSideTag | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag                     |
		| Testing Reset Side Tag1 |
		| Testing Reset Side Tag2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel