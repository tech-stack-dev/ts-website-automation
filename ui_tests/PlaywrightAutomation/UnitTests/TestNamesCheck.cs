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

            var testsWithoutExamples = allTestsNames.Select(x => x.Split(',')[0]).ToList();

            var testsWithSpace = testsWithoutExamples.Where(x => x.Contains(" ")).ToList();
            var testsWithTab = testsWithoutExamples.Where(x => x.Contains("	")).ToList();
            var testsWithComma = testsWithoutExamples.Where(x => x.Contains(",")).ToList();
            var testsWithDot = testsWithoutExamples.Where(x => x.Contains(".")).ToList();
            var testsWithSemicolon = testsWithoutExamples.Where(x => x.Contains(";")).ToList();
            var testsWithColon = testsWithoutExamples.Where(x => x.Contains(":")).ToList();
            var testsWithHash = testsWithoutExamples.Where(x => x.Contains("#")).ToList();
            var testsWithDash = testsWithoutExamples.Where(x => x.Contains("-")).ToList();
            var testsWithParenthesis = testsWithoutExamples.Where(x => x.Contains("(") || x.Contains(")")).ToList();

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
            Verify.AreEqual(0, testsWithDash.Count,
                "There are some tests with dash in the name");
            Verify.AreEqual(0, testsWithParenthesis.Count,
                "There are some tests with parenthesis in the name");
        }
    }
}
