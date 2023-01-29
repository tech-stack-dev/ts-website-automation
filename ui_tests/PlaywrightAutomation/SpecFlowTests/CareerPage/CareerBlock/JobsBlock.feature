Feature: JobsBlock

@Regression @TSWEB146
Scenario: CheckNavigationHeaderInCareerPage
	Given User is on career website
	Then Techstack logo is displayed on main page
	Then Jobs block on Career page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Reviews    |
		| Contact us |
	Then 'En' language is selected 'HeaderPage' on container
	When User selects 'Ua' language on 'HeaderPage' container
	Then 'Ua' language is selected 'HeaderPage' on container

@Regression @TSWEB146 @Cleanup
Scenario: CheckBreadcrumbsHeaderInJobsBlock
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag          |
		| Test1TagSRND |
	When User clicks on 'Test1CareerSRND' card title
	Then Breadcrumbs has 'Jobs / Test1CareerSRND' text
	Then 'Apply Now' button is displayed on 'BreadcrumbsHeader' container

@Regression @TSWEB146 @Cleanup
Scenario: CheckNavigationHeaderOnJobPage
	# Preconditions
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag          |
		| Test1TagSRND |
	When User clicks on 'Test1CareerSRND' card title
	Then Techstack logo is displayed on job page
	Then Jobs block on 'NavigationHeader' container on job page has tabs
		| Tab        |
		| Jobs       |
		| About us   |
		| Reviews    |
		| Contact us |
	Then 'En' language is selected 'NavigationHeader' on container
	When User selects 'Ua' language on 'NavigationHeader' container
	Then 'Ua' language is selected 'NavigationHeader' on container

@Regression @TSWEB146 @Cleanup
Scenario: CheckLocalizationOnJobPage
	# Preconditions
	Given User creates Tags
		| Prefix    | Name                  |
		| Direction | Test1TagSRND          |
		| Tag       | Test2TagSRND_TestSRND |
		| Tag       | Hot_Test3TagSRND      |
	Given User creates Career Description
		| Field | Value |
	Given User creates Career
		| NameUs | NameUa | DescriptionUs | DescriptionUa | Type | LinkType |
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag          |
		| Test1TagSRND |
	When User clicks on 'Test1CareerSRND' card title
	When User selects 'Ua' language on 'NavigationHeader' container
	Then 'NameUa_1_SRND' job title is displayed on job page
	Then Jobs block on 'NavigationHeader' container on job page has tabs
		| Tab               |
		| Вакансії          |
		| Про компанію      |
		| Відгуки           |
		| Зв’язатись з нами |
	Then Breadcrumbs has 'Вакансії / NameUa_1_SRND' text
	Then 'Apply Now' button with 'Відгукнутися' text is displayed on 'BreadcrumbsHeader' container
	Then Tags are displayed on job page
		| Tag             |
		| Гарячі вакансії |
		| TestSRND        |
	Then 'Поділитися:' text is displayed with social media icons on job page
	Then Following block titles are displayed on job page
		| Title        |
		| Про продукт: |
		| Про роль:    |
		| Ти будеш:    |
		| Ти маєш:     |
		| Ми будемо:   |
		| Ми маємо:    |
	Then 'Хочеш стати частиною нашої команди?' text is displayed on Apply Container on job page
	Then 'Apply now vacancy' button with 'Подавай заявку!' text is displayed on 'JobPage' container