@retry(2)
Feature: SearchFieldInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User creates tag
		| Prefix    | Name                              |
		| Direction | TestingDirectionOfSearch_Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                      |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsDirectionOfSearch |
	When User creates new Career with 'TitleUs' career description and 'TestingDirectionOfSearch_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User set 'TestUs' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'TestUs'

@Regresiion @TSWEB133 @Cleanup
Scenario: SearchResultsContainsPartOfTheNameVacancy
	When User creates tag
		| Prefix    | Name                                |
		| Direction | TestingDirectionPartOfText_Тестовий |
	When User creates and publish new Career Description
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStack   | SlugUs                        |
		| AboutTheProjectUs | AboutTheProjectUa | AboutTheRoleUs | AboutTheRoleUa | TitleUs | TitleUa | YouWillUs | YouWillUa | YouAreUs | YouAreUa | WeWillUs | WeWillUa | WeAreUs | WeAreUa | TechnologyStackUs | TestSlugUsDirectionPartOfText |
	When User creates new Career with 'TitleUs' career description and 'TestingDirectionPartOfText_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	Given User is on the career website
	When User set 'Test' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test'

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	Given User is on the career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'HeaderPage' container
	When User clears input on 'HeaderPage' container
	Then '' text is displayed in 'Search' input on 'HeaderPage' container
	Then The page has not changed after removed terms from search field