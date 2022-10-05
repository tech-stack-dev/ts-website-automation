Feature: SearchField

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectResultsWhenEnteringVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates tag with default values
		| Prefix | Name |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates and publishes new Career Description with default values
		| NameUs                      | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsSideDirectionOfSearch |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'TestUsSideDirectionOfSearch' text to 'Search' input on 'CareerHeaderPage' container
	Then Search results contain 'TestUsSideDirectionOfSearch'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates tag
		| Prefix    | Name                                    |
		| Direction | TestingSideDirectionPartOfText_Тестовий |
	Given User creates and publishes new Career Description
		| Field             | Value                             |
		| AboutTheProjectUs | AboutTheProjectUs                 |
		| AboutTheProjectUa | AboutTheProjectUa                 |
		| AboutTheRoleUs    | AboutTheRoleUs                    |
		| AboutTheRoleUa    | AboutTheRoleUa                    |
		| TitleUs           | TitleUsSideDirectionPartOfText    |
		| TitleUa           | TitleUaSideDirectionPartOfText    |
		| YouWillUs         | YouWillUs                         |
		| YouWillUa         | YouWillUa                         |
		| YouAreUs          | YouAreUs                          |
		| YouAreUa          | YouAreUa                          |
		| WeWillUs          | WeWillUs                          |
		| WeWillUa          | WeWillUa                          |
		| WeAreUs           | WeAreUs                           |
		| WeAreUa           | WeAreUa                           |
		| TechnologyStack   | TechnologyStackUs                 |
		| SlugUs            | TestSlugUsSideDirectionPartOfText |
	Given User creates new Career with 'TitleUsSideDirectionPartOfText' career description and 'TestingSideDirectionPartOfText_Тестовий' tag
		| NameUs                        | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUsSideDirectionPartOfText | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'Test' text to 'Search' input on 'CareerHeaderPage' container
	Then Search results contain 'Test'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesStartPageAfterClearedTextFromSearchInputInCareerBlock
	Given User is on career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'CareerHeaderPage' container
	When User clears input on 'CareerHeaderPage' container
	Then '' text is displayed in 'Search' input on 'CareerHeaderPage' container
	Then The page has not changed after removed terms from search field

@Regession @TSWEB145
Scenario: CheckThatUserSeesMessageAboutFailSearchResultsAfterClearedSearchInputInCareerBlock
	Given User is on career website
	When User set 'wrongString' text to 'Search' input on 'CareerHeaderPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regession @TSWEB145
Scenario: CheckThatAllDropdownsAreExpandedByDefault
	Given User is on career website
	Then Dropdowns are expanded on 'CareerPage' container
		| Dropdown         |
		| Direction        |
		| Seniority levels |
		| Tags             |
		| Technology stack |