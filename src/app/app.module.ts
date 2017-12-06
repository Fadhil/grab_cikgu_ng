import { SearchResultsComponent } from './search-tutors/search-results/search-results.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchTutorsComponent } from './search-tutors/search-tutors.component';
import { SearchTutorRoutes } from './search-tutors/search-tutor.routing';
import { StudentService } from './shared/services/student.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { TutorService } from './shared/services/tutor.service';
import { SearchService } from './shared/services/search.service';

import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { HeaderComponent } from './shared/components/layouts/header/header.component';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { TutorRoutingModule, tutorRoutingComponents } from './tutor/tutor-routing/tutor-routing.module';
import { StudentRoutingModule, studentRoutingComponents } from './student/student-routing/student-routing.module';
import { TutorLayoutComponent } from './tutor/tutor-layout/tutor-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { MainHeaderComponent } from './shared/components/layouts/main-header/main-header.component';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './shared/pipes/data-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    SearchTutorsComponent,
    SearchResultsComponent,
    TutorLayoutComponent,
    StudentLayoutComponent,
    SimpleLayoutComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    tutorRoutingComponents,
    studentRoutingComponents,
    DataFilterPipe
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TutorRoutingModule,
    StudentRoutingModule,
    SearchTutorRoutes,
    HttpClientModule,
    AdminModule,
    DataTableModule
  ],
  providers: [AlertService, TutorService, StudentService, AuthenticationService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
