Feature: DropdownInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionDropdown
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results equal to selected tag
		| Tag            |
		| Test1Tag{SRND} |
	Then 'Test1Tag{SRND}' tag name displayed in 'Direction' dropdown field
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

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionDropdown
	# Precondition
	Given User creates '2' Tags
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button on 'HeaderPage' container
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
	Then '2' tags are selected in 'Direction' dropdown
	Then Number of selected tags equals to '2'

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromSeniorityLevelDropdown
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
	When User clicks on 'Seniority Level' dropdown
	When User selects tag from 'Seniority Level' dropdown
		| Tag            |
		| Test1Tag{SRND} |
	When User clicks on 'Search' button on 'HeaderPage' container
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

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromSeniorityLevelDropdown
	# Precondition
	Given User creates Tags
		| Prefix    | Name           |
		| Seniority | Test1Tag{SRND} |
		| Seniority | Test2Tag{SRND} |
		| Seniority | Test3Tag{SRND} |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Seniority Level' dropdown
	When User selects tag from 'Seniority Level' dropdown
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	When User clicks on 'Seniority Level' dropdown
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag            |
		| Test1Tag{SRND} |
		| Test2Tag{SRND} |
		| Test3Tag{SRND} |
	Then '3' tags are selected in 'Seniority Level' dropdown
	Then Number of selected tags equals to '3'