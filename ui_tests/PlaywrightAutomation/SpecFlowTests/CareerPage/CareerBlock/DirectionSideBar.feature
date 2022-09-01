@retry(2)
Feature: DirectionBlock

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionBlockInSideBar
	Given User creates tag
		| Prefix    | Name                                 |
		| Direction | TestingSideDirectionOnlyOne_Тестовий |
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
	Given User creates new Career with 'TitleUs' career description and 'TestingSideDirectionOnlyOne_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                         |
		| TestingSideDirectionOnlyOne |
	Then Search results equal to selected tag
		| Tag                         |
		| TestingSideDirectionOnlyOne |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                             |
		| Testing Side Direction Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                             |
		| Testing Side Direction Only One |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag                             |
		| Testing Side Direction Only One |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag                             |
		| Testing Side Direction Only One |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionBlockInSideBar
	Given User creates tag
		| Prefix    | Name                            |
		| Direction | TestingSideDirection1_Тестовий1 |
		| Direction | TestingSideDirection2_Тестовий2 |
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
	Given User creates new Career with 'TitleUs' career description and 'TestingSideDirection1_Тестовий1,TestingSideDirection2_Тестовий2' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then Search results equal to selected tag
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag                   |
		| TestingSideDirection1 |
		| TestingSideDirection2 |
	Then '2' tags are selected in 'Direction' sider bar on 'CareerPage' container
	When User clicks on header 'Direction' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Direction' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionSideBarClickingResetButton
	Given User creates tag
		| Prefix    | Name                                  |
		| Direction | TestingResetSideDirection1_Тестовий 1 |
		| Direction | TestingResetSideDirection2_Тестовий 2 |
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
	Given User creates new Career with 'TitleUs' career description and 'TestingResetSideDirection1_Тестовий 1,TestingResetSideDirection2_Тестовий 2' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                           |
		| Testing Reset Side Direction1 |
		| Testing Reset Side Direction2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel