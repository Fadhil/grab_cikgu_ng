import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent }   from './../homepage/homepage.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
    ], //,
    //{ enableTracing: true }
  )
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
