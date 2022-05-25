using System.IO;
using System.Linq;

namespace PlaywrightAutomation.Providers
{
    public class PathProvider
    {
        public static string SourceFolder => Path.Combine(SolutionDirectoryInfo().FullName, "PlaywrightAutomation", "SpecFlowTests");

        private static DirectoryInfo SolutionDirectoryInfo()
        {
            var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
            while (directory is not null && !directory.GetFiles("*.sln").Any())
            {
                directory = directory.Parent;
            }
            return directory;
        }
    }
}
