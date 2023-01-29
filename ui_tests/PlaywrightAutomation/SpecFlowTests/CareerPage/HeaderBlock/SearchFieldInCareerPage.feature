Feature: SearchFieldInCareerPage

@Regression @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringVacancyName
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1CareerSRND' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test1CareerSRND'

@Regresiion @TSWEB133 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancy
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1CareerSRND' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Test1CareerSRND'

@Regression @TSWEB133
Scenario: CheckThatUserSeesStartPageAfterDeletedTextFromSearchInput
	Given User is on career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'HeaderPage' container
	When User clears input on 'HeaderPage' container
	Then '' text is displayed in 'Search' input on 'HeaderPage' container
	Then The page has not changed after removed terms from search field