using System.IO;
using System.Linq;
using AutomationUtils.Utils;
using PlaywrightAutomation.Providers;
using Xunit;

namespace PlaywrightAutomation.UnitTests
{
    public class ValidateFeatureFileStructure
    {
        private readonly string[] _allFeatureFiles = Directory
            .GetFiles(PathProvider.SourceFolder, "*.feature", SearchOption.AllDirectories);

        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_FeatureFiles_Has_Tests()
        {
            foreach (string featureFile in _allFeatureFiles)
            {
                var lines = File.ReadAllLines(featureFile);
                Verify.IsTrue(lines.Count(x => x.TrimStart().StartsWith("@")) >= 1,
                    $"'{featureFile}' doesn't contains tests");
            }
        }

        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_FeatureFiles_Has_Names()
        {
            foreach (var featureFile in _allFeatureFiles)
            {
                var lines = File.ReadAllLines(featureFile);
                Verify.IsTrue(lines.Length > 3, $"'{featureFile}' featureFile is empty");

                Verify.IsTrue(lines[1].StartsWith("Feature: "),
                    $"'{featureFile}' featureFile started not from feature name");

                Verify.IsTrue(lines.First().Split("Feature: ").Last().Length > 4,
                    $"'{featureFile}' featureFile name is missed or too short");
            }
        }

        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_FeatureFiles_Has_Retries()
        {
            foreach (var featureFile in _allFeatureFiles)
            {
                var lines = File.ReadAllLines(featureFile);

                Verify.IsTrue(lines.First().Equals("@retry(2)"),
                    $"'{featureFile}' featureFile doesn't have retry");
            }
        }

        [Fact]
        [Trait("Category", "OnBuild")]
        public void Does_All_Scenarios_Has_Correct_Structure()
        {
            foreach (string featureFile in _allFeatureFiles)
            {
                var lines = File.ReadAllLines(featureFile);
                for (int i = 0; i < lines.Length; i++)
                {
                    if (i + 1 < lines.Length && lines[i].TrimStart().StartsWith("@"))
                    {
                        Verify.IsFalse(lines[i + 1].TrimStart().StartsWith("@"), $"'{featureFile}' featureFile contains test with two line tags");
                    }
                }
            }
        }
    }
}
