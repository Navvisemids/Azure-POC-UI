import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  paymentDetail = null;
  message = '';
  courses = [];
  paymentReceiptId = null;
  students = [];
  feeId = null;
  fromFees = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.paymentReceiptId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.feeId = Number.parseInt(this.route.snapshot.paramMap.get('feeId'));
    this.readAllCourses();
    this.paymentDetail = {
      feeAmount: null,
      feeReceiptID: this.paymentReceiptId,
      feesDate: null,
      feesID: this.feeId,
      paymentMode: null,
      receiptAmount: 0,
      //receiptDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      receiptDate: null,
      studentCourseID: null,
      studentID: null,
      studentName: ''
    }
    if (this.paymentReceiptId) {
      this.getPayment(this.paymentReceiptId);
    } else if (this.feeId) {
      this.fromFees = true;
      this.getFee(this.feeId);
    }
  }

  readAllCourses(): void {
    this.studentService.readAllCourses()
      .subscribe(
        courses => {
          this.courses = courses;
          console.log(courses);
        },
        error => {
          console.log(error);
        });
  }

  getFee(id): void {
    this.studentService.readFee(id)
      .subscribe(
        fee => {
          this.paymentDetail = fee;
          this.paymentDetail = {
            ...this.paymentDetail,
            feeReceiptID: this.paymentReceiptId,
            feesID: this.feeId,
            receiptDate: null
          };
          console.log(fee);
        },
        error => {
          console.log(error);
        });
  }
  
  getPayment(id): void {
    this.studentService.readPayment(id)
      .subscribe(
        fee => {
          this.paymentDetail = fee;
          this.paymentDetail.pendingAmount = this.paymentDetail.receiptAmount;
          console.log(fee);
        },
        error => {
          console.log(error);
        });
  }

  updatePayment(): void {
    if (this.paymentDetail.receiptAmount > this.paymentDetail.pendingAmount) {
      alert("Reciept amount is greater than pending amount");
    } else {
      const payment = {
        feesReceiptID: this.paymentDetail.feeReceiptID,
        feesID: this.paymentDetail.feesID,
        receiptDate: this.paymentDetail.receiptDate,
        receiptAmount: this.paymentDetail.receiptAmount,
        paymentMode: this.paymentDetail.paymentMode
      }
      this.studentService.updatePayment(payment)
        .subscribe(
          response => {
            console.log(response);
            this.message = 'The payment was updated!';
            if(this.fromFees)
              this.router.navigate(['/fee-list']);
            else
              this.router.navigate(['/payment-list']);
          },
          error => {
            console.log(error);
          });
    }
    
  }

  
}
