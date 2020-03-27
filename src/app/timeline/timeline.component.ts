import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  country;
  cases;
  deaths;
  isShowing;
  yourSelect;

  constructor(private route:ActivatedRoute, private http:HttpClient) {
    this.isShowing = true;
    this.yourSelect = 'cases';
}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.country = this.route.snapshot.paramMap.get("country");
    });
    this.http.get('https://corona.lmao.ninja/v2/historical/'+this.country).subscribe(data =>{
      if(data){
        this.isShowing = false;
        this.cases = data['timeline'].cases;
        this.deaths = data['timeline'].deaths;
      }
    })
  }
  asIsOrder(a, b) {
    return -1;
  }

}
