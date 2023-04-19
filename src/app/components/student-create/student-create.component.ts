import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  student = {
    studentId: 0,
    firstName: '',
    lastName: '',
    gender: null,
    dateOfBirth: null,
    address: '',
    comments: null,
    fatherEmailID: null,
    fatherMobile: null,
    isActive: true,
    motherEmailID: null,
    motherMobile: null,
    schoolName: null,
    class: null
  };
  submitted = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  createStudent(): void {

    this.studentService.create(this.student)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newStudent(): void {
    this.submitted = false;
    this.student = {
      studentId: 0,
      firstName: '',
      lastName: '',
      gender: null,
      dateOfBirth: null,
      address: '',
      comments: null,
      fatherEmailID: null,
      fatherMobile: null,
      isActive: true,
      motherEmailID: null,
      motherMobile: null,
      schoolName: null,
      class: null
      };
  }

}
