Feature: SearchFieldInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyName
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                              |
		| Direction | TestingDirectionOfSearch_ТестовийПошукЗаНапрямком |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                  | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsDirectionOfSearch |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'TestUsDirectionOfSearch' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'TestUsDirectionOfSearch'

@Regresiion @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancy
	# Precondition
	Given User creates tag with default values
		| Prefix    | Name                                                    |
		| Direction | TestingDirectionPartOfText_ТестовийНапрямокЧастинаНазви |
	Given User creates and publishes new Career Description with default values
		| Field | Value |
	Given User creates default Career with career description and tag
		| NameUs                    | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
		| TestUsDirectionPartOfText |        |               |               | Link | Entry    |
	# Scenario
	Given User is on career website
	When User set 'Test' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test'

@Regression @TSWEB133
Scenario: CheckThatUserSeesStartPageAfterDeletedTextFromSearchInput
	Given User is on career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'HeaderPage' container
	When User clears input on 'HeaderPage' container
	Then '' text is displayed in 'Search' input on 'HeaderPage' container
	Then The page has not changed after removed terms from search field