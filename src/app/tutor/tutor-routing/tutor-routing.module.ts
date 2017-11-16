import { ControlSidebarComponent } from './../../shared/components/layouts/control-sidebar/control-sidebar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layouts/header/header.component';
import { SidebarComponent } from './../../shared/components/layouts/sidebar/sidebar.component';
import { TutorComponent } from '../tutor.component';
import { TutorLayoutComponent } from '../tutor-layout/tutor-layout.component';
import { FooterComponent } from '../../shared/components/layouts/footer/footer.component';


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
  exports: [RouterModule],
})
export class TutorRoutingModule { }

export const tutorRoutingComponents = [
  TutorComponent, TutorLayoutComponent, HeaderComponent, SidebarComponent, FooterComponent,
  ControlSidebarComponent
];
