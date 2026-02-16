using OpenSilverDevToolBox.Features.GuidGenerator;
using System.Windows;
using System.Windows.Controls;

namespace OpenSilverDevToolBox
{
    public partial class MainPage : Page
    {
        GuidGeneratorStore _store;
        public MainPage()
        {
            this.InitializeComponent ();

            this.DataContext = _store = new GuidGeneratorStore ();

        }

        private void BtnGenerate_Click(object sender, RoutedEventArgs e)
        {
            _store.Dispatch (new GuidGeneratorIntent.Generate ());
        }

        private void ComboVersion_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ComboVersion == null)
            {
                return;
            }

            _store.Dispatch (new GuidGeneratorIntent.ChangeVersion (ComboVersion.SelectedIndex));
        }
    }
}
