Feature: AboutUs

Background:
	Given User is on 'https://staging-career.tech-stack.io/about-us' page

Scenario: CheckThatBlockWeAreTechStackIsDisplayed
	Then Title is equals 'We are Techstack' on 'WeAreTechStackPage' container
	Then Description is equals 'Techstack is a community of 160+ people that collaborate on software products. Each of us can make an impact on the product or offer a key solution. We have built a product creation space because we’re inspired by making and seeing our contributions, achieving high quality standards, and providing value to users. We develop ambitious and innovative products and grow our skills along the road.' on 'WeAreTechStackPage' container

Scenario: CheckThatBlockOurHistoryIsDisplayed
	Then Section title is equals 'Our History'
	Then 'CarouselNext' button is displayed on 'OurHistoryPage' container
	When User clicks on 'CarouselNext' next control button on 'OurHistoryPage' container
	Then 'CarouselPrev' button is displayed on 'OurHistoryPage' container
	When User clicks on 'CarouselPrev' prev control button on 'OurHistoryPage' container
	Then Content in the 'Our History' carousel block on 'OurHistoryPage' container is displayed
		| Number | Title | Description                                                                                                                                                                                                                                                                                                                                                            |
		| 01     | 2014  | Ivan Ieremenko (CEO) and Oleksii Svistun (CTO), future co-founders of Techstack, teamed up to work on a medical research automation solution and e-commerce optimization product that involved on-demand manufacturing. In parallel, they initiated work on the first proprietary product. They invited 2 more freelancers to join and formed the very first dev team. |
		| 02     | 2015  | They received several new partnership requests and added 9 independent engineers. This year they also started to work on another proprietary product called ServeMe. At this point, the friends were originally thinking about creating a company that would provide a space for building products.                                                                    |
		| 03     | 2016  | The dreamers turned out to be true doers. Artem Dolotov (COO) joined Ivan and Oleksii in this year and together they founded Techstack. The team started working on a new fundraising product and helped them search for product-market fit and develop a modern technology basis. The team had grown to 15 specialists.                                               |
		| 04     | 2017  | Techstack had become a major technology partner for one of the world's leading software manufacturers involved in the development of a wide range of products that optimize computer systems’ performance. The team expanded to 24 specialists.                                                                                                                        |
		| 05     | 2018  | We joined the development of an innovative sales enablement product and optimized its system, which significantly reduced the outflow of our partner's customers. The team has expanded to 45 specialists. Meanwhile, the QA and HR departments of the company were formed.                                                                                            |
		| 06     | 2019  | This was the period of active development of an expertise-sharing culture and initiatives that resonate with our corporate values such as Tech Clubs. We joined two new partners, formed sales and marketing departments, and expanded the team to 76 people.                                                                                                          |
		| 07     | 2020  | Despite the quarantine restrictions, this year gave us 3 new partners and allowed our team to reach the mark of 100 specialists. UpWork ranked Techstack the best web, mobile, and software development agency in Kharkiv. We were growing faster than ever.                                                                                                           |
		| 08     | 2021  | We joined 6 new partners, added more than 150 team members, founded new research and development directions, actively supported local universities and internship programs. All this made us stand next to the leaders among technology companies in Kharkiv (5th place) and in Ukraine (10th place) according to the key industry media.                              |
	When User clicks on 'CarouselNext' next control button on 'OurHistoryPage' container
	When User scrolls down the page on 'AboutUsPage' container
	Then User sees the first element on 'OurHistoryPage' container when scrolling up to this block

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
	Then Title is equals 'Techstack in Growth' on 'TechstackInGrowthPage' container
	Then Description is equals 'We never leave techstackers struggling alone with challenging tasks. Techstack has a flat organization structure meaning that you can access any specialist directly and cope with challenges side by side.' on 'TechstackInGrowthPage' container
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
	Then Title is equals 'Techstack roles' on 'TechstackRolesPage' container
	Then Description of techstack roles is equals 'We introduced new roles within the company to facilitate direct communication and knowledge sharing and streamline our members’ skills growth.'
	Then Content in the 'Techstack Roles' block on 'TechstackRolesPage' container is displayed
		| Block titles    | Text descriptions                                                                                                                                                                                                                                                               |
		| Mentor          | Develops methodologies and training standards, compiles training programs. Trains specialists in new technologies within the company and beyond.                                                                                                                                |
		| Tech Expert     | Leads the technical community and technology clubs, compiles a growth map and knowledge base in selected technology. Applies tech expertise in partners’ products and shares knowledge with a wide range of technology professionals.                                           |
		| Pre-Sale Expert | Understands business needs and has in-depth expertise in one or more areas. Structures partners’ requests and provides expert assessment of the volume and cost of work. Assists the sales team in attracting new partners. Finds problem areas and optimal ways to solve them. |
		| Team Lead       | Helps to solve current issues and difficulties that team members encounter. Teaches the team and develops their competencies. Sets goals and monitors the process of their achievements. Evaluates the results of all team activities.                                          |
		| VP of Function  | Introduces and organizes processes aimed at improving the quality and results of engineering department operation. Scales technical expertise in the chosen field inside and outside the company. Creates and develops engineering culture within the company.                  |

