import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService,
              private toastr : ToastrService
             ) { }

  ngOnInit() {
    this.resetForm();
  }

  log(x){
    console.log(x);
  }
  resetForm(form? : NgForm){
    if(form!=null){
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      EmployeeID : null,
      FirstName: '',
      LastName: '',
      Position: '',
      EmpCode: '',
      Office: ''
    };
  }
  onSubmit(form : NgForm){
    if(form.value.EmployeeID == null){
      this.employeeService.addEmployee(form.value)
      .subscribe(data => {
        console.log(">>>>>"+data)
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        this.toastr.success('New Record Added successfully','Employee Register');
      })
    }else{
        this.employeeService.updateEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          console.log(data);
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.info('Record Updated Successfully.','Employee Update');
        })
    }
    
  }
}
