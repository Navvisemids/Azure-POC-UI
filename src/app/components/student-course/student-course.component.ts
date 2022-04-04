import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  currentStudent = null;
  message = '';
  courses = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.readAllCourses();
    this.getStudent(this.route.snapshot.paramMap.get('id'));
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

  getStudent(id): void {
    this.studentService.read(id)
      .subscribe(
        student => {
          this.currentStudent = student;
          this.getStudentCourse(id);
          console.log(student);
        },
        error => {
          console.log(error);
        });
  }

  getStudentCourse(id): void {
    this.studentService.getStudentCourse(id)
      .subscribe(
        course => {
          if (course) {
            const courseDetails = this.courses.find((c) => { return c.courseID === course.courseId });
            this.currentStudent.course = course;
            this.currentStudent.courseDeatils = courseDetails;
          } else {
            this.currentStudent.course = {
              studentCourseId: 0,
              studentId: id,
              courseId: null,
              fromDate: null,
              toDate: null,
              courseFee: null,
              isActive: false
            }
          }
          console.log(this.currentStudent);
        },
        error => {
          console.log(error);
        });
  }

  setAvailableStatus(status): void {
    this.currentStudent.isActive = status;
  }

  updateStudentCourse(): void {
    this.studentService.updateStudentCourse(this.currentStudent.studentId, this.currentStudent.course)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The student was updated!';
        },
        error => {
          console.log(error);
        });
  }

  onCourseChange(id) {
    const courseDetails = this.courses.find((c) => { return c.courseID === id });
    this.currentStudent.courseDeatils = courseDetails;
    this.currentStudent.course.courseFee = courseDetails.courseFee;
  }

  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.studentId)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/students']);
        },
        error => {
          console.log(error);
        });
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

}
