import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() emp: any;
  employeeId: string;
  employeeName: string;
  department: string;
  dateOfJoining: string;
  photoFileName: string;
  photoFilePath: string;

  departmentList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
    this.loadEmployeeData();
  }

  loadDepartmentList(): void {
    // tslint:disable-next-line: deprecation
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.departmentList = data;
    });
  }

  loadEmployeeData(): void {
    this.employeeId = this.emp.EmployeeId;
    this.employeeName = this.emp.EmployeeName;
    this.department = this.emp.Department;
    this.dateOfJoining = this.emp.DateOfJoining;
    this.photoFileName = this.emp.PhotoFileName;
    this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
  }

  addEmployee(): void {
    const val = {EmployeeId: this.employeeId,
      EmployeeName: this.employeeName,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName};

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee(): void {
    const val = {EmployeeId: this.employeeId,
      EmployeeName: this.employeeName,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName};
    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any): void {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.photoFileName = data.toString();
      this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
    });
  }

}
