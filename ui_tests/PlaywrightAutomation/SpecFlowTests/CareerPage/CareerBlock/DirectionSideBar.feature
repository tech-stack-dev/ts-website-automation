Feature: DirectionSideBar

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionBlockInSideBar
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Search results equal to selected tag
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionBlockInSideBar
	# Precondition
	Given User creates '2' Tags
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Search results equal to selected tag
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then '2' tags are selected in 'Direction' sider bar on 'CareerPage' container
	When User clicks on header 'Direction' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Direction' side bar on 'CareerPage' container equals to '2'

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromDirectionSideBarClickingResetButton
	# Precondition
	Given User creates '2' Tags
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Direction' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	When User clicks 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel