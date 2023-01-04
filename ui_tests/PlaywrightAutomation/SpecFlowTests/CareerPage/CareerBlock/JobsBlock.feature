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
	Given User creates tag
		| Prefix    | Name                                       |
		| Direction | TSWEB146TestingDirectionOne_ТестовийПерший |
	Given User creates and publishes new Career Description with default values
		| Field   | Value               |
		| TitleUs | TSWEB146_TitleUsOne |
	Given User creates new Career with 'TSWEB146_TitleUsOne' career description and 'TSWEB146TestingDirectionOne_ТестовийПерший' tag
		| NameUs            | NameUa            | DescriptionUs        | DescriptionUa        | Type | LinkType |
		| Tsweb146TestusOne | TSWEB146TestUaOne | DescriptionTestUsOne | DescriptionTestUaOne | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                        |
		| Vacancy | Tsweb146TestusOne           |
		| Tag     | TSWEB146TestingDirectionOne |
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                         |
		| TSWEB146TestingDirectionOne |
	When User clicks on 'Tsweb146TestusOne' card title
	Then Breadcrumbs has 'Jobs / Tsweb146TestusOne' text
	Then 'Apply now' button is displayed on 'BreadcrumbsHeader' container

@Regression @TSWEB146 @Cleanup
Scenario: CheckNavigationHeaderOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                         |
		| Direction | TSWEB146TestingDirectionThree_ТестовийТретій |
	Given User creates and publishes new Career Description with default values
		| Field   | Value                 |
		| TitleUs | TSWEB146_TitleUsThree |
	Given User creates new Career with 'TSWEB146_TitleUsThree' career description and 'TSWEB146TestingDirectionThree_ТестовийТретій' tag
		| NameUs              | NameUa              | DescriptionUs          | DescriptionUa          | Type | LinkType |
		| Tsweb146TestusThree | TSWEB146TestUaThree | DescriptionTestUsThree | DescriptionTestUaThree | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                          |
		| Vacancy | Tsweb146TestusThree           |
		| Tag     | TSWEB146TestingDirectionThree |
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                           |
		| TSWEB146TestingDirectionThree |
	When User clicks on 'Tsweb146TestusThree' card title
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
	Given User creates tag
		| Prefix    | Name                                              |
		| Direction | TSWEB146TestingDirectionFour_Тестовий146Четвертий |
		| Tag       | Test146TagFour_Тестовий146ТегЧетвертий            |
		| Tag       | Hot_ГарячіВакансії                                |
	Given User creates and publishes new Career Description with default values
		| Field   | Value                |
		| TitleUs | TSWEB146_TitleUsFour |
	Given User creates new Career with 'TSWEB146_TitleUsFour' career description and 'TSWEB146TestingDirectionFour_ТестовийЧетвертий,Test146TagFour_Тестовий146ТегЧетвертий,Hot_ГарячіВакансії' tag
		| NameUs             | NameUa             | DescriptionUs         | DescriptionUa         | Type | LinkType |
		| Tsweb146TestusFour | TSWEB146TestUaFour | DescriptionTestUsFour | DescriptionTestUaFour | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                         |
		| Vacancy | Tsweb146TestusFour           |
		| Tag     | TSWEB146TestingDirectionFour |
		| Tag     | Test146TagFour               |
		| Tag     | Hot                          |
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                          |
		| TSWEB146TestingDirectionFour |
	When User clicks on 'Tsweb146TestusFour' card title
	When User selects 'Ua' language on 'NavigationHeader' container
	Then 'TSWEB146TestUaFour' job title is displayed on job page
	Then Jobs block on 'NavigationHeader' container on job page has tabs
		| Tab               |
		| Вакансії          |
		| Про компанію      |
		| Відгуки           |
		| Зв’язатись з нами |
	Then Breadcrumbs has 'Вакансії / TSWEB146TestUaFour' text
	Then 'Apply now' button with 'Відгукнутися' text is displayed on 'BreadcrumbsHeader' container
	Then Tags are displayed on job page
		| Tag                     |
		| Гарячі вакансії         |
		| Тестовий146ТегЧетвертий |
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