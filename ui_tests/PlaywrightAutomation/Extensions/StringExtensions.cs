using ChoETL;

namespace PlaywrightAutomation.Extensions
{
    public static class StringExtensions
    {
        public static string ToAutomationValue(this string str)
        {
            return str?.ToPascalCase().Replace(" ", string.Empty);
        }
    }
}
