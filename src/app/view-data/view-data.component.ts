import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
})
export class ViewDataComponent implements OnInit {

  country;
  private doughnutChart: Chart;
  @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas: any;
  cases;
  todayCases
  deaths;
  todayDeaths
  recovered;
  active;
  isShowing;

  constructor(private route:ActivatedRoute, private http: HttpClient) {
    this.isShowing = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.country = this.route.snapshot.paramMap.get("country");
    });
    this.http.get('https://corona.lmao.ninja/countries/'+this.country).subscribe(data =>{
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