Scenario: CheckThatBlockEngineeringCultureIsDisplayed
	Then Title is equals 'Engineering Culture' on 'EngineeringCulturePage' container
	Then Content in the 'Engineering Culture' block on 'EngineeringCulturePage' container is displayed
		| Block title       | Text description                                                                                                                                                                                                                                                                        |
		| Tech clubs        | It is more interesting to study new technologies together. With this idea in mind, we created Tech Clubs, where specialists master the latest areas of development. The acquired skills and knowledge help to find non-standard, ambitious, and modern ways of solving problems.        |
		| Meetups           | Knowledge is meant for sharing. Technical meetups help develop the community by sharing our experience within the company and local technical communities.                                                                                                                              |
		| Tech Competitions | Competitions motivate you to step beyond your capabilities. During our technical competitions, debates, and hackathons, we step out of our comfort zones to feel confident in solving work challenges later.                                                                            |
		| Trainee Camps     | Every expert has once been a trainee and knows how important it is to give new talents the opportunity to learn and grow. We have established six trainee programs in different areas and technologies that allow the most talented candidates to master skills in real conditions.     |
		| Library           | Self-education is an integral part of mastering skills. Everyone will find something new in our corporate library. If it happens that there’s nothing new for you on the shelves, we will add a new book to the library on the spot!                                                    |
		| Loyalty Program   | Even experienced mentors sometimes need to get knowledge; often there’s no one to share this within the company. We have established a loyalty program that allows team members to choose courses that will promote their professional growth, and reimburse half the cost of training. |
	Then 'CarouselNext' button is displayed on 'EngineeringCulturePage' container
	When User clicks on 'CarouselNext' next button on 'EngineeringCulturePage' container
	Then 'CarouselPrev' button is displayed on 'EngineeringCulturePage' container
	When User clicks on 'CarouselPrev' prev button on 'EngineeringCulturePage' container
	Then Image in the 'Engineering Culture' block on 'EngineeringCulturePage' container is displayed
		| Url                                                               |
		| https://cdn.tech-stack.io/photos/aboutUs_engineeringCulture_1.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_engineeringCulture_2.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_engineeringCulture_3.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_engineeringCulture_4.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_engineeringCulture_5.jpg |
	When User clicks on 'CarouselNext' next button on 'EngineeringCulturePage' container
	When User scrolls down the page on 'AboutUsPage' container
	Then User sees the first element on 'EngineeringCulturePage' container when scrolling up to this block

