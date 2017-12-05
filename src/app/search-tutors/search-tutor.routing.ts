import { SimpleLayoutComponent } from './../shared/layouts/simple-layout/simple-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchTutorsComponent } from './search-tutors.component';

const routes: Routes = [
  {
    path: 'search', component: SimpleLayoutComponent,
    children: [
      {
        path: '', component: SearchTutorsComponent,
        pathMatch: 'full'
      }
    ]
   },
];

export const SearchTutorRoutes = RouterModule.forChild(routes);
