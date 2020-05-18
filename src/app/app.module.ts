import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { JobAdvertisementListComponent } from './components/job-advertisement-list/job-advertisement-list.component';
import { AdvertisementDetailsComponent } from './components/advertisement-details/advertisement-details.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JobAdvertisementListComponent,
    AdvertisementDetailsComponent,
    ApplicationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
