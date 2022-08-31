@retry(2)
Feature: InitialTest

Initial test. Will be removed

Background:
	Given User is on the career website

@Regression
Scenario: Default_translation_and_translation_switch
	Then 'En' language is selected
	When User selects 'Ua' language
	Then 'Ua' language is selected

@Regression
Scenario: CheckLogoDisplayedInMainPage
	Then 'Techstack' logo is displayed in the main page