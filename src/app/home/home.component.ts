import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GlobalDataSummary } from '../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  loading = true;
  globalData:GlobalDataSummary[];
  
  datatable = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }

  constructor(private dataService: DataService) { }

  initChart(caseType:string){

    this.datatable=[];
    //this.datatable.push(['Country','Cases'])
    
    this.globalData.forEach(cs=>{
      let value:number;
      if(caseType=='c')
        if(cs.confirmed>500000)
          value=cs.confirmed

      if(caseType=='a')
        if(cs.active>250000)
          value=cs.active

      if(caseType=='r')
        if(cs.recovered>500000)
          value=cs.recovered

      if(caseType=='d')
        if(cs.deaths>50000)
          value=cs.deaths

      this.datatable.push([
        cs.country,value
      ])
    })
    //console.log(this.datatable);
  }

  ngOnInit(): void {

    this.dataService.getGlobalData().subscribe(
      {
        next :(result)=>{
          //console.log(result);
          this.globalData = result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed))
            {
              this.totalActive+=cs.active;
              this.totalConfirmed+=cs.confirmed;
              this.totalRecovered+=cs.recovered;
              this.totalDeaths+=cs.deaths;
            }
          })
          this.initChart('c');
        },
        complete : ()=>{
          this.loading = false;
        }
      }
    )
  }

  updateChart(input:HTMLInputElement){
    //console.log(input.value)
    this.initChart(input.value)
  }

}
