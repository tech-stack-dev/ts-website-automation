@retry(2)
Feature: JobsBlock

Background:
	Given User is on the career website

@Regression @TSWEB146
Scenario: CheckNavigationHeaderInCareerPage
	Then 'Techstack' logo is displayed in the main page
	Then The page has 'En' language switcher
	Then The page has 'Ua' language switcher
	Then The page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Contact us |
		| Reviews    |