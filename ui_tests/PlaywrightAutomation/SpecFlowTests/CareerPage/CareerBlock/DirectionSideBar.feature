Feature: DirectionSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionBlockInSideBar
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                                    |
		| Direction | TestingSideDirectionOnlyOne_ТестовийНапрямокБоковийОдин |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                     | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideDirectionOnlyOne |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                        |
		| Vacancy | TestUsSideDirectionOnlyOne  |
		| Tag     | TestingSideDirectionOnlyOne |
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
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                           |
		| Direction | TestingSideDirection1_ТестовийНапрямокБоковий1 |
		| Direction | TestingSideDirection2_ТестовийНапрямокБоковий2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs              | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideDirection |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                  |
		| Vacancy | TestUsSideDirection   |
		| Tag     | TestingSideDirection1 |
		| Tag     | TestingSideDirection2 |
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
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                                         |
		| Direction | TestingResetSideDirection1_ТестовийВидалитиНапрямокБоковий 1 |
		| Direction | TestingResetSideDirection2_ТестовийВидалитиНапрямокБоковий 2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                   | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetSideDirection |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                       |
		| Vacancy | TestUsResetSideDirection   |
		| Tag     | TestingResetSideDirection1 |
		| Tag     | TestingResetSideDirection2 |
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag                           |
		| Testing Reset Side Direction1 |
		| Testing Reset Side Direction2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel