using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices;

public class QaAsServicePage : BasePage, IWebContainer
{
    public string Container => "//div[@id='header']//parent::body";

    public ILocator TopSectionRequestQuoteButton => Page.Locator("//div[contains(@id,'top-section')]//div[@class='request-btn']");

    public ILocator OurApproachRequestQuoteButton => Page.Locator("//div[@class='side-content with-btn']//div[@class='request-btn']");

    public ILocator BreadcrumbsSourceSectionButton => Page.Locator("//a[@id='bredcrumbs-prev']");

    public ILocator OpenSourceArrow => Page.Locator("//img[@class='arrow']");

    public ILocator GetArrowWrapperForServicesSectionByText(string sectionHeaderText)
    {
        return Page.Locator($"//h3[contains(text(),'{sectionHeaderText}')]//following-sibling::img[contains(@class,'collapse-arrow')]");
    }

    public ILocator GetArrowWrapperForFAQSectionByText(string sectionHeaderText)
    {
        var arrowWrapper = Page.Locator(
            $"//h3[contains(text(),'{sectionHeaderText}')]//following-sibling::div//img[contains(@class,'collapse-arrow')]");
        arrowWrapper.WaitForAsync();
        return arrowWrapper;
    }

    public ILocator GetCaseStudiesCardByHeaderText(string cardHeader)
    {
        return Page.Locator($"//div[@class='case-name' and contains(text(),'{cardHeader}')]//parent::a[@class='case-card']");
    }

    public ILocator GetRelatedArticlesCardByHeaderText(string cardHeader)
    {
        return Page.Locator($"//div[@class='img-card-title'and contains(text(),'{cardHeader}')]//ancestor::div[@class='img-card']");
    }
}