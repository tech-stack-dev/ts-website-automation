@retry(2)
Feature: DirectionBlock

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionBlockInSideBar
	Given User creates tag
		| Prefix    | Name                             |
		| Direction | TestingDirectionOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingDirectionOnlyOne_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                     |
		| TestingDirectionOnlyOne |
	Then Search results equal to selected tag
		| Tag                     |
		| TestingDirectionOnlyOne |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionBlockInSideBar
	Given User creates tag
		| Prefix    | Name                        |
		| Direction | TestingDirection1_Тестовий1 |
		| Direction | TestingDirection2_Тестовий2 |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingDirection1_Тестовий1,TestingDirection2_Тестовий2' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Search results equal to selected tag
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then '2' tags are selected in 'Direction' sider bar on 'CareerPage' container
	When User clicks on header 'Direction' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Direction' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionSideBarClickingResetButton
	Given User creates tag
		| Prefix    | Name                               |
		| Direction | TestingResetDirection1_Тестовий 1 |
		| Direction | TestingResetDirection2_Тестовий 2 |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingResetDirection1_Тестовий 1,TestingResetDirection2_Тестовий 2' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                     |
		| Testing Reset Direction1 |
		| Testing Reset Direction2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel