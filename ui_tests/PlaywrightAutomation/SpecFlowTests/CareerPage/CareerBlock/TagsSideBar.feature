Feature: TagsSideSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromTagBlockInSideBar
	# Precondition
	Given User creates tag with default values
		| Prefix | Name                                         |
		| Tag    | TestingSideTagOnlyOne_ТестовийБоковийТегОдин |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs               | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideTagOnlyOne |        |               |               | Link | Entry    |
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
	Given User creates tag with default values
		| Prefix | Name                                |
		| Tag    | TestingSideTag1_ТестовийБоковийТег1 |
		| Tag    | TestingSideTag2_ТестовийБоковийТег2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs        | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideTag |        |               |               | Link | Entry    |
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
	Given User creates tag with default values
		| Prefix | Name                                              |
		| Tag    | TestingResetSideTag1_ТестовийВидалитиБоковийТег 1 |
		| Tag    | TestingResetSideTag2_ТестовийВидалитиБоковийТег 2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs             | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsResetSideTag |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag                     |
		| Testing Reset Side Tag1 |
		| Testing Reset Side Tag2 |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel