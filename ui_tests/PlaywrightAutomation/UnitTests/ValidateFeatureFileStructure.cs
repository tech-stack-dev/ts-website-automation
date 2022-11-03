using System.Collections.Generic;
using System.Linq;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using ChoETL;
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
        public void Does_All_FeatureFiles_Have_Tests()
        {
            var filesWithoutTests = _allFeatureFiles
                .Where(x => !x.Value.Any(y => y.StartsWith("Scenario")))
                .ToList();

            Verify.AreEqual(0, filesWithoutTests.Count(),
                $"Some feature files doesn't contains tests: {filesWithoutTests.Select(x => x.Key).ToString("; ")}");
        }

        [Test]
        [Category("OnBuild")]
        public void Does_All_FeatureFiles_Have_Names()
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
        public void Does_All_Scenarios_Have_Correct_Structure()
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

        [Test]
        [Category("OnBuild")]
<<<<<<< HEAD
        public void Does_All_FeatureFiles_Has_No_Two_Empty_Lines_In_A_Row()
=======
        public void Does_All_FeatureFiles_Have_No_Two_Empty_Lines_In_A_Row()
>>>>>>> main
        {
            foreach (var feature in _allFeatureFiles)
            {
                int emptyLines = 0;
                foreach (var line in feature.Value)
                {
                    emptyLines = line.IsNullOrEmpty() ? emptyLines + 1 : 0;
                    Verify.IsTrue(emptyLines < 2, $"Two empty lines in a row in the '{feature.Key}' feature");
                }
            }
        }

        [Test]
        [Category("OnBuild")]
<<<<<<< HEAD
        public void Does_All_FeatureFiles_Has_No_Ending_Empty_Lines()
=======
        public void Does_All_FeatureFiles_Have_No_Ending_Empty_Lines()
>>>>>>> main
        {
            foreach (var feature in _allFeatureFiles)
            {
                Verify.IsNotEmpty(feature.Value.LastOrDefault(),
                    $"Feature file ends with empty line: {feature.Key}");
            }
        }
    }
}
