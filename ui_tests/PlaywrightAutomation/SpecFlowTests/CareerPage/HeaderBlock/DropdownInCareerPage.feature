Feature: DropdownInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionDropdown
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                                 |
		| Direction | TestingDirectionOnlyOne_ТестовийНапрямокОднаВакансія |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                 | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsDirectionOnlyOne |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                        |
		| Testing Direction Only One |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results equal to selected tag
		| Tag                     |
		| TestingDirectionOnlyOne |
	Then 'TestingDirectionOnlyOne' tag name displayed in 'Direction' dropdown field
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag                        |
		| Testing Direction Only One |

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionDropdown
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                |
		| Direction | TestingDirection1_ТестовийНапрямок1 |
		| Direction | TestingDirection2_ТестовийНапрямок2 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs          | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsDirection |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results equal to selected tag
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag               |
		| TestingDirection1 |
		| TestingDirection2 |
	Then '2' tags are selected in 'Direction' dropdown
	Then Number of selected tags equals to '2'

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromSeniorityLevelDropdown
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                               |
		| Seniority | TestingSeniorityOnlyOne_ТестовийРівеньОднаВакансія |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                 | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSeniorityOnlyOne |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                     |
		| TestingSeniorityOnlyOne |
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                     |
		| TestingSeniorityOnlyOne |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                     |
		| TestingSeniorityOnlyOne |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                     |
		| TestingSeniorityOnlyOne |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                     |
		| TestingSeniorityOnlyOne |

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacanciesSelectedFromSeniorityLevelDropdown
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                 |
		| Seniority | Testing Seniority 1_ТестовийРівень 1 |
		| Seniority | Testing Seniority 2_ТестовийРівень 2 |
		| Seniority | Testing Seniority 3_ТестовийРівень 3 |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs          | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSeniority |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                 |
		| Testing Seniority 1 |
		| Testing Seniority 2 |
		| Testing Seniority 3 |
	When User clicks on 'SeniorityLevel' dropdown
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                 |
		| Testing Seniority 1 |
		| Testing Seniority 2 |
		| Testing Seniority 3 |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                 |
		| Testing Seniority 1 |
		| Testing Seniority 2 |
		| Testing Seniority 3 |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                 |
		| Testing Seniority 1 |
		| Testing Seniority 2 |
		| Testing Seniority 3 |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                 |
		| Testing Seniority 1 |
		| Testing Seniority 2 |
		| Testing Seniority 3 |
	Then '3' tags are selected in 'SeniorityLevel' dropdown
	Then Number of selected tags equals to '3'