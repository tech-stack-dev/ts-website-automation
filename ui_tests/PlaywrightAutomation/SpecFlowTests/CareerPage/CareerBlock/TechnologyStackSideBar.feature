Feature: TechnologyStackSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromStackBlockInSideBar
	# Precondition
	Given User creates tag with default values
		| Prefix | Name                                            |
		| Stack  | TestingSideStackOnlyOne_ТестовийБоковийСтекОдин |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                 | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideStackOnlyOne |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
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
	Given User creates tag with default values
		| Prefix | Name                                   |
		| Stack  | TestingSideStack1_ТестовийБоковийСтек1 |
		| Stack  | TestingSideStack2_ТестовийБоковийСтек2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs          | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideStack |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
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
	Given User creates tag with default values
		| Prefix | Name                                                 |
		| Stack  | TestingResetSideStack1_ТестовийВидалитиБоковийСтек 1 |
		| Stack  | TestingResetSideStack2_ТестовийВидалитиБоковийСтек 2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs               | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetSideStack |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag                       |
		| Testing Reset Side Stack1 |
		| Testing Reset Side Stack2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel