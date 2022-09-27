using System.Collections.Generic;
using System.Linq;
using AutomationUtils.Utils;
using NUnit.Framework;

namespace PlaywrightAutomation.UnitTests
{
    [TestFixture]
    public class ValidateFeatureFileStructure
    {
        private readonly Dictionary<string, List<string>> _allFeatureFiles =
            TestsUtils.FeatureFilesAndTheirContent;

        [Test]
        [Category("OnBuild")]
        public void Does_All_FeatureFiles_Has_Tests()
        {
            foreach (var ff in _allFeatureFiles)
            {
                var lines = ff.Value;
                Verify.IsTrue(lines.Count(x => x.TrimStart().StartsWith("@")) >= 1,
                    $"'{ff.Key}' doesn't contains tests");
            }
        }

        [Test]
        [Category("OnBuild")]
        public void Does_All_FeatureFiles_Has_Names()
        {
            foreach (var ff in _allFeatureFiles)
            {
                var lines = ff.Value;
                Verify.IsTrue(lines.Count > 3, $"'{ff.Key}' featureFile is empty");

                Verify.IsTrue(lines.First().StartsWith("Feature: "),
                    $"'{ff.Key}' featureFile started not from feature name");

                Verify.IsTrue(lines.First().Split("Feature: ").Last().Length > 4,
                    $"'{ff.Key}' featureFile name is missed or too short");
            }
        }

        [Test]
        [Category("OnBuild")]
        public void Does_All_Scenarios_Has_Correct_Structure()
        {
            foreach (var ff in _allFeatureFiles)
            {
                var lines = ff.Value;
                for (int i = 0; i < lines.Count; i++)
                {
                    if (i + 1 < lines.Count && lines[i].TrimStart().StartsWith("@"))
                    {
                        Verify.IsFalse(lines[i + 1].TrimStart().StartsWith("@"), $"'{ff.Key}' featureFile contains test with two line tags");
                    }
                }
            }
        }
    }
}
