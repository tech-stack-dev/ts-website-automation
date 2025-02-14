export default class ContactUsCareer {
	static ContactWithHRDepartmentTitle = 'SectionTitle-ContactWithHRDepartmentTitle';
	static ContactWithHRDepartmentNumber = 'SectionNumber-01Number';

	static OurHRTeamTitle = "//div[@class='header-title'][contains(text(),'Our HR Team')]";
	static OurHRTeamNumber = 'SectionNumber-02Number';
	static OurHRTeamContainer = "//div[@class='cards-wrapper']";

	static ContactUsTitle = "//div[@class='title' and text()='Contact us']";
	static ContactUsNumber = 'SectionNumber-03Number';

	static LinkedInButton = 'ContactLinkedInLink-FullNameLinkedIn';

	static MemberRole = "//div[contains(@class, 'card-position')]";
	static MemberName = "//div[@class='fullName']";
	static MemberCard = "//div[@class='card-image-wrapper']";
}
