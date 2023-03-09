import UrlPath from "../../providers/UrlPath";
import UrlProvider from "../../providers/UrlProvider";

export default class ContactUsPreconditions{
    public static servicesUrlList: Array<string> = [
        UrlProvider.urlBuilder(UrlPath.OurServices),
        UrlProvider.urlBuilder(UrlPath.CustomDev),
        UrlProvider.urlBuilder(UrlPath.CloudAndDev),
        UrlProvider.urlBuilder(UrlPath.BigData),
        UrlProvider.urlBuilder(UrlPath.InternetOfThings),
        UrlProvider.urlBuilder(UrlPath.MobileDev),
        UrlProvider.urlBuilder(UrlPath.UiUxDesign),
        UrlProvider.urlBuilder(UrlPath.QaAsAServ),
        UrlProvider.urlBuilder(UrlPath.ConsultingServ)
    ];
    
    public static companyUrlList: Array<string> = [
        UrlProvider.urlBuilder(UrlPath.AboutUs),
        UrlProvider.urlBuilder(UrlPath.HowWeWork),
        UrlProvider.urlBuilder(UrlPath.CaseStudies),
        UrlProvider.urlBuilder(UrlPath.Blog)
    ];
}