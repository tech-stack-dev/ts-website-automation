using System.Linq;
using AutomationUtils.Utils;
using Xunit;

namespace PlaywrightAutomation.UnitTests
{
    public class TagsCheck
    {
        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_Tests_Have_Tags()
        {
            var testsWithoutTags = AutomationUtils.Utils.TestsUtils.TestsAndTags
                .Where(x => !x.Value.Any())
                .ToList();

            Verify.AreEqual(0, testsWithoutTags.Count,
                "There are some tests in the solution without tags");
        }

        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_Tests_Have_No_Duplicated_Tags()
        {
            var testsAndTags = AutomationUtils.Utils.TestsUtils.TestsAndTags.ToList();

            foreach (var testAndTag in testsAndTags)
            {
                Verify.AreEqual(testAndTag.Value.Count, testAndTag.Value.Distinct().Count(),
                    $"'{testAndTag.Key}' test have duplicates in tags");
            }
        }
    }
}
