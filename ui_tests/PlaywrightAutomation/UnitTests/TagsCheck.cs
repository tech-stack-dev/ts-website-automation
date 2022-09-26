using System.Linq;
using AutomationUtils.Utils;
using NUnit.Framework;

namespace PlaywrightAutomation.UnitTests
{
    [TestFixture]
    public class TagsCheck
    {
        [Test]
        [Category("OnBuild")]
        public void Does_All_Tests_Have_Tags()
        {
            var testsWithoutTags = TestsUtils.TestsAndTags
                .Where(x => !x.Value.Any())
                .ToList();

            Verify.AreEqual(0, testsWithoutTags.Count,
                "There are some tests in the solution without tags");
        }

        [Test]
        [Category("OnBuild")]
        public void Does_All_Tests_Have_No_Duplicated_Tags()
        {
            var testsAndTags = TestsUtils.TestsAndTags;

            foreach (var testAndTag in testsAndTags)
            {
                Verify.AreEqual(testAndTag.Value.Count, testAndTag.Value.Distinct().Count(),
                    $"'{testAndTag.Key}' test have duplicates in tags");
            }
        }
    }
}
