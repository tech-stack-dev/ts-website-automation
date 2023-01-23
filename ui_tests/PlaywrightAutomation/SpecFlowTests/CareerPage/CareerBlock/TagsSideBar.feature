Feature: TagsSideSideBar

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromTagBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix | Name         |
		| Tag    | Test1TagSRND |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
	Then Selected tags are displayed in 'Tags' filter side bar on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
	Then Selected tags from 'Tags' filter side bar has correctly color on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromTagBlockInSideBar
	# Precondition
	Given User creates Tags
		| Prefix | Name         |
		| Tag    | Test1TagSRND |
		| Tag    | Test2TagSRND |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	Then Selected tags are displayed in 'Tags' filter side bar on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	Then Selected tags from 'Tags' filter side bar has correctly color on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	Then '2' tags are selected in 'Tags' sider bar on 'CareerPage' container
	When User clicks on header 'Tags' filter sider bar on 'CareerPage' container
	Then Number of selected tags in 'Tags' side bar on 'CareerPage' container equals to '2'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserDeleteSelectedTagsFromTagSideBarClickingResetButton
	# Precondition
	Given User creates Tags
		| Prefix | Name         |
		| Tag    | Test1TagSRND |
		| Tag    | Test2TagSRND |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User selects tags in 'Tags' filter side bar on 'CareerPage' container
		| Tag          |
		| Test1TagSRND |
		| Test2TagSRND |
	When User clicks on 'Reset' button on 'CareerPage' container
	Then All selected tags was cancel