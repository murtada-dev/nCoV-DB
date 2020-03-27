import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  private doughnutChart: Chart;
  @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas: any;
  cases;
  deaths;
  recovered;
  active;

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get('https://corona.lmao.ninja/all').subscribe(data =>{
      this.cases = data['cases'];
      this.deaths = data['deaths'];
      this.recovered = data['recovered'];
      this.active = this.cases - this.deaths - this.recovered;
      console.log(this.cases);
      
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "doughnut",
        data: {
          labels: ["الاصابات","الوفايات","المتعافين","الفعالين"],
          datasets: [
            {
              data: [this.cases, this.deaths, this.recovered, this.active],
              backgroundColor: [
                "#74b9ff",
                "#34495e",
                "#2ecc71",
                "#ff6b6b",
              ],
              hoverBackgroundColor: ["#0984e3", "#2c3e50", "#27ae60", "#ee5253"]
            }
          ]
        },
        options: {
          legend: {
            rtl: true
          }
      }
      });

    })
  }

}