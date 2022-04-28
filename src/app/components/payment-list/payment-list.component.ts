import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  message: any;
  paymentList: any;
  paymentFilter: any;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.paymentList = [];
    this.paymentFilter = {
      fromDate: '2022-01-01',
      toDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    };
    this.readAllPaymentList();
  }

  readAllPaymentList(): void {
    this.studentService.readAllPaymentList(this.getDateFormat(this.paymentFilter.fromDate), 
      this.getDateFormat(this.paymentFilter.toDate))
      .subscribe(
        paymentList => {
          this.paymentList = paymentList;
          console.log(paymentList);
        },
        error => {
          console.log(error);
        });
  }

  getDateFormat(date) {
    return (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate()  + '-' + new Date(date).getFullYear();
  }

  deletePayment(paymentData): void {
    if(confirm("Are you sure to delete?")) {
      this.studentService.deletePayment(paymentData.feeReceiptID)
        .subscribe(
          response => {
            console.log(response);
            this.readAllPaymentList();
          },
          error => {
            console.log(error);
          });
      }
  }

}
