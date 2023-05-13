import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentSummary: any;
  feeSummary: any;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   this.readStudentStatistics();
   this.readFeesStatistics();
  }

  readStudentStatistics(): void {
    this.studentService.readStudentStatistics()
      .subscribe(
        studentSummary => {
          this.studentSummary = studentSummary;
          console.log(studentSummary);
        },
        error => {
          console.log(error);
        });
  }

  readFeesStatistics(): void {
    this.studentService.readFeesStatistics()
      .subscribe(
        feeSummary => {
          this.feeSummary = feeSummary;
          console.log(feeSummary);
        },
        error => {
          console.log(error);
        });
  }

}
