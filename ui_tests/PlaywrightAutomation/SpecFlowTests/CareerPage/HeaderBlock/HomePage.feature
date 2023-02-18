Feature: HomePage

Background:
	Given User is on career website

@Smoke @Regression
Scenario: CheckThatUserCanSwithedLanguageInHeaderBlock
	Then 'En' button is active on 'HeaderPage' container
	When User clicks 'Ua' button on 'HeaderPage' container
	Then 'Ua' button is active on 'HeaderPage' container

@Regression
Scenario: CheckThatUserCanSwithedLanguageInNavigationBlock
	When User scrolls down to the end of the page
	Then 'En1' button is active on 'NavigationHeader' container
	When User clicks 'Ua' button on 'NavigationHeader' container
	Then 'Ua' button is active on 'NavigationHeader' container

@Regression
Scenario: CheckLogoDisplayedOnMainPage
	Then Techstack logo is displayed on main page