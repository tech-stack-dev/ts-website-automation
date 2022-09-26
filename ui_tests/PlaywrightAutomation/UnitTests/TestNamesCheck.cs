using System.Linq;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using NUnit.Framework;

namespace PlaywrightAutomation.UnitTests
{
    [TestFixture]
    public class TestNamesCheck
    {
        [Test]
        [Category("OnBuild")]
        public void Does_All_Tests_Have_Unique_Names()
        {
            var allTestsNames = TestsUtils.TestsAndTags
                .Select(x => x.Key)
                .ToList();

            var duplicates = allTestsNames
                .GroupBy(i => i)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .ToList();

            Verify.AreEqual(0, duplicates.Count,
                $"There are some tests with the same names: {duplicates.ToList().ToString(" ,")}");
        }

        [Test]
        [Category("OnBuild")]
        public void Does_All_Tests_Have_Appropriate_Names()
        {
            var allTestsNames = TestsUtils.TestsAndTags
                .Select(x => x.Key)
                .ToList();

            var testsWithSpace = allTestsNames.Where(x => x.Split(',')[0].Contains(" ")).ToList();
            var testsWithTab = allTestsNames.Where(x => x.Split(',')[0].Contains("	")).ToList();
            var testsWithComma = allTestsNames.Where(x => x.Split(',')[0].Contains(",")).ToList();
            var testsWithDot = allTestsNames.Where(x => x.Split(',')[0].Contains(".")).ToList();
            var testsWithSemicolon = allTestsNames.Where(x => x.Split(',')[0].Contains(";")).ToList();
            var testsWithColon = allTestsNames.Where(x => x.Split(',')[0].Contains(":")).ToList();
            var testsWithHash = allTestsNames.Where(x => x.Split(',')[0].Contains("#")).ToList();

            Verify.AreEqual(0, testsWithSpace.Count,
                "There are some tests with space in the name");
            Verify.AreEqual(0, testsWithTab.Count,
                "There are some tests with tab in the name");
            Verify.AreEqual(0, testsWithComma.Count,
                "There are some tests with comma in the name");
            Verify.AreEqual(0, testsWithDot.Count,
                "There are some tests with dot in the name");
            Verify.AreEqual(0, testsWithSemicolon.Count,
                "There are some tests with semicolon in the name");
            Verify.AreEqual(0, testsWithColon.Count,
                "There are some tests with colon in the name");
            Verify.AreEqual(0, testsWithHash.Count,
                "There are some tests with hash in the name");
        }
    }
}
