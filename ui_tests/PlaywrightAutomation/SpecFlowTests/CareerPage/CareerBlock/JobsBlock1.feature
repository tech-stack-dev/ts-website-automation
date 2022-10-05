Feature: JobsBlock1

@Regression @TSWEB146 @Cleanup
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                       |
		| Direction | TSWEB146TestingDirectionTwo_ТестовийДругий |
		| Tag       | Test146TagTwo_Тестовий146ТегДругий         |
		| Tag       | Hot_ГарячіВакансії                         |
	Given User creates and publishes new Career Description
		| Field             | Value                  |
		| AboutTheProjectUs | AboutTheProjectUsTwo   |
		| AboutTheProjectUa | AboutTheProjectUaTwo   |
		| AboutTheRoleUs    | AboutTheRoleUsTwo      |
		| AboutTheRoleUa    | AboutTheRoleUaTwo      |
		| TitleUs           | TSWEB146TitleUsTwo     |
		| TitleUa           | TSWEB146TitleUaTwo     |
		| YouWillUs         | YouWillUsTwo           |
		| YouWillUa         | YouWillUaTwo           |
		| YouAreUs          | YouAreUsTwo            |
		| YouAreUa          | YouAreUaTwo            |
		| WeWillUs          | WeWillUsTwo            |
		| WeWillUa          | WeWillUaTwo            |
		| WeAreUs           | WeAreUsTwo             |
		| WeAreUa           | WeAreUaTwo             |
		| TechnologyStack   | TechnologyStackUsTwo   |
		| SlugUs            | TestSlugUsDirectionTwo |
	Given User creates new Career with 'TSWEB146TitleUsTwo' career description and 'TSWEB146TestingDirectionTwo_ТестовийДругий,Test146TagTwo_Тестовий146ТегДругий,Hot_ГарячіВакансії' tag
		| NameUs            | NameUa            | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| Tsweb146TestusTwo | TSWEB146TestUaTwo | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                         |
		| TSWEB146TestingDirectionTwo |
	When User clicks on 'Tsweb146TestusTwo' card title
	Then 'Tsweb146TestusTwo' job title is displayed on job page
	Then Tags are displayed on job page
		| Tag           |
		| Hot           |
		| Test146TagTwo |
	Then 'Hot' tag is displayed in '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	When User clicks on 'Facebook share' wrapped button on 'JobPage' container
	Then 'Facebook' website is opened in popup window
	When User clicks on 'Linkedin share' wrapped button on 'JobPage' container
	Then 'Linkedin' website is opened in popup window
	When User clicks on 'Twitter share' wrapped button on 'JobPage' container
	Then 'Twitter' website is opened in popup window
	Then Following block titles are displayed on job page
		| Title              |
		| About the product: |
		| About the role:    |
		| You will:          |
		| You:               |
		| We will:           |
		| We:                |
	Then 'Would you like to be a part of our team?' text is displayed on Apply Container on job page
	When User clicks on 'Apply now vacancy' button on 'JobPage' container
	Then 'Apply for a Job' title is displayed on Apply For A Job page

@Regression @TSWEB146 @Cleanup
Scenario: CheckPaginationOnCareerPage
	# Preconditions
	Given User creates and publishes '12' Careers with default descriptions and tags
	# Scenario
	Given User is on career website
	Then Pagination is displayed on Career page
	Then Next page button is on 'last' position in pagination panel
	When User clicks on next page button in pagination panel
	Then '02' pagination button has 'orange yellow' background color in pagination panel
	Then Next page button is on 'first' position in pagination panel