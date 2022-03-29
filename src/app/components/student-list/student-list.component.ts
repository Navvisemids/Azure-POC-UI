import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

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

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.readStudents();
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

  refresh(): void {
    this.readStudents();
    this.currentStudent = null;
    this.currentIndex = -1;
  }

  setCurrentStudent(student, index): void {
    this.currentStudent = student;
    this.currentIndex = index;
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
