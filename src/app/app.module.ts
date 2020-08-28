import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// MDBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// NgxPagination
import { NgxPaginationModule } from 'ngx-pagination';
// NgRx
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment'; // Angular CLI environment


import { AppComponent } from './app.component';
import { JobAdvertisementListComponent } from './components/job-advertisement-list/job-advertisement-list.component';
import { AdvertisementDetailsComponent } from './components/advertisement-details/advertisement-details.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { OpenStreetMapComponent } from './components/open-street-map/open-street-map.component';

@NgModule({
  declarations: [
    AppComponent,
    JobAdvertisementListComponent,
    AdvertisementDetailsComponent,
    ApplicationFormComponent,
    OpenStreetMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
