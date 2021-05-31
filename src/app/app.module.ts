import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component'
import { GoogleChartsModule } from 'angular-google-charts';
import { HomepageComponent } from './homepage/homepage.component';
import { SafetyComponent } from './safety/safety.component';
import { HelplinesComponent } from './helplines/helplines.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    HomepageComponent,
    SafetyComponent,
    HelplinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
