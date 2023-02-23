Feature: SearchField

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectResultsWhenEnteringVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1Career{SRND}' text to 'Search' input on 'CareerMainPage' container
	Then User sees 'Test1Career{SRND}' search value and '1' count of results
	Then Search results contain 'Test1Career{SRND}'

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1Career{SRND}' text to 'Search' input on 'CareerMainPage' container
	Then User sees 'Test1Career{SRND}' search value and '1' count of results
	Then Search results contain 'Test1'

@Regression @FilterBlock @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesStartPageAfterClearedTextFromSearchInputInCareerBlock
	Given User is on career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'CareerMainPage' container
	When User clears input on 'CareerMainPage' container
	Then '' text is displayed in 'Search' input on 'CareerMainPage' container
	Then The page has not changed after removed terms from search field

@Regession @FilterBlock @TSWEB145
Scenario: CheckThatUserSeesMessageAboutFailSearchResultsAfterClearedSearchInputInCareerBlock
	Given User is on career website
	When User set 'wrongString' text to 'Search' input on 'CareerMainPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regession @FilterBlock @TSWEB145
Scenario: CheckThatAllDropdownsAreExpandedByDefault
	Given User is on career website
	Then Dropdowns are expanded on 'CareerPage' container
		| Dropdown         |
		| Direction        |
		| Seniority levels |
		| Tags             |
		| Technology stack |