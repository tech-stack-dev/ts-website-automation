Feature: AboutUs

Background: 
	Given User is on 'https://staging-career.tech-stack.io/about-us' page

Scenario: CheckThatBlockWeAreTechStackIsDisplayed
	Then Title is equals 'We are Techstack' and description is equals 'Techstack is a community of 160+ people that collaborate on software products. Each of us can make an impact on the product or offer a key solution. We have built a product creation space because we’re inspired by making and seeing our contributions, achieving high quality standards, and providing value to users. We develop ambitious and innovative products and grow our skills along the road.'

Scenario: CheckThatOurAchivementsIsDisplayed
	Then Our achivements are correctly displayed

 | Fields      | Values                                                                       |
 | Upwork      | The Best Web, Mobile and Software Development Agency in Kharkiv.             |
 | DOU.ua      | Top 5 Software Development company in Kharkiv.                               |
 | Design Rush | Top Mobile App Development Companies for Android and iOS.                    |
 | 80%         | Of our partners and products are loyal and stay with us longer than 2 years. |
 | 3%          | Team member attrition rate (compared to 10% industry average).               |
 | 93%         | Team member loyalty rate giving steady headcount growth (+30% per year).     |  
            
Scenario: CheckThatBlockTechstackInGrowthIsDisplayed
	Then Title is equals 'Techstack in Growth' and description is equals 'We never leave techstackers struggling alone with challenging tasks. Techstack has a flat organization structure meaning that you can access any specialist directly and cope with challenges side by side.'.
	Then Top block title is equals 'Techstack member'
	Then Main block titles are displayed
	| Title            |
	| People partner   |
	| Coworker         |
	| Head of function |
	| Team lead        |
	| Tech expert      |
	| C**              |

Scenario: CheckThatBlockTechstackRolesIsDisplayed
	Then Title and description in the Techstack Roles block are displayed
	| Paragraph Title | Paragraph Description                                                                                                                          |
	| Techstack roles | We introduced new roles within the company to facilitate direct communication and knowledge sharing and streamline our members’ skills growth. |
	Then Content in the Techstack Roles block is displayed
	| Block titles     | Text descriptions                                                                                                                                                                                                                                                                |
	| Mentor          | Develops methodologies and training standards, compiles training programs. Trains specialists in new technologies within the company and beyond.                                                                                                                                |
	| Tech Expert     | Leads the technical community and technology clubs, compiles a growth map and knowledge base in selected technology. Applies tech expertise in partners’ products and shares knowledge with a wide range of technology professionals.                                           |
	| Pre-Sale Expert | Understands business needs and has in-depth expertise in one or more areas. Structures partners’ requests and provides expert assessment of the volume and cost of work. Assists the sales team in attracting new partners. Finds problem areas and optimal ways to solve them. |
	| Team Lead       | Helps to solve current issues and difficulties that team members encounter. Teaches the team and develops their competencies. Sets goals and monitors the process of their achievements. Evaluates the results of all team activities.                                          |
	| VP of Function  | Introduces and organizes processes aimed at improving the quality and results of engineering department operation. Scales technical expertise in the chosen field inside and outside the company. Creates and develops engineering culture within the company.                  |
	
Scenario: CheckThatBlockEngineeringCultureIsDisplayed
	Then Paragraph title 'Engineering Culture' in the Engineering Culture block are displayed
	Then Block title and text description in the Engineering Culture block are displayed
	| Block title       | Text description                                                                                                                                                                                                                                                                        |
	| Tech clubs        | It is more interesting to study new technologies together. With this idea in mind, we created Tech Clubs, where specialists master the latest areas of development. The acquired skills and knowledge help to find non-standard, ambitious, and modern ways of solving problems.        |
	| Meetups           | Knowledge is meant for sharing. Technical meetups help develop the community by sharing our experience within the company and local technical communities.                                                                                                                              |
	| Tech Competitions | Competitions motivate you to step beyond your capabilities. During our technical competitions, debates, and hackathons, we step out of our comfort zones to feel confident in solving work challenges later.                                                                            |
	| Trainee Camps     | Every expert has once been a trainee and knows how important it is to give new talents the opportunity to learn and grow. We have established six trainee programs in different areas and technologies that allow the most talented candidates to master skills in real conditions.     |
	| Library           | Self-education is an integral part of mastering skills. Everyone will find something new in our corporate library. If it happens that there’s nothing new for you on the shelves, we will add a new book to the library on the spot!                                                    |
	| Loyalty Program   | Even experienced mentors sometimes need to get knowledge; often there’s no one to share this within the company. We have established a loyalty program that allows team members to choose courses that will promote their professional growth, and reimburse half the cost of training. |
	Given User clicks on 'CarouselNextButton' button on 'carouselNextButton' container


Scenario: CheckBlockWouldYpuLikeToBeAPartOfOurTeam
	Then Title is equals 'Would you like to be a part of our team?'
	When User clicks on 'ApplyNowVacancy' button on 'ApplyTitlePage' container
	Then User in on the 'Jobs' tab in 'NavigationHeader' container

Scenario: CheckThatSectionNumbersAreDisplayed
	Then Section numbers are displayed
	 | Numbers |
	 | 01      |
	 | 02      |
	 | 03      |
	 | 04      |
	 | 05      |
	 | 06      |
	 | 07      |
	 | 08      |


