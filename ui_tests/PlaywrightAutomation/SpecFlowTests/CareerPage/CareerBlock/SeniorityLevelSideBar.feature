Feature: SeniorityLevelSideBar

# Test should be moved to TypeScript solution, details in TSWEB-560
@Regression @FilterBlock @TSWEB145 @Cleanup @NotRun
Scenario: CheckThatUserSeesVacancySelectedFromSeniorityBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromSeniorityBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
		| Seniority | Test2Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
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
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	Then '2' tags are selected in 'Seniority levels' sider bar on 'CareerPage' container
	When User clicks on header 'Seniority levels' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Seniority levels' side bar on 'CareerPage' container equals to '2'

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromSenioritySideBarClickingResetButton
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
		| Seniority | Test2Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	When User clicks 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel