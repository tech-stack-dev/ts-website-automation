import {CompanyEnum} from '../enum/CompanyEnum';
import {IndustriesEnum} from '../enum/IndustriesEnum';
import {ExpertiseEnum} from '../enum/ExpertiseEnum';
import UrlPath from '../providers/UrlPath';
import UrlProvider from '../providers/UrlProvider';
import { ServicesEnum } from '../enum/ServicesEnum';

export const industryUrl: Record<IndustriesEnum, string> = {
	[IndustriesEnum.Healthcare]: UrlProvider.urlBuilder(UrlPath.Healthcare),
	[IndustriesEnum.TransportAndLogist]: UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
	[IndustriesEnum.RenewableEnergy]: UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
};

export const serviceUrl: Record<ServicesEnum, string> = {
	[ServicesEnum.PoCAndMVPDevelopment]: UrlProvider.urlBuilder(UrlPath.PoCAndMVPDevelopment),
	[ServicesEnum.CustomDev]: UrlProvider.urlBuilder(UrlPath.CustomDev),
	[ServicesEnum.AiIntegrationServices]: UrlProvider.urlBuilder(UrlPath.AiIntegrationServices),
	[ServicesEnum.DataStrategy]: UrlProvider.urlBuilder(UrlPath.DataStrategy),
	[ServicesEnum.SoftwareAudit]: UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	[ServicesEnum.QaAsAService]: UrlProvider.urlBuilder(UrlPath.QaAsAServ),
	[ServicesEnum.ProductScaling]: UrlProvider.urlBuilder(UrlPath.ProductScaling),
	[ServicesEnum.CloudMigration]: UrlProvider.urlBuilder(UrlPath.CloudMigration),
	[ServicesEnum.DedicatedTeam]: UrlProvider.urlBuilder(UrlPath.DedicatedTeam),
	[ServicesEnum.StaffAugmentation]: UrlProvider.urlBuilder(UrlPath.StaffAugmentation),
}

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
};

export const companyUrl: Record<CompanyEnum, string> = {
	[CompanyEnum.AboutUs]: UrlProvider.urlBuilder(UrlPath.AboutUs),
	[CompanyEnum.HowWeWork]: UrlProvider.urlBuilder(UrlPath.HowWeWork),
	[CompanyEnum.OurClients]: UrlProvider.urlBuilder(UrlPath.OurClients),
	[CompanyEnum.Pricing]: UrlProvider.urlBuilder(UrlPath.Pricing),
	[CompanyEnum.Career]: UrlProvider.careerUrl(),
	[CompanyEnum.CaseStudies]: UrlProvider.urlBuilder(UrlPath.CaseStudies),
	[CompanyEnum.Blog]: UrlProvider.urlBuilder(UrlPath.Blog),
	[CompanyEnum.Whitepapers]: UrlProvider.urlBuilder(UrlPath.Whitepapers),
};

export const urlsWithoutCookiesMessage: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

export const urlsWithOnlyLogoInHeader: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];
