import {CompanyEnum} from '../enum/CompanyEnum';
import {IndustriesEnum} from '../enum/IndustriesEnum';
import {ExpertiseEnum} from '../enum/ExpertiseEnum';
import UrlPath from '../providers/UrlPath';
import UrlProvider from '../providers/UrlProvider';
import {ServicesEnum} from '../enum/ServicesEnum';

export const industryUrl: Record<IndustriesEnum, string> = {
	[IndustriesEnum.Healthcare]: UrlProvider.urlBuilder(UrlPath.Healthcare),
	[IndustriesEnum.TransportAndLogist]: UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
	[IndustriesEnum.RenewableEnergy]: UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
};

export const serviceUrlWithoutWebflow: Record<number, string> = {
	[ServicesEnum.CustomDev]: UrlProvider.urlBuilder(UrlPath.CustomDev),
	[ServicesEnum.ConsultingServ]: UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	[ServicesEnum.QaAsAService]: UrlProvider.urlBuilder(UrlPath.QaAsAServ),
};

export const serviceUrl: Record<ServicesEnum, string> = {
	[ServicesEnum.PoCAndMVPDevelopment]: UrlProvider.urlBuilder(UrlPath.PoCAndMVPDevelopment),
	[ServicesEnum.CustomDev]: UrlProvider.urlBuilder(UrlPath.CustomDev),
	[ServicesEnum.AiIntegrationServices]: UrlProvider.urlBuilder(UrlPath.AiIntegrationServices),
	[ServicesEnum.DataStrategy]: UrlProvider.urlBuilder(UrlPath.DataStrategy),
	[ServicesEnum.ConsultingServ]: UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	[ServicesEnum.QaAsAService]: UrlProvider.urlBuilder(UrlPath.QaAsAServ),
	[ServicesEnum.ProductScaling]: UrlProvider.urlBuilder(UrlPath.ProductScaling),
	[ServicesEnum.CloudMigration]: UrlProvider.urlBuilder(UrlPath.CloudMigration),
	[ServicesEnum.DedicatedTeam]: UrlProvider.urlBuilder(UrlPath.DedicatedTeam),
	[ServicesEnum.StaffAugmentation]: UrlProvider.urlBuilder(UrlPath.StaffAugmentation),
};

export const expertiseUrlWithoutWebflow: Record<number, string> = {
	[ExpertiseEnum.CloudDev]: UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
	[ExpertiseEnum.DevOpsAsAServ]: UrlProvider.urlBuilder(UrlPath.DevOpsServ),
	[ExpertiseEnum.InternetOfThings]: UrlProvider.urlBuilder(UrlPath.InternetOfThings),
	[ExpertiseEnum.DigitalTransform]: UrlProvider.urlBuilder(UrlPath.DigitalTransform),
	[ExpertiseEnum.UiUxDesign]: UrlProvider.urlBuilder(UrlPath.UiUxDesign),
	[ExpertiseEnum.MobileDev]: UrlProvider.urlBuilder(UrlPath.MobileDev),
	[ExpertiseEnum.FrontEndDevelopment]: UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
	[ExpertiseEnum.BackEndDevelopment]: UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
	[ExpertiseEnum.BigData]: UrlProvider.urlBuilder(UrlPath.BigData),
	[ExpertiseEnum.AiDevelopment]: UrlProvider.urlBuilder(UrlPath.AiDevelopment),
};

export const expertiseUrl: Record<ExpertiseEnum, string> = {
	[ExpertiseEnum.CloudDev]: UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
	[ExpertiseEnum.DevOpsAsAServ]: UrlProvider.urlBuilder(UrlPath.DevOpsServ),
	[ExpertiseEnum.InternetOfThings]: UrlProvider.urlBuilder(UrlPath.InternetOfThings),
	[ExpertiseEnum.DigitalTransform]: UrlProvider.urlBuilder(UrlPath.DigitalTransform),
	[ExpertiseEnum.UiUxDesign]: UrlProvider.urlBuilder(UrlPath.UiUxDesign),
	[ExpertiseEnum.MobileDev]: UrlProvider.urlBuilder(UrlPath.MobileDev),
	[ExpertiseEnum.FrontEndDevelopment]: UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
	[ExpertiseEnum.BackEndDevelopment]: UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
	[ExpertiseEnum.BigData]: UrlProvider.urlBuilder(UrlPath.BigData),
	[ExpertiseEnum.AiDevelopment]: UrlProvider.urlBuilder(UrlPath.AiDevelopment),
	[ExpertiseEnum.ComputerVision]: UrlProvider.urlBuilder(UrlPath.ComputerVision),
	[ExpertiseEnum.OpenAI]: UrlProvider.urlBuilder(UrlPath.OpenAI),
	[ExpertiseEnum.DeepLearning]: UrlProvider.urlBuilder(UrlPath.DeepLearning),
	[ExpertiseEnum.AiChatbotDev]: UrlProvider.urlBuilder(UrlPath.AiChatbotDev),
};

export const companyUrl: Record<CompanyEnum, string> = {
	[CompanyEnum.AboutUs]: UrlProvider.urlBuilder(UrlPath.AboutUs),
	[CompanyEnum.HowWeWork]: UrlProvider.urlBuilder(UrlPath.HowWeWork),
	[CompanyEnum.OurClients]: UrlProvider.urlBuilder(UrlPath.OurClients),
	[CompanyEnum.Pricing]: UrlProvider.urlBuilder(UrlPath.Pricing),
	[CompanyEnum.CaseStudies]: UrlProvider.urlBuilder(UrlPath.CaseStudies),
	[CompanyEnum.Blog]: UrlProvider.urlBuilder(UrlPath.Blog),
	[CompanyEnum.Career]: UrlProvider.careerUrl(),
};

export const urlsWithoutCookiesMessage: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

export const urlsWithOnlyLogoInHeader: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

export const webflowPages: string[] = [
	UrlProvider.urlBuilder(UrlPath.PoCAndMVPDevelopment),
	UrlProvider.urlBuilder(UrlPath.AiIntegrationServices),
	UrlProvider.urlBuilder(UrlPath.DataStrategy),
	UrlProvider.urlBuilder(UrlPath.ProductScaling),
	UrlProvider.urlBuilder(UrlPath.CloudMigration),
	UrlProvider.urlBuilder(UrlPath.DedicatedTeam),
	UrlProvider.urlBuilder(UrlPath.StaffAugmentation),
	UrlProvider.urlBuilder(UrlPath.Startups),
	UrlProvider.urlBuilder(UrlPath.ComputerVision),
	UrlProvider.urlBuilder(UrlPath.OpenAI),
	UrlProvider.urlBuilder(UrlPath.DeepLearning),
	UrlProvider.urlBuilder(UrlPath.OurClients),
	UrlProvider.urlBuilder(UrlPath.BookADiscoveryCall),
	UrlProvider.urlBuilder(UrlPath.AiChatbotDev),
];
