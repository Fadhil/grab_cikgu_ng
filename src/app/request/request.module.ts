import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';
import { FormsModule } from '@angular/forms';
import { RequestListComponent } from './request-list/request-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RequestComponent,
    RequestListComponent
]
})
export class RequestModule { }
