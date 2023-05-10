Feature: SearchField

@Regession @FilterBlock @TSWEB145
Scenario: CheckThatAllDropdownsAreExpandedByDefault
	Given User is on career website
	Then Dropdowns are expanded on 'CareerPage' container
		| Dropdown         |
		| Direction        |
		| Seniority levels |
		| Tags             |
		| Technology stack |