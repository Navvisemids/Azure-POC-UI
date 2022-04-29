import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  feeDate: any;
  isGenerate: boolean;
  message: any;
  feeList: any;
  feeFilter: any;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.feeDate = new Date();
    this.isGenerate = false;
    this.message = '';
    this.feeList = [];
    this.feeFilter = {
      fromDate: '2022-01-01',
      toDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      onlyPending: false
    };
    this.readAllFeeList();
  }

  readAllFeeList(): void {
    this.studentService.readAllFeeList(this.getDateFormat(this.feeFilter.fromDate), 
    this.getDateFormat(this.feeFilter.toDate), this.feeFilter.onlyPending)
      .subscribe(
        feeList => {
          this.feeList = feeList;
          console.log(feeList);
        },
        error => {
          console.log(error);
        });
  }

  generateFees() {
    this.studentService.generateFees(this.getDateFormat(this.feeDate))
      .subscribe(
        student => {
          this.isGenerate = false;
          this.message = 'Fee generated successfully';
          console.log(student);
        },
        error => {
          console.log(error);
        });
  }

  getDateFormat(date) {
    return (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate()  + '-' + new Date(date).getFullYear();
  }

  deleteFee(feeData): void {
    if(confirm("Are you sure to delete?")) {
      this.studentService.deleteFee(feeData.feesId)
        .subscribe(
          response => {
            console.log(response);
            this.readAllFeeList();
          },
          error => {
            console.log(error);
          });
      }
  }

}
