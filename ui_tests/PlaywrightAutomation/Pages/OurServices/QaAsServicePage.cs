using System.Collections.Generic;
using System.Linq;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages.OurServices;

public class QaAsServicePage : BasePage, IWebContainer
{
    public string Container => "//div[@id='header']//parent::body";
    public string ServicesSectionElements => "//div[contains(@class,'domains-block-header')]";
    public string MenuCategories => "//section[@class='accordion-item flex-content']";
    public string FaqSectionElements => "//div[contains(@class,'faq-container collapsible')]";
    public string CaseStudiesCardsElements => "//a[@class='case-card']";

    public ILocator AcceptCookieButton => Page.Locator("//div[contains(@class,'accept-cookie')]//div[@id='btn-accept-container']//a");

    public ILocator MenuButton => Page.Locator("//a[@id='menu-btn']");

    public ILocator TopSectionRequestQuoteButton =>
        Page.Locator("//div[contains(@id,'top-section')]//div[@class='request-btn']");

    public ILocator OurApproachRequestQuoteButton =>
        Page.Locator("//div[@class='side-content with-btn']//div[@class='request-btn']");

    public ILocator BreadcrumbsSourceSectionButton => Page.Locator("//a[@id='bredcrumbs-prev']");

    public ILocator OpenSourceArrow => Page.Locator("//img[@class='arrow']");
    
    public ILocator GetArrowWrapperForServicesSectionByText(string sectionHeaderText)
    {
        return GetElementFromListByTextAndXpathModify(ServicesSectionElements, "//h3", sectionHeaderText);
    }

    public ILocator GetArrowWrapperForFAQSectionByText(string sectionHeaderText)
    {
        return GetElementFromListByTextAndXpathModify(FaqSectionElements, "//h3", sectionHeaderText);
    }

    public ILocator GetCaseStudiesCardByHeaderText(string cardHeader)
    {
        return GetElementFromListByTextAndXpathModify(CaseStudiesCardsElements, "//div[@class='case-name']", cardHeader);
    }

    public ILocator GetElementFromMenuCategoryByText(string categoryText,string pageName)
    {
        var categoryMenu = GetElementFromListByTextAndXpathModify(MenuCategories, "//a//div[@class='h2']", categoryText);
        categoryMenu.HoverAsync().GetAwaiter().GetResult();
        var pagePointFromMenu = GetElementFromListByTextAndXpathModify($"{MenuCategories}//div//div//a", "//div[@class='h6']", pageName);
        return pagePointFromMenu;
    }

    private ILocator GetElementFromListByTextAndXpathModify(string elementCollectionXpath,
        string xpathModifier,
        string textIdentifier)
    {
        var listOfElements = Page
            .Locator(elementCollectionXpath)
            .AllAsync()
            .GetAwaiter().GetResult()
            .ToList();
        var neededElement = listOfElements
            .Where(x => x.Locator(xpathModifier).TextContentAsync().GetAwaiter().GetResult().Contains(textIdentifier))
            .FirstOrDefault();
        return neededElement;
    }
}