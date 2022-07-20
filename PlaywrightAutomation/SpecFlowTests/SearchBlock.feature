Feature: SearchBlock

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario Outline: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set '<textBySetInSearchByRoleField>' text in search by role field
	When User clicks on Search button
	Then Search results contains '<Results>'

Examples:
	| textBySetInSearchByRoleField | Results           |
	| Back-End Engineer            | Back-End Engineer |
	| Back                         | Back              |

@Regession @TSWEB133
Scenario: PageHasACorrectErrorMessageIfEnterNameThatDoesNotMatchAnyOfTheExcistingJobs
	When User set 'wrongString' text in search by role field
	When User clicks on Search button
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' error message is correctly

@Regression @TSWEB133
Scenario: AfterDeleteTextFromSearchFieldPageRemainedUnchanged
	When User remember names vacancies on page
	When User set 'Any term' text in search by role field
	When User clicks on clear search field button
	Then Search by role field is empty
	Then Positions on the page equals to positions before enter any terms