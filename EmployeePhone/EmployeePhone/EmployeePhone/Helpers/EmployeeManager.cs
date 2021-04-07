using EmployeePhone.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePhone.Helpers
{
    public class EmployeeManager
    {
        public static readonly string BaseUrl = "http://192.168.100.2:5000/api";
        public static readonly string EmployeeUrl = $"{BaseUrl}/employee";

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var client = new HttpClient();
            string result = await client.GetStringAsync(EmployeeUrl);

            return JsonConvert.DeserializeObject<IEnumerable<Employee>>(result);
        }

        public async Task<string> PostEmployee(Employee employee)
        {
            var client = new HttpClient();
            var response = await client.PostAsync(EmployeeUrl,
                new StringContent(
                    JsonConvert.SerializeObject(employee),
                    Encoding.UTF8, "application/json"
                    ));

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentNames()
        {
            var client = new HttpClient();
            string result = await client.GetStringAsync($"{EmployeeUrl}/GetAllDepartmentNames");

            return JsonConvert.DeserializeObject<IEnumerable<Department>>(result);
        }

        public async Task<string> PutEmployee(Employee employee)
        {
            var client = new HttpClient();
            var response = await client.PutAsync(EmployeeUrl,
                new StringContent(
                    JsonConvert.SerializeObject(employee),
                    Encoding.UTF8, "application/json"
                    ));

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> DeleteEmployee(Employee employee)
        {
            var client = new HttpClient();
            var respone = await client.DeleteAsync($"{EmployeeUrl}/{employee.EmployeeId}");

            return await respone.Content.ReadAsStringAsync();
        }
    }
}
