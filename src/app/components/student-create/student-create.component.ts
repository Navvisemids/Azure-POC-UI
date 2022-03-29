import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  student = {
    name: '',
    description: '',
    available: false
  };
  submitted = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  createStudent(): void {
    const data = {
      name: this.student.name,
      description: this.student.description
    };

    this.studentService.create(data)
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
      name: '',
      description: '',
      available: false
    };
  }

}
