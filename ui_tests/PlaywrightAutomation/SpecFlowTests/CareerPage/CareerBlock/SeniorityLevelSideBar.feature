Feature: SeniorityLevelSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromSeniorityBlockInSideBar
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                                  |
		| Seniority | TestingSideSeniorityOnlyOne_ТестовийРівеньБоковийОдин |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                     | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideSeniorityOnlyOne |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects objects to be created
		| Type    | Name                        |
		| Vacancy | TestUsSideSeniorityOnlyOne  |
		| Tag     | TestingSideSeniorityOnlyOne |
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
	Given User creates tag with default values
		| Prefix    | Name                                         |
		| Seniority | TestingSideSeniority1_ТестовийРівеньБоковий1 |
		| Seniority | TestingSideSeniority2_ТестовийРівеньБоковий2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs              | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideSeniority |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects objects to be created
		| Type    | Name                  |
		| Vacancy | TestUsSideSeniority   |
		| Tag     | TestingSideSeniority1 |
		| Tag     | TestingSideSeniority2 |
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
	Given User creates tag with default values
		| Prefix    | Name                                                       |
		| Seniority | TestingResetSideSeniority1_ТестовийВидалитиБоковийРівень 1 |
		| Seniority | TestingResetSideSeniority2_ТестовийВидалитиБоковийРівень 2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                   | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetSideSeniority |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects objects to be created
		| Type    | Name                       |
		| Vacancy | TestUsResetSideSeniority   |
		| Tag     | TestingResetSideSeniority1 |
		| Tag     | TestingResetSideSeniority2 |
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                           |
		| Testing Reset Side Seniority1 |
		| Testing Reset Side Seniority2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel