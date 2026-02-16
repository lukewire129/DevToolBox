using System;
using System.Globalization;
using System.Windows.Data;

namespace OpenSilverDevToolBox.Infrastructure.Converters;

public class EnumToBoolConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value == null || parameter == null)
            return false;

        var enumValue = value.ToString ();
        var targetValue = parameter.ToString ();

        return enumValue == targetValue;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (parameter == null)
            return null;

        if ((bool)value)
            return Enum.Parse (targetType, parameter.ToString ());

        return null;
    }
}
