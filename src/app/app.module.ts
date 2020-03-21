import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { JobAdvertisementListComponent } from './components/job-advertisement-list/job-advertisement-list.component';
import { AdvertisementDetailsComponent } from './components/advertisement-details/advertisement-details.component';

@NgModule({
  declarations: [
    AppComponent,
    JobAdvertisementListComponent,
    AdvertisementDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
