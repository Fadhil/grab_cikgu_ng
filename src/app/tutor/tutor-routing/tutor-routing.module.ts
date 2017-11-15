import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorComponent } from '../tutor.component';
import { HeaderComponent } from '../../shared/components/layouts/header/header.component';
import { TutorLayoutComponent } from '../tutor-layout/tutor-layout.component';

const routes: Routes = [
  {
    path: 'tutors', component: TutorLayoutComponent,
    children: [
      {
        path: '', component: TutorComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    HeaderComponent,
    TutorLayoutComponent
  ],
  exports: [RouterModule],
})
export class TutorRoutingModule { }

export const tutorRoutingComponents = [TutorComponent];
