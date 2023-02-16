Feature: TechnologyStackSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromStackBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix | Name           |
		| Stack  | Test1Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags from 'Technology stack' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromStackBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix | Name           |
		| Stack  | Test1Tag{SRND} |
		| Stack  | Test2Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
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
	Then Selected tags are displayed in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags from 'Technology stack' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then '2' tags are selected in 'Technology stack' sider bar on 'CareerPage' container
	When User clicks on header 'Technology stack' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Technology stack' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromStackSideBarClickingResetButton
	# Precondition
	Given User creates Tags
		| Prefix | Name           |
		| Stack  | Test1Tag{SRND} |
		| Stack  | Test2Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Technology stack' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	When User clicks 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel