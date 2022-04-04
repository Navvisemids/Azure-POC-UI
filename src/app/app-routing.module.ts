import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'student-course/:id', component: StudentCourseComponent },
  { path: 'create', component: StudentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
