import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service'
import {Employee} from '../shared/employee.model'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService : EmployeeService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList()
  }

  editEmployee(employee : Employee ){
    this.employeeService.selectedEmployee = Object.assign({}, employee);
  }

  deleteEmployee(id : number){
    if(confirm('Are you sure to Delete this Employee Record ?')==true){
      this.employeeService.deleteEmployee(id).subscribe(x => {
      this.employeeService.getEmployeeList();
      this.toastr.warning("Deleted Successfully", "Delete Employee");
      })
    }
  }
}
