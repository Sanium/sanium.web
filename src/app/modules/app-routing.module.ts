import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobAdvertisementListComponent } from '../components/job-advertisement-list/job-advertisement-list.component';
import { AdvertisementDetailsComponent } from '../components/advertisement-details/advertisement-details.component';

const appRoutes: Routes = [
  {path: '', component: JobAdvertisementListComponent },
  {path: 'details/:id', component: AdvertisementDetailsComponent },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
