import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentCreateComponent,
    StudentDetailsComponent,
    StudentListComponent,
    StudentCourseComponent,
    DashboardComponent,
    FeeListComponent,
    FeeDetailsComponent,
    PaymentListComponent,
    PaymentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
