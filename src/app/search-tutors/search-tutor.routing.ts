import { MainLayoutComponent } from './../shared/layouts/main-layout/main-layout.component';
import { SimpleLayoutComponent } from './../shared/layouts/simple-layout/simple-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchTutorsComponent } from './search-tutors.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  {
    path: 'search', component: MainLayoutComponent,
    children: [
      {
        path: '', component: SearchTutorsComponent,
        pathMatch: 'full'
      },
      {
        path: 'results', component: SearchResultsComponent,
        pathMatch: 'full'
      }
    ]
   },
];

export const SearchTutorRoutes = RouterModule.forChild(routes);
