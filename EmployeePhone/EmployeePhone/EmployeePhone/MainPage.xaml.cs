using EmployeePhone.Helpers;
using EmployeePhone.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Xamarin.Forms;

namespace EmployeePhone
{
    public partial class MainPage : ContentPage
    {
        private IEnumerable<Department> _departments;
        private IEnumerable<Employee> _employees;
        private EmployeeManager _employeeManager;
        private Employee _selectedEmployee;
        public MainPage(EmployeeManager employeeManager)
        {
            InitializeComponent();
            _employeeManager = employeeManager;
            GetAllEmployees();
            GetDepartmentNames();
        }

        private async void GetDepartmentNames()
        {
            _departments = await _employeeManager.GetAllDepartmentNames();
            DepartmentPicker.ItemsSource = (IList)_departments;
            DepartmentPicker.ItemDisplayBinding = new Binding("DepartmentName");

            DepartmentPicker2.ItemsSource = (IList)_departments;
            DepartmentPicker2.ItemDisplayBinding = new Binding("DepartmentName");
        }

        private async void GetAllEmployees()
        {
            _employees = await _employeeManager.GetAllEmployees();
            EmployeesPicker.ItemsSource = (IList)_employees;
            EmployeesPicker.ItemDisplayBinding = new Binding("EmployeeName");
        }

        private async void OnAddEmployee(object sender, EventArgs e)
        {
            if (EmployeeNameEntry.Text == null ||
                DepartmentPicker.SelectedItem == null ||
                DateOfJoinDatePicker.Date == null)
            {
                await DisplayAlert("Error", "Not all fields completed!", "OK");
                return;
            }

            var employee = new Employee()
            {
                EmployeeName = EmployeeNameEntry.Text,
                Department = DepartmentPicker.SelectedItem.ToString(),
                DateOfJoining = DateOfJoinDatePicker.Date.ToString("yyyy-MM-dd")
            };

            var result = await _employeeManager.PostEmployee(employee);

            if (result != null)
            {
                await DisplayAlert("Success", result, "OK");
                EmployeeNameEntry.Text = string.Empty;
                DepartmentPicker.SelectedItem = null;
                DateOfJoinDatePicker.Date = DateTime.Today;
            }
        }

        private async void OnUpdateClicked(object sender, EventArgs e)
        {
            if (_selectedEmployee == null)
            {
                return;
            }

            var employee = new Employee()
            {
                EmployeeId = Int32.Parse(EmployeeIdEntry2.Text),
                EmployeeName = EmployeeNameEntry2.Text,
                Department = DepartmentPicker2.SelectedItem.ToString(),
                DateOfJoining = DateOfJoiningPicker2.Date.ToString("yyyy-MM-dd")
            };

            var result = await _employeeManager.PutEmployee(employee);

            if (result != null)
            {
                await DisplayAlert("Success", result, "OK");
            }
        }

        private async void OnDeleteClicked(object sender, EventArgs e)
        {
            if (_selectedEmployee == null)
            {
                return;
            }

            var result = await _employeeManager.DeleteEmployee(_selectedEmployee);

            if (result != null)
            {
                await DisplayAlert("Success", result, "OK");
                ((List<Employee>)_employees).Remove(_selectedEmployee);
                _selectedEmployee = null;
            }
        }

        private void OnSelectedEmployeeChanged(object sender, EventArgs e)
        {
            _selectedEmployee = (Employee)EmployeesPicker.SelectedItem;
            EmployeeIdEntry2.Text = _selectedEmployee.EmployeeId.ToString();
            EmployeeNameEntry2.Text = _selectedEmployee.EmployeeName.ToString();
            DepartmentPicker2.SelectedItem = DepartmentPicker2.Items.Where(d => d.Equals(_selectedEmployee.Department));
            DateOfJoiningPicker2.Date = DateTime.Parse(_selectedEmployee.DateOfJoining);
        }
    }
}
