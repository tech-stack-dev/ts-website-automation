using System.IO;
using System.Linq;

namespace PlaywrightAutomation.Providers
{
    public class PathProvider
    {
        private static string SolutionName = "PlaywrightAutomation";

        public static string SourceFolder => GetFolder(SolutionName, Folder.SpecFlowTests.ToString());
        public static string ResourcesFolder => GetFolder(SolutionName, Folder.Resources.ToString());

        private static DirectoryInfo SolutionDirectoryInfo()
        {
            var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
            while (directory is not null && !directory.GetFiles("*.sln").Any())
            {
                directory = directory.Parent;
            }
            return directory;
        }

        private static string GetFolder(string solutionName, string folder)
        {
            return Path.Combine(SolutionDirectoryInfo().FullName, solutionName, folder);
        }

        private enum Folder
        {
            SpecFlowTests,
            Resources
        }
    }
}
