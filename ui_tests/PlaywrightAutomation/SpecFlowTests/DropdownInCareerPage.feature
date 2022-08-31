@retry(2)
Feature: DropdownInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesVacancySelectedFromDirectionDropdown
	Given User creates tag
		| Prefix    | Name                             |
		| Direction | TestingDirectionOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingDirectionOnlyOne_Тестовий' tag
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
Scenario: CheckThatUserSeesVacanciesSelectedFromDirectionDropdown
	Given User creates tag
		| Prefix    | Name                        |
		| Direction | TestingDirection1_Тестовий1 |
		| Direction | TestingDirection2_Тестовий2 |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingDirection1_Тестовий1,TestingDirection2_Тестовий2' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
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
	Given User creates tag
		| Prefix    | Name                             |
		| Seniority | TestingSeniorityOnlyOne_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingSeniorityOnlyOne_Тестовий' tag
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
Scenario: CheckThatUserSeesVacanciesSelectedFromSeniorityLevelDropdown
	Given User creates tag
		| Prefix    | Name                           |
		| Seniority | Testing Seniority 1_Тестовий 1 |
		| Seniority | Testing Seniority 2_Тестовий 2 |
		| Seniority | Testing Seniority 3_Тестовий 3 |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'Testing Seniority 1_Тестовий 1,Testing Seniority 2_Тестовий 2,Testing Seniority 3_Тестовий 3' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
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