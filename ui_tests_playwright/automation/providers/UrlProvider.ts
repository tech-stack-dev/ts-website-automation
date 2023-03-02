import { ClientsEnum } from "../base/client/ClientsEnum";
import EnvProvider, { Environment } from "./EnvProvider";
import appsetting from "../../appsetting.json";

class UrlProvider {
    site: string;

    ourServicesUrl: string;
    customDevUrl: string;
    cloudAndDevUrl: string;
    bigDataUrl: string;
    internetOfThingsUrl: string;
    mobileDevUrl: string;
    uiUxDesignUrl: string;
    qaAsAServUrl: string;
    consultingServUrl: string;

    aboutUs: string;
    howWeWork: string;
    career: string;
    caseStudies: string;
    blog: string;

    contactUs: string;

    public getUrl(environment: Environment = EnvProvider.Env) {
        switch (environment) {
            case Environment.Stg: {
                this.site = appsetting.Staging.Site;

                this.ourServicesUrl = appsetting.Staging.OurServices;
                this.customDevUrl = appsetting.Staging.CustomDev;
                this.cloudAndDevUrl = appsetting.Staging.CloudAndDev;
                this.bigDataUrl = appsetting.Staging.BigData;
                this.internetOfThingsUrl = appsetting.Staging.InternetOfThings;
                this.mobileDevUrl = appsetting.Staging.MobileDev;
                this.uiUxDesignUrl = appsetting.Staging.UiUxDesign;
                this.qaAsAServUrl = appsetting.Staging.QaAsAServ;
                this.consultingServUrl = appsetting.Staging.ConsultingServ;

                this.aboutUs = appsetting.Staging.AboutUs;
                this.howWeWork = appsetting.Staging.HowWeWork;
                this.career = appsetting.Staging.Career;
                this.caseStudies = appsetting.Staging.CaseStudies;
                this.blog = appsetting.Staging.Blog;

                this.contactUs = appsetting.Staging.ContactUs;

                return this;
            }
            case Environment.Prod: {
                this.site = appsetting.Production.Site;

                this.ourServicesUrl = appsetting.Production.OurServices;
                this.customDevUrl = appsetting.Production.CustomDev;
                this.cloudAndDevUrl = appsetting.Production.CloudAndDev;
                this.bigDataUrl = appsetting.Production.BigData;
                this.internetOfThingsUrl = appsetting.Production.InternetOfThings;
                this.mobileDevUrl = appsetting.Production.MobileDev;
                this.uiUxDesignUrl = appsetting.Production.UiUxDesign;
                this.qaAsAServUrl = appsetting.Production.QaAsAServ;
                this.consultingServUrl = appsetting.Production.ConsultingServ;

                this.aboutUs = appsetting.Production.AboutUs;
                this.howWeWork = appsetting.Production.HowWeWork;
                this.career = appsetting.Production.Career;
                this.caseStudies = appsetting.Production.CaseStudies;
                this.blog = appsetting.Production.Blog;

                this.contactUs = appsetting.Production.ContactUs;

                return this;
            }
            default: {
                throw new Error(`Unknown environment. Environment: ${EnvProvider.Env}`);
            }
        }
    }


    public static clientUrl(clientName: ClientsEnum): string {
        switch (clientName) {
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_1_URL;
            }
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_2_URL;
            }
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_3_URL;
            }
            default: {
                throw Error(`Unable to generate client URL for '${clientName}' brand`)
            }
        }
    }
}

var urlProvider = new UrlProvider();

export { urlProvider };