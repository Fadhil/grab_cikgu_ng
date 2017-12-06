import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTutorsComponent } from './search-tutors.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DataFilterPipe } from './../shared/pipes/data-filter.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchTutorsComponent,
    SearchResultsComponent, DataFilterPipe
]
})
export class SearchTutorsModule { }
