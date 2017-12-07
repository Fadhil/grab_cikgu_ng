import { RequestListComponent } from './request-list/request-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './../shared/layouts/main-layout/main-layout.component';
import { SimpleLayoutComponent } from './../shared/layouts/simple-layout/simple-layout.component';
import { RequestComponent } from './request.component';


const routes: Routes = [
  {
    path: 'requests', component: MainLayoutComponent,
    children: [
      {
        path: '', component: RequestListComponent
      },
      {
        path: 'new/:tutor_id', component: RequestComponent
      }
    ]
   },
];

export const RequestRoutes = RouterModule.forChild(routes);
