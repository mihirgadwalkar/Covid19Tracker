import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : any;
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData : DateWiseData[]; 
  dateWiseData ;
  loading = true;
  dataTable=[];
  newData=[];
  chart = {
    LineChart : "LineChart", 
    PieChart : "PieChart" ,
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    } 
  }
  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
    })

    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('India')
         this.loading = false;
        }
      }
    )

  }

  updateChart(){
    this.dataTable = [];
    //dataTable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
      this.dataTable.push([cs.date , cs.cases])
    })
  }

  updateValues(country : string){
    //console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })
    this.selectedCountryData  = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
    this.updateChart();
    this.initChart(country);
  } 

  initChart(country:string) {
    this.newData = [];
    // this.datatable.push(["Country", "Cases"])
    this.data.forEach(cs => {
      //let value :number ;
      if(cs.country==country){
        this.newData.push([
          'confirmed', cs.confirmed
        ])
        this.newData.push([
          'deaths', cs.deaths
        ])
        this.newData.push([
          'recovered', cs.recovered
        ])
        this.newData.push([
          'active', cs.active
        ])
    }})
    //console.log(this.newData);
  }
}
