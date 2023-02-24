using System;
using System.Linq;
using AutomationUtils.Utils;
using NUnit.Framework;

namespace PlaywrightAutomation.UnitTests
{
    [TestFixture]
    public class TagsCheck
    {
        [Test]
        [CategoryAttribute("OnBuild")]
        public void Does_All_Tests_Have_Tags()
        {
            var testsWithoutTags = TestsUtils.TestsAndTags
                .Where(x => !x.Value.Any())
                .ToList();

            Verify.AreEqual(0, testsWithoutTags.Count,
                "There are some tests in the solution without tags");
        }

        [Test]
        [CategoryAttribute("OnBuild")]
        public void Does_All_Tests_Have_No_Duplicated_Tags()
        {
            var testsAndTags = TestsUtils.TestsAndTags;

            foreach (var testAndTag in testsAndTags)
            {
                Verify.AreEqual(testAndTag.Value.Count, testAndTag.Value.Distinct().Count(),
                    $"'{testAndTag.Key}' test have duplicates in tags");
            }
        }

        [Test]
        [CategoryAttribute("OnBuild")]
        public void Does_All_Tests_Have_Feature_Tag()
        {
            var testsAndTags = TestsUtils.TestsAndTags;

            foreach (var testAndTags in testsAndTags)
            {
                Verify.IsTrue(
                    testAndTags.Value.Intersect(Enum.GetNames(typeof(ListOfFeatureTags))).Any(),
                    $"'{testAndTags.Key}' test doesn't have product tag");
            }
        }

        public enum ListOfFeatureTags
        {
            JobsBlock,
            FilterBlock,
            NavigationHeader,
            SearchBlock,
            ContactUsForm,
            GoogleAnalytics
        }
    }
}
