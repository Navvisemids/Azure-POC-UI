import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'student-course/:id', component: StudentCourseComponent },
  { path: 'student-create', component: StudentCreateComponent },
  { path: 'fee-list', component: FeeListComponent },
  { path: 'fee/:id', component: FeeDetailsComponent },
  { path: 'payment-list', component: PaymentListComponent },
  { path: 'payment/:id/:feeId', component: PaymentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
