import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JobAdvertisementListComponent } from './components/job-advertisement-list/job-advertisement-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JobAdvertisementListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
