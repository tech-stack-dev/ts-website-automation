using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices.ConsultingService
{
    internal class GetInTouchPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='mobile-dev-get-in-touch']";

        public ILocator FirstNameInput => Page.Locator(Container).Locator("//input[@name='first_name']");

        public ILocator LastNameInput => Page.Locator(Container).Locator("//input[@name='last_name']");

        public ILocator EmailInput => Page.Locator(Container).Locator("//input[@name='email']");

        public ILocator SendMessageButton => Page.Locator(Container).Locator("//a[@id='contact-form-success']");

        public ILocator DeleteFile => Page.Locator(Container).Locator("//img[@id='selectedFileClose']");

        public ILocator AttachFiles => Page.Locator(Container).Locator("//label[@for='file-input']");
    }
}
