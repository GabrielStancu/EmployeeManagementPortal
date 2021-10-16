import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  employeeList: any = [];
  modalTitle: string;
  activateAddEditEmpComp = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(): void {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'dune visions.jpg'
    };
    this.modalTitle = 'Add Employee';
    this.activateAddEditEmpComp = true;
  }

  closeClick(): void {
    this.activateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item: any): void {
    this.emp = item;
    this.modalTitle = 'Edit Department';
    this.activateAddEditEmpComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure?')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  refreshEmpList(): void {
    // tslint:disable-next-line: deprecation
    this.service.getEmpList().subscribe(data => {
      this.employeeList = data;
    });
  }

}