Scenario: CheckThatBlockSocialResponsibilityIsDisplayed
	Then Title is equals 'Social Responsibility' on 'SocialResponsibilityPage' container
	Then Content in the 'Social Responsibility' block on 'SocialResponsibilityPage' container is displayed
		| Block title          | Text description                                                                                                                                                                                                                                                                                            |
		| Charity              | Each year we help children, the elderly, and vulnerable people to get everything they need for a comfortable life, and share with them our warmth and support as well.                                                                                                                                      |
		| Environmental Safety | Preserving nature and the planet is among the company's priorities. We tend to choose ecological alternatives, protect animals, and encourage our team members to join environmental initiatives.                                                                                                           |
		| Education Support    | We push for being pacemakers in accumulating and sharing technical expertise, which includes raising overall technology awareness level. We support local universities to foster specialists who will be ready to cope with the real market needs and build more quality software no matter where they are. |
	Then 'CarouselNext' button is displayed on 'SocialResponsibilityPage' container
	When User clicks on 'CarouselNext' next button on 'SocialResponsibilityPage' container
	Then 'CarouselPrev' button is displayed on 'SocialResponsibilityPage' container
	When User clicks on 'CarouselPrev' prev button on 'SocialResponsibilityPage' container
	Then Image in the 'Social Responsibility' block on 'SocialResponsibilityPage' container is displayed
		| Url                                                                 |
		| https://cdn.tech-stack.io/photos/aboutUs_socialResponsibility_1.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_socialResponsibility_2.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_socialResponsibility_3.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_socialResponsibility_4.jpg |
		| https://cdn.tech-stack.io/photos/aboutUs_socialResponsibility_5.jpg |
	When User clicks on 'CarouselNext' next button on 'SocialResponsibilityPage' container
	When User scrolls down the page on 'AboutUsPage' container
	Then User sees the first element on 'SocialResponsibilityPage' container when scrolling up to this block

Scenario: CheckThatBlockCandidatePathIsDisplayed
	Then Title is equals 'Candidate Path' on 'CandidatePathPage' container
	Then Description is equals 'Joining the team is easy. It is enough to be talented and have a desire to be the best in your profession - we will only support you on this path. But first, you still need to go through a simple and short process to get to know the company and the team.' on 'CandidatePathPage' container
	Then 'CarouselNext' button is displayed on 'CandidatePathPage' container
	When User clicks on 'CarouselNext' next control button on 'CandidatePathPage' container
	Then 'CarouselPrev' button is displayed on 'CandidatePathPage' container
	When User clicks on 'CarouselPrev' prev control button on 'CandidatePathPage' container
	Then Content in the 'Candidate Path' carousel block on 'CandidatePathPage' container is displayed
		| Number | Title                   | Description                                                                                                                                                                                                                              |
		| 01     | CV                      | Send us your resume so we can understand your skills and career expectations. This will allow us to make the right decision about our future cooperation as soon as possible.                                                            |
		| 02     | Pre-screening           | As soon as we preview the resume, you will get a call from our recruiter. They will explain to you the process, quickly evaluate your soft and hard skills, and answer your questions.                                                   |
		| 03     | Test task               | This step is most often applied to those who are looking for their first job, and very rarely with experienced professionals. It helps assess the quality of performance and understanding of tasks.                                     |
		| 04     | Tech expert review      | Next, your resume and test assignment are transferred to technical experts who will assess your level and determine next steps. The review usually takes 1-3 days.                                                                       |
		| 05     | Tech expert interview   | Congratulations, you coped with the task and impressed our most skilled specialists! It's time to meet and greet the technical experts and the recruiter in person.                                                                      |
		| 06     | Product owner interview | In some cases, we arrange an interview with a specialist on our partner’s side. Working closely with our partners is one of the main values of the company, which impacts product quality greatly.That's all, welcome to Techstack! |
	When User clicks on 'CarouselNext' next control button on 'CandidatePathPage' container
	When User scrolls down the page on 'AboutUsPage' container
	Then User sees the first element on 'CandidatePathPage' container when scrolling up to this block

Scenario: CheckBlockWouldYpuLikeToBeAPartOfOurTeam
	Then Title is equals 'Would you like to be a part of our team?'
	When User clicks on 'ApplyNowVacancy' button on 'ApplyTitlePage' container
	Given User is on career website

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