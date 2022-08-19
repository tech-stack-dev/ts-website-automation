@retry(2)
Feature: SearchFieldInCareerPage

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set 'Back-End Engineer' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Back-End Engineer'

@Regresiion @TSWEB133
Scenario: SearchResultsContainsPartOfTheNameVacancy
	When User set 'Back' text to 'Search' input on 'HeaderPage' container
	When User clicks on 'Search' button on 'HeaderPage' container
	Then Search results contain 'Back'

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'HeaderPage' container
	When User clears input on 'HeaderPage' container
	Then '' text is displayed in 'Search' input on 'HeaderPage' container
	Then The page has not changed after removed terms from search field