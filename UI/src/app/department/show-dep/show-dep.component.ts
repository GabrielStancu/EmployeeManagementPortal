import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  departmentList: any = [];
  modalTitle: string;
  activateAddEditDepComp = false;
  dep: any;

  departmentIdFilter = '';
  departmentNameFilter = '';
  departmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(): void {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    };
    this.modalTitle = 'Add Department';
    this.activateAddEditDepComp = true;
  }

  closeClick(): void {
    this.activateAddEditDepComp = false;
    this.refreshDepList();
  }

  editClick(item: any): void {
    this.dep = item;
    this.modalTitle = 'Edit Department';
    this.activateAddEditDepComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure?')){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      });
    }
  }

  refreshDepList(): void {
    // tslint:disable-next-line: deprecation
    this.service.getDepList().subscribe(data => {
      this.departmentList = data;
      this.departmentListWithoutFilter = data;
    });
  }

  filterFn(): void {
    const departmentIdFilter = this.departmentIdFilter;
    const departmentNameFilter = this.departmentNameFilter;

    this.departmentList = this.departmentListWithoutFilter.filter(function (el: any) {
      return el.DepartmentId.toString().toLowerCase().includes(
        departmentIdFilter.toString().trim().toLowerCase()
      ) &&
      el.DepartmentName.toString().toLowerCase().includes(
        departmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  sortResult(prop: string, asc: boolean): void {
    this.departmentList = this.departmentListWithoutFilter.sort(function (a, b){
      if (asc){
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }
}
