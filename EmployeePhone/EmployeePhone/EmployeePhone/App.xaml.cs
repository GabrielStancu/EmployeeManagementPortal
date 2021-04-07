using EmployeePhone.Helpers;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace EmployeePhone
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new MainPage(new EmployeeManager());
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
