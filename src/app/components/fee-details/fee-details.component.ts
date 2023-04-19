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
  feeId = null;
  students = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.readAllCourses();
    this.feeId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.feeId) {
      this.getFee(this.feeId);
    } else {
      this.feeDetail = {
        cancelled: false,
        feeAmount: null,
        feesDate: null,
        feesId: this.feeId,
        pendingAmount: 0,
        courseID: null,
        studentCourseID: null,
        studentID: null,
        studentName: ''
      }
      this.readAllStudents();
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

  readAllStudents(): void {
    this.studentService.readAll()
      .subscribe(
        students => {
          this.students = students;
          console.log(students);
        },
        error => {
          console.log(error);
        });
  }

  getStudentCourse(studentId) {
    this.studentService.getStudentCourse(studentId)
      .subscribe(
        studentCourse => {
          debugger;
          this.feeDetail.feeAmount = null;
          this.feeDetail.studentCourseID = null;
          if (studentCourse) {
            this.feeDetail.feeAmount = studentCourse.courseFee;
            this.feeDetail.courseID = studentCourse.courseId;
            this.feeDetail.studentCourseID = studentCourse.studentCourseId;
          }
          console.log(studentCourse);
        },
        error => {
          console.log(error);
        });
  }

  updateStudentCourse(courseId) {
    const selectedCourse = this.courses.find((course) => {
      return course.courseID === courseId
    });
    const currentCourse = {
      courseFee: selectedCourse.courseFee,
      courseId: courseId,
      fromDate: new Date(),
      isActive: true,
      studentCourseId: 0,
      studentId: this.feeDetail.studentID,
      toDate: null
    };
    this.studentService.updateStudentCourse(this.feeDetail.studentId, currentCourse)
      .subscribe(
        response => {
          this.feeDetail.feeAmount = currentCourse.courseFee;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  getFee(id): void {
    this.studentService.readFee(id)
      .subscribe(
        fee => {
          debugger;
          this.feeDetail = fee;
          this.getStudentCourse(this.feeDetail.studentID)
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
