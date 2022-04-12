import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'student-course/:id', component: StudentCourseComponent },
  { path: 'student-create', component: StudentCreateComponent },
  { path: 'fee-list', component: FeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
