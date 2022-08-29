@retry(2)
Feature: DropdownInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: ThePageDisplaysVacanciesSelectedFromDirectionDropdown
	When User creates tag
		| Prefix    | Name                             |
		| Direction | TestingDirectionOnlyOne_Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                     |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsDirectionOnlyOne |
	When User creates new Career with 'TitleUs' career description and 'TestingDirectionOnlyOne_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
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
Scenario: AllSelectedTagsAreDisplayedOnThePage
	When User creates tag
		| Prefix    | Name                        |
		| Direction | 1TestingDirection_Тестовий  |
		| Direction | 2TestingDirection_2Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                     |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsDirectionSeveral |
	When User creates new Career with 'TitleUs' career description and '1TestingDirection_Тестовий,2TestingDirection_2Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results equal to selected tag
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	Then Selected tags are displayed in 'Direction' filter side bar on 'CareerPage' container
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	Then Selected tags from 'Direction' filter side bar has correctly color on 'CareerPage' container
		| Tag               |
		| 1TestingDirection |
		| 2TestingDirection |
	Then '2' tags are selected in 'Direction' dropdown
	Then Number of selected tags equals to '2'

@Regression @TSWEB133 @Cleanup
Scenario: ThePageDisplayedSelectedTagFromSeniorityLevelDropdown
	When User creates tag
		| Prefix    | Name                             |
		| Seniority | TestingSeniorityOnlyOne_Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                     |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsSeniorityOnlyOne |
	When User creates new Career with 'TitleUs' career description and 'TestingSeniorityOnlyOne_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
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
Scenario: AllSelectedTagsDisplayedOnThePageAndTagsCounterIsCorrectly
	When User creates tag
		| Prefix    | Name                          |
		| Seniority | 1 Testing Seniority_Тестовий  |
		| Seniority | 2 Testing Seniority_2Тестовий |
		| Seniority | 3 Testing Seniority_3Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                     |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsSenioritySeveral |
	When User creates new Career with 'TitleUs' career description and '1 Testing Seniority_Тестовий,2 Testing Seniority_2Тестовий,3 Testing Seniority_3Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User clicks on 'SeniorityLevel' dropdown
	When User selects tag from 'SeniorityLevel' dropdown
		| Tag                 |
		| 1 Testing Seniority |
		| 2 Testing Seniority |
		| 3 Testing Seniority |
	When User clicks on 'SeniorityLevel' dropdown
	Then Selected tags are displayed as active in Filters list on 'CareerPage' container
		| Tag                 |
		| 1 Testing Seniority |
		| 2 Testing Seniority |
		| 3 Testing Seniority |
	Then Selected tags has correct color in Filters list on 'CareerPage' container
		| Tag                 |
		| 1 Testing Seniority |
		| 2 Testing Seniority |
		| 3 Testing Seniority |
	Then Selected tags are displayed in 'Seniority levels' filter side bar on 'CareerPage' container
		| Tag                 |
		| 1 Testing Seniority |
		| 2 Testing Seniority |
		| 3 Testing Seniority |
	Then Selected tags from 'Seniority levels' filter side bar has correctly color on 'CareerPage' container
		| Tag                 |
		| 1 Testing Seniority |
		| 2 Testing Seniority |
		| 3 Testing Seniority |
	Then '3' tags are selected in 'SeniorityLevel' dropdown
	Then Number of selected tags equals to '3'