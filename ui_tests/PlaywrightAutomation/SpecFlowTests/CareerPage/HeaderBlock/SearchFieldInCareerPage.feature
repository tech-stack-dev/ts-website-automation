Feature: SearchFieldInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyName
	# Precondition
	Given User creates tag
		| Prefix    | Name                              |
		| Direction | TestingDirectionOfSearch_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                       |
		| AboutTheProjectUs | AboutTheProjectUs           |
		| AboutTheProjectUa | AboutTheProjectUa           |
		| AboutTheRoleUs    | AboutTheRoleUs              |
		| AboutTheRoleUa    | AboutTheRoleUa              |
		| TitleUs           | TitleUsDirectionOfSearch    |
		| TitleUa           | TitleUaDirectionOfSearch    |
		| YouWillUs         | YouWillUs                   |
		| YouWillUa         | YouWillUa                   |
		| YouAreUs          | YouAreUs                    |
		| YouAreUa          | YouAreUa                    |
		| WeWillUs          | WeWillUs                    |
		| WeWillUa          | WeWillUa                    |
		| WeAreUs           | WeAreUs                     |
		| WeAreUa           | WeAreUa                     |
		| TechnologyStack   | TechnologyStackUs           |
		| SlugUs            | TestSlugUsDirectionOfSearch |
	Given User creates new Career with 'TitleUsDirectionOfSearch' career description and 'TestingDirectionOfSearch_Тестовий' tag
		| NameUs                  | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsDirectionOfSearch | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User set 'TestUsDirectionOfSearch' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'TestUsDirectionOfSearch'

@Regresiion @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancy
	# Precondition
	Given User creates tag
		| Prefix    | Name                                |
		| Direction | TestingDirectionPartOfText_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                         |
		| AboutTheProjectUs | AboutTheProjectUs             |
		| AboutTheProjectUa | AboutTheProjectUa             |
		| AboutTheRoleUs    | AboutTheRoleUs                |
		| AboutTheRoleUa    | AboutTheRoleUa                |
		| TitleUs           | TitleUsDirectionPartOfText    |
		| TitleUa           | TitleUaDirectionPartOfText    |
		| YouWillUs         | YouWillUs                     |
		| YouWillUa         | YouWillUa                     |
		| YouAreUs          | YouAreUs                      |
		| YouAreUa          | YouAreUa                      |
		| WeWillUs          | WeWillUs                      |
		| WeWillUa          | WeWillUa                      |
		| WeAreUs           | WeAreUs                       |
		| WeAreUa           | WeAreUa                       |
		| TechnologyStack   | TechnologyStackUs             |
		| SlugUs            | TestSlugUsDirectionPartOfText |
	Given User creates new Career with 'TitleUsDirectionPartOfText' career description and 'TestingDirectionPartOfText_Тестовий' tag
		| NameUs                    | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsDirectionPartOfText | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User set 'Test' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test'

@Regression @TSWEB133
Scenario: CheckThatUserSeesStartPageAfterDeletedTextFromSearchInput
	Given User is on the career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'HeaderPage' container
	When User clears input on 'HeaderPage' container
	Then '' text is displayed in 'Search' input on 'HeaderPage' container
	Then The page has not changed after removed terms from search field