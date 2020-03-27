import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private doughnutChart: Chart;
  @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas: any;
  country = 'iraq';
  cases;
  todayCases;
  deaths;
  todayDeaths;
  recovered;
  active;
  isShowing;

  constructor(private http: HttpClient) {
    this.isShowing = true;
  }

  ngOnInit(){
    this.http.get('https://corona.lmao.ninja/countries/iraq').subscribe(data =>{
      this.cases = data['cases'];
      this.todayCases = data['todayCases'];
      this.deaths = data['deaths'];
      this.todayDeaths = data['todayDeaths'];
      this.recovered = data['recovered'];
      this.active = data['active'];
      
      if(data){
        this.isShowing = false;
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: "doughnut",
          data: {
            labels: ["الاصابات","أصابات اليوم","الوفايات","وفايات اليوم", "المتعافين", "الفعالين"],
            datasets: [
              {
                data: [this.cases, this.todayCases, this.deaths, this.todayDeaths, this.recovered, this.active],
                backgroundColor: [
                  "#3498db",
                  "#1abc9c",
                  "#34495e",
                  "#636e72",
                  "#2ecc71",
                  "#e74c3c",
                ],
                hoverBackgroundColor: ["#2980b9", "#16a085", "#2c3e50", "#2d3436", "#27ae60", "#e74c3c"]
              }
            ]
          },
          options: {
            legend: {
              rtl: true
            }
        }
        });
      }

    })
  }

}
