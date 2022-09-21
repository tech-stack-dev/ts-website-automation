@retry(2)
Feature: HomePage

Background:
	Given User is on the career website

@Regression
Scenario: CheckThatUserCanSwithedLanguageInHeader
	Then 'En' language is selected 'HeaderPage' on container
	When User selects 'Ua' language on 'HeaderPage' container
	Then 'Ua' language is selected 'HeaderPage' on container

@Regression
Scenario: CheckThatUserCanSwithedLanguageInNavigationBlock
	Then 'En' language is selected 'NavigationHeader' on container
	When User selects 'Ua' language on 'NavigationHeader' container
	Then 'Ua' language is selected 'NavigationHeader' on container

@Regression
Scenario: CheckLogoDisplayedOnMainPage
	Then 'Techstack' logo is displayed on main page