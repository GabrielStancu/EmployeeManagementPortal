import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() dep: any;
  departmentId: string;
  departmentName: string;

  ngOnInit(): void {
    this.departmentId = this.dep.DepartmentId;
    this.departmentName = this.dep.DepartmentName;
  }

  addDepartment(): void {
    const val = {DepartmentId: this.departmentId,
               DepartmentName: this.departmentName};
    this.service.addDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment(): void {
    const val = {DepartmentId: this.departmentId,
      DepartmentName: this.departmentName};
    this.service.updateDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
