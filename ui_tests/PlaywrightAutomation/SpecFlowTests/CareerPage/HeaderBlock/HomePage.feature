Feature: HomePage

Background:
	Given User is on career website

@Smoke @Regression
Scenario: CheckThatUserCanSwithedLanguageInHeaderBlock
	Then 'Locale' button with 'En' text is active on 'HeaderPage' container
	When User clicks on 'Locale' button with 'Ua' text on 'HeaderPage' container
	Then 'Locale' button with 'Ua' text is active on 'HeaderPage' container

@Regression
Scenario: CheckThatUserCanSwithedLanguageInNavigationBlock
	When User scrolls down to the end of the page
	Then 'Locale' button with 'En' text is active on 'NavigationHeader' container
	When User clicks on 'Locale' button with 'Ua' text on 'NavigationHeader' container
	Then 'Locale' button with 'Ua' text is active on 'NavigationHeader' container

@Regression
Scenario: CheckLogoDisplayedOnMainPage
	Then Techstack logo is displayed on main page