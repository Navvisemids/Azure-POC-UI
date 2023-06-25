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
  totalFees: any;
  totalPending: any;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.feeDate = new Date();
    this.isGenerate = false;
    this.message = '';
    this.feeList = [];
    this.totalFees = 0;
    this.totalPending = 0;
    this.feeFilter = {
      fromDate: this.studentService.feeFilter.fromDate,
      toDate: this.studentService.feeFilter.toDate,
      onlyPending: this.studentService.feeFilter.onlyPending
    };
    this.readAllFeeList();
  }

  readAllFeeList(): void {

    // Assigning the values to service
    this.studentService.feeFilter.fromDate = this.feeFilter.fromDate;
    this.studentService.feeFilter.toDate = this.feeFilter.toDate;
    this.studentService.feeFilter.onlyPending = this.feeFilter.onlyPending;


    this.studentService.readAllFeeList(this.getDateFormat(this.feeFilter.fromDate), 
    this.getDateFormat(this.feeFilter.toDate), this.feeFilter.onlyPending)
      .subscribe(
        feeList => {
          this.feeList = feeList;
          this.generateTotal(feeList);
          console.log(feeList);
        },
        error => {
          console.log(error);
        });
  }

  generateTotal(data) {
    for(let j=0;j<data.length;j++){   
         this.totalPending+= data[j].pendingAmount  
         this.totalFees+= data[j].feeAmount
    }  
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
  payFees(feeData): void {
    this.router.navigate(['/payment/0/' + feeData.feesId]);
  }

}
