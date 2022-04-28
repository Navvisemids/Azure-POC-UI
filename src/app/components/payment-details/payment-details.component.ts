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
  feeDetail = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.paymentReceiptId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.feeId = Number.parseInt(this.route.snapshot.paramMap.get('feeId'));
    this.readAllCourses();
    // if (this.paymentReceiptId) {
    //   this.getPayment(this.paymentReceiptId);
    // } else {
      this.paymentDetail = {
        feesReceiptID: this.paymentReceiptId,
        feesID: this.feeId,
        receiptDate: new Date(),
        receiptAmount: null,
        paymentMode: ''
      }
      this.feeDetail = {
        cancelled: false,
        feeAmount: null,
        feesDate: null,
        feesId: this.feeId,
        pendingAmount: 0,
        studentCourseID: null,
        studentID: null,
        studentName: ''
      }
      if (this.feeId) {
        this.getFee(this.feeId);
      }
    // }
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
          this.feeDetail = fee;
          console.log(fee);
        },
        error => {
          console.log(error);
        });
  }
  
  getPayment(id): void {
    this.studentService.readFee(id)
      .subscribe(
        fee => {
          this.paymentDetail = fee;
          console.log(fee);
        },
        error => {
          console.log(error);
        });
  }

  updatePayment(): void {
    this.studentService.updatePayment(this.paymentDetail)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The payment was updated!';
        },
        error => {
          console.log(error);
        });
  }

  
}
