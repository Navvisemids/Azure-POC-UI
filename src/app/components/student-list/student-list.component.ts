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
  filterIsActive = null;
  filterIsOnline = null;
  filterCourseId = null;
  totalFees: any;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    // Initialize variables from the service 
    this.name = this.studentService.studentFilter.name;
    this.filterIsActive = this.studentService.studentFilter.filterIsActive;
    this.filterIsOnline = this.studentService.studentFilter.filterIsOnline;
    this.filterCourseId = this.studentService.studentFilter.filterCourseId;

    // load students
    this.searchByName();
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

  deleteStudent(student): void {
    if(confirm("Are you sure to delete " + student.firstName + ' ' + student.lastName + '?')) {
      this.studentService.delete(student.studentId)
        .subscribe(
          response => {
            console.log(response);
            this.readStudents();
          },
          error => {
            console.log(error);
          });
      }
  }

  readAllCourses(): void {
    this.courses = [];
    this.courses.push({"courseID":null, "name":"All", "description":"All", "courseFee":"0"});
    this.studentService.readAllCourses()
      .subscribe(
        courses => {
          this.courses.push(...courses);
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
    // Initialize variables to service 
    this.studentService.studentFilter.name = this.name;
    this.studentService.studentFilter.filterIsActive = this.filterIsActive;
    this.studentService.studentFilter.filterIsOnline = this.filterIsOnline;
    this.studentService.studentFilter.filterCourseId = this.filterCourseId;



    this.studentService.readByName(this.name, this.filterIsActive, this.filterIsOnline, this.filterCourseId)
      .subscribe(
        students => {
          if (students.length > 0) {
            this.students = students;
          } else {
            this.students = [students];
          }
          this.calculateTotalFees(students)
          console.log(students);
        },
        error => {
          console.log(error);
        });
  }

  calculateTotalFees(data) {
    this.totalFees = 0;
    for(let j=0;j<data.length;j++){   
         this.totalFees+= data[j].courseFee  
    }  
  }

}
