Feature: SearchBlock

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario Outline: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set '<textBySetInSearchByRoleField>' text in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contains '<Results>'

Examples:
	| textBySetInSearchByRoleField | Results           |
	| Back-End Engineer            | Back-End Engineer |
	| Back                         | Back              |

@Regession @TSWEB133
Scenario: PageHasACorrectMessageAboutWithoutResults
	When User set 'wrongString' text in 'Search' by role field
	When User clicks on 'Search' button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' error message is correctly

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	When User remember names from 'Card' vacancies on page
	When User set 'Any term' text in 'Search' by role field
	When User clicks on 'Clear' search field button
	Then 'Search' by role field is empty
	Then Positions on the page equals to positions before enter any terms

@Regression @TSWEB133
Scenario: ThePageDisplaysVacanciesSelectedFromDirectionDropdown
	When User selects 'SoftwareDevelopment' vacancy from 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results contains 'Software Develop'
	Then Selected tag is displayed 