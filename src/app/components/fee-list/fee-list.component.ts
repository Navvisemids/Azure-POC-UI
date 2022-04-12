import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  feeDate: any;
  isGenerate: boolean;
  message: any;
  feeDateUpdate: any;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.feeDate = new Date();
    this.onFeeDateChange(this.feeDate);
    this.isGenerate = false;
    this.message = '';
  }

  generateFees() {
    this.studentService.generateFees(this.feeDateUpdate)
      .subscribe(
        student => {
          this.isGenerate = false;
          this.message = 'Fee generated successfully';
          console.log(student);
        },
        error => {
          console.log(error);
        });
  }

  onFeeDateChange(date) {
    this.feeDateUpdate = new Date(date).getDate() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getFullYear();
  }

}
