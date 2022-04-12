import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any;
  currentStudent = null;
  currentIndex = -1;
  name = '';
  courses: any[];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.readStudents();
    this.readAllCourses();
  }

  readStudents(): void {
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

  refresh(): void {
    this.readStudents();
    this.currentStudent = null;
    this.currentIndex = -1;
  }

  setCurrentStudent(student, index): void {
    this.currentStudent = student;
    this.currentIndex = index;
    this.getStudentCourse(this.currentStudent.studentId);
  }

  getStudentCourse(id): void {
    this.studentService.getStudentCourse(id)
      .subscribe(
        course => {
          if (course) {
            const courseDetails = this.courses.find((c) => { return c.courseID === course.courseId });
            this.currentStudent.course = course;
            this.currentStudent.courseDeatils = courseDetails;
          }
          console.log(this.currentStudent);
        },
        error => {
          console.log(error);
        });
  }

  addStudent() {
    this.router.navigateByUrl('/student-create');
  }

  deleteAllStudents(): void {
    this.studentService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readStudents();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.studentService.read(this.name)
      .subscribe(
        students => {
          if (students.length > 0) {
            this.students = students;
          } else {
            this.students = [students];
          }
          
          console.log(students);
        },
        error => {
          console.log(error);
        });
  }

}
