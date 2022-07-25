Feature: SearchBlock

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario Outline: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set '<textBySetInSearchByRoleField>' text in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contains '<Results>'

Examples:
	| Variants  | textBySetInSearchByRoleField | Results           |
	| Variant 1 | Back-End Engineer            | Back-End Engineer |
	| Variant 2 | Back                         | Back              |

@Regession @TSWEB133
Scenario: PageHasACorrectMessageAboutWithoutResults
	When User set 'wrongString' text in 'Search' by role field
	When User clicks on 'Search' button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is correctly

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	When User remember names from 'Card' vacancies on page
	When User set 'Any term' text in 'Search' by role field
	When User clicks on 'Clear' search field button
	Then 'Search' by role field is empty
	Then The page has not changed after removed terms from search field

@Regression @TSWEB133
Scenario: ThePageDisplaysVacanciesSelectedFromDirectionDropdown
	When User clicks on 'Direction' dropdown
	When User selects 'SoftwareDevelopment' vacancy from 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results contains 'Software Develop'
	Then 'SoftwareDevelopment' tag is displayed

@Regression @TSWEB133
Scenario: AllSelectedTagsAreDisplayedOnThePage
	When User clicks on 'Direction' dropdown
	When User selects tag vacancy from Direction dropdown
		| Vacancies           |
		| SoftwareDevelopment |
		| UIUX                |
		| Office              |
	When User clicks on 'Direction' dropdown
	When User clicks on 'Search' button
	Then Search results contains from dropdown
		| Vacancies           |
		| SoftwareDevelopment |
		| UIUX                |
		| Office              |
	Then 'SoftwareDevelopment' tag is displayed
	Then 'UIUX' tag is displayed
	Then 'Office' tag is displayed
	Then Count of selected tags is correctly

@Regression @TSWEB133
Scenario: ResetButtonCancelAllSelectedTags
	When User clicks on 'Direction' dropdown
	When User selects tag vacancy from Direction dropdown
		| Vacancies           |
		| SoftwareDevelopment |
		| UIUX                |
		| Office              |
	When User clicks 'Reset' div button
	Then All selected tags was cancel