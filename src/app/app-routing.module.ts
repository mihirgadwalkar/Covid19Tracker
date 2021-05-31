import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { HelplinesComponent } from './helplines/helplines.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SafetyComponent } from './safety/safety.component';

const routes: Routes = [
  { path:'homepage' , component : HomepageComponent},
  { path:'home', component:HomeComponent },
  { path:'countries', component:CountriesComponent },
  { path:'safety' ,component: SafetyComponent},
  { path:'helplines' ,component:HelplinesComponent},
  { path:'', redirectTo:"/homepage",pathMatch:"full"},
  { path:'**', redirectTo:'',pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
