using System.IO;
using System.Linq;

namespace PlaywrightAutomation.Providers
{
    public class PathProvider
    {
        public static string SourceFolder => getFolder("PlaywrightAutomation", Folder.SpecFlowTests.ToString());
        public static string ResourcesFolder => getFolder("PlaywrightAutomation", Folder.Resources.ToString());

        private static DirectoryInfo SolutionDirectoryInfo()
        {
            var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
            while (directory is not null && !directory.GetFiles("*.sln").Any())
            {
                directory = directory.Parent;
            }
            return directory;
        }

        private static string getFolder(string solutionName, string folder)
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
