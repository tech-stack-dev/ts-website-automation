using ChoETL;
using System.Linq;
using System.Text;
using System;
using System.Globalization;

namespace PlaywrightAutomation.Extensions
{
    public static class StringExtensions
    {
        public static string ToAutomationValue(this string str)
        {
            return str?.ToPascalCase().Replace(" ", string.Empty);
        }

        public static string ConvertToPascalCase(this string s)
        {
            var yourString = s.ToLower().Replace("_", " ");
            TextInfo info = CultureInfo.CurrentCulture.TextInfo;
            yourString = info.ToTitleCase(yourString).Replace(" ", string.Empty);
            return yourString;
        }
    }
}
