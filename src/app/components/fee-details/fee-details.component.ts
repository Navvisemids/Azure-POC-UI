import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css']
})
export class FeeDetailsComponent implements OnInit {

  feeDetail = null;
  message = '';
  courses = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.readAllCourses()
    this.getFee(this.route.snapshot.paramMap.get('id'));
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

  updateFee(): void {
    this.studentService.updateFee(this.feeDetail)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The fee was updated!';
        },
        error => {
          console.log(error);
        });
  }

  
}
